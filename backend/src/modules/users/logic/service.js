import configEnv from "../../../config/env.js";
import CustomService from "../../../libraries/customs/service.js";
import createToken from "./createToken.js";
import { createHashAsync, isValidPasswordAsync } from "./passwords.js";
import ThisDaoMongo from "../data/dao.mongo.js";
import { sendMail } from "../../../libraries/emails/sendMail.js";
import generateRandomPassword from "../../../libraries/utils/generateRandomPassword.js";
import AppError from "../../../config/AppError.js";
import ProgramsDao from "../../programs/data/dao.mongo.js"

export default class Service extends CustomService {
  constructor() {
    super(new ThisDaoMongo);
    this.admins = configEnv.uadmins || []
    this.admin_pass = configEnv.uadmin_pass
    this.daoProgram = new ProgramsDao()
  }

  get = async (filter, excludePassword = true )  => await this.dao.get   (filter, excludePassword)
  getBy = async (filter, excludePassword = true) => await this.dao.getBy (filter, excludePassword)

  // REGISTRO TRADICIONAL
  register = async (userData) => {
    userData.password = await createHashAsync(userData.password)
    const userFound = await this.dao.getBy({email: userData.email});
    if (userFound) throw new AppError(`Ya existe un usuario con ese email. pruebe con otro`, 203)
    return await this.dao.create(userData)
  }

  login = async (userData) => {
    // Admin Verification
    if (this.admins.includes(userData.email)) {
      if (await isValidPasswordAsync(userData.password, this.admin_pass)) {
        const token = createToken({id: 0, role: "admin"})
        return {name: "Admin", token}
      } else {
        throw new AppError(`Email o contraseña equivocado`, 203);
      }
    }
    // User Verification
    const userFound = await this.dao.getBy({email: userData.email}, false);
    if (!userFound || !(await isValidPasswordAsync(userData.password, userFound.password))) {
      throw new AppError(`Email o contraseña equivocado`, 203);
    }

    const token = createToken({_id: userFound._id, role: userFound.role})
    await this.dao.updateConection({_id: userFound._id})
    return {name: userFound.first_name, token}
  }

  // RECUPERAICON DE CONTRASEÑA
  userRecovery = async (email) => {    
    const userFound = await this.dao.getBy({email});
    const token = createToken({_id: userFound._id, role: userFound.role}, '1h')

    const to = email
    const subject  = 'Recuperar Contraseña'
    const template = 'recoveryUser'
    const context = {
      user: { first_name: userFound.first_name, email: userFound.email},
      url: `${configEnv.cors_origin}/auth/newpassword`,
      token
    }
    return sendMail( to, subject, template, context)
  }

  updatePassword = async (uid, password) => {
    password = await createHashAsync(password)
    return await this.dao.update({_id: uid}, {password, update: Date.now()})
  }

  // GOOGLE
  googleLoginOrRegister = async (googleUser, tokens) => {
    let userFound = await this.dao.getBy({email: googleUser.email});

    if (!userFound) {
      userFound = await this.dao.create({
        first_name: googleUser.given_name,
        last_name: googleUser.family_name,
        email: googleUser.email,
        google_id: googleUser.id,
        password: generateRandomPassword(10),
        photo: googleUser.picture,
        role: "Teacher",
        googleAccessToken: tokens.access_token,
        googleRefreshToken: tokens.refresh_token,
      })
    } else {
      let updatedFields = {
        googleAccessToken: tokens.access_token,
        googleRefreshToken: tokens.refresh_token
      };
      if (!userFound.googleId) updatedFields.googleId = googleUser.id;
      if (!userFound.photo)    updatedFields.photo    = googleUser.picture;

      if (Object.keys(updatedFields).length > 0) { userFound = await this.dao.update({_id: userFound._id}, updatedFields)}
    }

    const token = createToken({_id: userFound._id, role: userFound.role})
    await this.dao.updateConection({_id: userFound._id})
    
    return {name: userFound.first_name, token}
  }

  // ACTUALIZACION DE IMAGEN
  updatePhoto = async (uid, path) => {
    return await this.dao.update({_id: uid}, {photo: path})
  }
}
import dataModel from "./model.js";
import DaoMongo from "../../../libraries/customs/dao.mongo.js";

export default class ThisDaoMongo extends DaoMongo {
  constructor() {
    super(dataModel);
  }

  get = async (filter = {}) => {
    const result = await this.model.find(filter)
      .populate({
        path: 'program',
        select: 'title'
      })
      .select('-students.password');
    return result;
  }

  deleteMany = async (filter) => {
    const result = await this.model.deleteMany(filter)
    return result
  }
}
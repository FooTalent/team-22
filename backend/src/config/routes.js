import { Router } from "express";
import usersRouter from "../modules/users/api/routes.js";
import resourcesRouter from "../modules/resource/api/routes.js";
import programsRouter from "../modules/programs/api/routes.js";
import classesRouter from "../modules/classes/api/routes.js";
import reviewsRouter from "../modules/reviews/api/routes.js";
import virtualClassroomsRouter from "../modules/virtualclassroom/api/routes.js";
import emailRouter from "../modules/email/api/routes.js";
import calendarRouter from "../modules/calendar/api/routes.js";
import valuesRouter from "../modules/values/api/routes.js";

const router = Router()

// http://localhost:8080/api/

router.use('/users/', usersRouter)
router.use('/programs/', programsRouter)
router.use('/classes/', classesRouter)
router.use('/reviews/', reviewsRouter)
router.use('/virtual/', virtualClassroomsRouter)
router.use('/resources/', resourcesRouter)
router.use('/send-email', emailRouter)
router.use('/calendar', calendarRouter)
router.use('/values', valuesRouter)
router.get('/pruebas', async (req, res, next) => {res.send("Prueba Pruebas")});


export default router
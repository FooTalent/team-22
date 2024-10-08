import { Router } from "express";
import Controller from "./controller.js";
import wrapRoutesWithCatchAsync from "../../../libraries/utils/wrapRoutesWithCatchAsync.js";

const router = Router()
const controller = new Controller()

// http://localhost:8080/api/calendar/
router
.get ('/', controller.get)

wrapRoutesWithCatchAsync(router)

export default router
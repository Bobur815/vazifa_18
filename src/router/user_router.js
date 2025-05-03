import { Router } from "express";
import userController from "../controller/user_controller.js"

let router = Router()

router
    .get("/api/students",userController.GET)
    .get("/api/students/search",userController.GET_SEARCH)
    .get("/api/students/:student_id",userController.GET_SINGLE)
    .post("/api/students",userController.POST)
    .post("/api/profile",userController.PROFILE_IMG)
    .delete("/api/students/:student_id",userController.DELETE)
    .put("/api/students",userController.PUT)

export default router


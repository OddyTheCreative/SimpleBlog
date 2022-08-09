import express from "express";
const router = express.Router();

import UserController from "../controllers/users.controller.js";
const userController = new UserController();

router.post("/signup", userController.createUser);
router.post("/login", userController.getUser);

export default router;

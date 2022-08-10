import express, { application } from "express";
import * as userController from "../controllers/user.js";
import * as authMiddleware from "../middlewares/authmiddleware.js";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import Post from "../models/post.js";

const router = express.Router();

router.post("/join", userController.userJoin);
router.post("/login", userController.userLogin);
router.post("/test", authMiddleware.auth, (req, res, next) => {
  console.log(req.userId);
});

export default router;

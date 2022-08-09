import express from "express";

import * as userController from "../controllers/user.js";

const router = express.Router();

router.post("/join", userController.userJoin);
router.post("/login", userController.userLogin);

export default router;

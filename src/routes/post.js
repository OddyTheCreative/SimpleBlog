import express from "express";
import * as postController from "../controllers/posts.js";
// import * as authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/post", postController.auth, postController.createPost);

export default router;

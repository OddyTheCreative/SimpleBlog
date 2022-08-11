import express from "express";

import * as commentController from "../controllers/comment.js";
import * as authmiddleware from "../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/:postId", commentController.commentRead);

router.post("/:postId", authmiddleware.auth, commentController.commentCreate);

router.put("/:commentId", authmiddleware.auth, commentController.commentEdit);

router.delete("/:commentId", authmiddleware.auth, commentController.commentDelete);

export default router;

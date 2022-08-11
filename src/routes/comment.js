import express from "express";

import * as commentController from "../controllers/comment.js";

const router = express.Router();

router.get("/:postId", commentController.commentRead);

router.post("/:postId", commentController.commentCreate);

router.put("/:commentId", commentController.commentEdit);

router.delete("/:commentId", commentController.commentDelete);

export default router;

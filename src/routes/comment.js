import express from "express";

import * as commentControllers from "../controllers/comment.js";

const router = express.Router();

router.get("/:postId", commentControllers.commentRead);

router.post("/:postId", commentControllers.commentCreate);

router.put("/:commentId", commentControllers.commentEdit);

router.delete("/:commentId", commentControllers.commentDelete);

export default router;

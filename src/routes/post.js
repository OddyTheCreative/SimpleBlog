import express from "express";

import * as postControllers from "../controllers/post.js";

const router = express.Router();


router.post("/create",postControllers.postcreate);
router.get("/",postControllers.postLooks);
router.get("/:postId",postControllers.postLook);
router.put("/:postId",postControllers.postupdate);
router.delete("/:postId",postControllers.portdelete);

export default router;

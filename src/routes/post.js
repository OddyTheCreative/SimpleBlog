import express from "express";

import * as postControllers from "../controllers/post.js";
import * as authmiddleware from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/create", authmiddleware.auth, postControllers.postcreate);

router.get("/", postControllers.postLooks);

router.get("/:postId", authmiddleware.auth, postControllers.postLook);

router.put("/:postId", authmiddleware.auth, postControllers.postupdate);

router.delete("/:postId", authmiddleware.auth, postControllers.portdelete);

export default router;

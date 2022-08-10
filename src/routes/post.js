<<<<<<< HEAD
import express from "express";

import * as postControllers from "../controllers/post.js";

const router = express.Router();

router.post("/create",postControllers.postcreate);

router.get("/",postControllers.postLooks);

router.get("/:postId",postControllers.postLook);

router.put("/:postId",postControllers.postupdate);

router.delete("/:postId",postControllers.portdelete);
=======
import * as postController from "../controllers/posts.js";
const router = express.Router();

router.post("/post", postController.auth, postController.createPost);
>>>>>>> aa36369349578493d0708ff3fd7959f41b7b77b4

export default router;

import express from "express";
<<<<<<< HEAD

import * as postControllers from "../controllers/posts.js";

const router = express.Router();

router.post("/create",postControllers.postcreate);

router.get("/",postControllers.postLooks);

router.get("/:postId",postControllers.postLook);

router.put("/:postId",postControllers.postupdate);

<<<<<<< HEAD
router.get("/:postId", async (req, res) =>{
    const { postId } = req.params;

    const posts = await Post.findOne({ where: { postId } });

    return res.status(200).json({ posts })
});

router.put("/:postId", async (req, res) =>{
    const { postId } = req.params;
    const { title, content } = req.body;

    await Post.update({ title, content }, { where: { postId }});

});

router.delete("/:postId", async (req, res) =>{
    const { postId } = req.params;

    const post = await Post.findOne({ where: { postId } })

    await Post.status(200).destroy({ where: { postId } })

});
=======
import * as postController from "../controllers/posts.js";
// import * as authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/post", postController.auth, postController.createPost);
>>>>>>> 9c47d954751742ac68c2741d11cfee6ad996b5ef
=======
router.delete("/:postId",postControllers.portdelete);
>>>>>>> jinguang-chou

export default router;

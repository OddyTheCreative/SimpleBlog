import express from "express";

import User from "../models/user.js"
import * as postControllers from "../controllers/post.js";
import * as Post from "../models/post.js";

const router = express.Router();

router.post("/create", async (req ,res) =>{
    try{
        const { title, content } = req.body;
        const { userId } = req.locals.user;

        await Post.create({ userId, title, content });

        return res.status(201).json({ Message: "게시글 작성에 성공했습니다." });
    }catch (error){
        return res.status(400).json({
            errorMessage: "게시판 작성에 실패."
        });
    }
    
});

router.get("/", async (req, res) =>{
  try{
    // const posts = await Post.findAll({
    //     include: {
    //     model: User,
    //     attributes: ["name"],
    //     },
    //     });
    console.log( 11 );
    const posts = await Post.findAll({
        order: [['updatedAt', 'desc']],
    });
    console.log( 12 );
    return res.status(201).json({ posts,});
  }catch(error){
    return res.status(400).json({ errorMessage: "게시판 조회에 실패." });
  };
});

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

export default router;

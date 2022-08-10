<<<<<<< HEAD
import User from "../models/user.js";
import Post from "../models/post.js";
// // import authMiddleware from "../middlewares/authmiddleware.js";
// import { application } from "express";
// // import { app } from "express";

const auth = async (req, res, next) => {
  //   console.log("사용자 인증 미들웨어에 왔어요");
  req.get("authorization");
  //   console.log(req.headers);
  const { authorization } = req.headers;

  const [tokenType, tokenValue] = (authorization || "").split(" ");
  //   console.log("tokenType : ", tokenType);
  //   console.log("tokenValue : ", tokenValue.trim());
  //   console.log("오~ 그 토큰 맞는데~");

  if (tokenType !== "Bearer" || !tokenValue) {
    res.status(400).send({ errorMessage: "유효한 토큰이 아닙니다" });
    return;
  }

  try {
    const userId = jwt.verify(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY2MDExMDg3Nn0.BFBPlDJ-KxgQij6kHXRy0ihKcoC2i-OA3LaEZym-t1U",
      "simple-secret-key"
    );
    console.log(userId);
    await User.findByPk({ id: userId });
    next();
  } catch (err) {
    res.status(401).send({ errorMessage: "로그인 후 이용이 가능합니다." });
  }
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  res.send("포스트 테스트 페이지");
};

export { createPost, auth };
=======
import express from "express";

import User from "../models/user.js"
import Post from "../models/post.js";

const postcreate = async (req, res, next) => {//게시글 생성 API
  try{
    const { title, content } = req.body;
    const { userId } = req.locals.user;

    await Post.create({ userId, title, content });

    return res.status(201).json({ Message: "게시글 작성에 성공했습니다." });
  }catch (error){
    console.error(err, { Message: "게시글 작성에 실패했습니다." } );
    next(err);
  };    
};
const postLooks = async (req, res, next) => { // 전체 조회
  try{
    const posts = await Post.findAll({
      order: [['updatedAt', 'desc']],
      include: {
      model: User,
      attributes: ["name"],
      },
    });
    
    return res.status(201).json({ posts,});
  }catch (err) {
    console.error(err, { Message: "게시글 전체 조회에 실패했습니다." } );
    next(err);
  };
};

const postLook = async (req, res, next) => { // 상세 조회
  try{
    const { postId } = req.params;
    const posts = await Post.findOne({ where: { id: postId } });

    if(!posts){
      return res.status(400).json({ errorMessage: "게시글이 없습니다."});
    }else{
      return res.status(200).json({ posts });
    };
  }catch(err){
    console.error(err, { Message: "게시글 상세 조회에 실패했습니다." } );
    next(err);
  }

};

const postupdate = async (req, res, next) => {
    try{
        const { postId } = req.params;
        const { title, content } = req.body;
    
        await Post.update({ title, content }, { where: { postId }});
      next()
    }catch(error){
      console.error(err, { Message: "게시글 수정 실패 " } );
      next(err);
    }
  
  };

const portdelete = async (req, res, next) => {
  try{
    const { postId } = req.params;

    const post = await Post.findOne({ where: { postId } })

    await Post.status(200).destroy({ where: { postId } })
  }catch(error){
    console.error(err, { Message: "게시글 조회에 실패했습니다." } );
    next(err);
  }
};

export {
    postcreate, postLooks, postLook, postupdate, portdelete
}
>>>>>>> jinguang-chou

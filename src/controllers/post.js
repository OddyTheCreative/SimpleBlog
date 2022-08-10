import Joi from "joi";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";

const postSchema = Joi.object({ // post 형식
  title: Joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9\s\S]{1,200}$/)),
  content: Joi.string().required().pattern(new RegExp(/^[\s\S]{1,3000}$/)),
});


const locals = { userId: 1 } 

const postcreate = async (req, res, next) => {//게시글 생성 API
  try{
    const resultSchema = postSchema.validate(req.body);
    if(resultSchema.error) {
      return res.status(400).json({ errorMessage: "형식에 맞지 않습니다."});
    };

    const { title, content } = resultSchema.value;
    const { userId } = locals;

    await Post.create({ userId, title, content });

    return res.status(201).json({ Message: "게시글 작성에 성공했습니다." });
  }catch (err){
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
    const posts = await Post.findOne({ where: { id: postId }, 
      include: [{
        model: User,
        attributes: ["name"],
      },{
        model: Comment,
        attributes: ["content"],
      },]
    });


    if(!posts){
      return res.status(400).json({ errorMessage: "게시글이 없습니다."});
    }else{
      return res.status(200).json({ posts,});
    };
  }catch(err){
    console.error(err, { Message: "게시글 상세 조회에 실패했습니다." } );
    next(err);
  }

};

const postupdate = async (req, res, next) => { // 게시글 수정
  try{
    const { postId } = req.params;
    const { title, content } = req.body;
    const post = await Post.findOne({ where: { id: postId } });
    if(!post){
        return res.status(400).json({ errorMessage: "게시글이 없습니다."});
      }else{
        await Post.update({ title, content }, { where: { id: postId }});
        return res.status(200).json({ Message: "게시글이 수정 되었습니다."});
      };
  }catch(err){
    console.error(err, { Message: "게시글 수정 실패 " } );
    next(err);
  };  
};

const portdelete = async (req, res, next) => { // 게시글 삭제
  try{
    const { postId } = req.params;
    const post = await Post.findOne({ where: { id: postId } });
    if(!post){
        return res.status(400).json({ errorMessage: "게시글이 없습니다."});
      }else{
        await Post.destroy({ where: { id: postId } });
        return res.status(200).json({ Message: "게시글이 삭제 되었습니다."});
      };
  }catch(err){
    console.error(err, { Message: "게시글 삭제에 실패했습니다." } );
    next(err);
  };
};

export {
    postcreate, postLooks, postLook, postupdate, portdelete
}
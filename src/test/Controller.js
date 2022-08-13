import PostService from "../test/Service.js"
import Joi from "joi";

const postSchema = Joi.object({ // post 형식
    title: Joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9\s\S]{1,200}$/)),
    content: Joi.string().required().pattern(new RegExp(/^[\s\S]{1,3000}$/)),
});

class PostControllers {
    postService = new PostService()

    postcreate = async (req, res, next) => {
        try{ 
            const UserId = req.userId;
            const { title, content } = req.body;
            
            await this.postService.postcreate(UserId, title, content)
           
            return res.status(201).json({ Message: "게시글 작성에 성공했습니다." });
        }catch {
            console.error(err, { errorMessage: "게시글 작성에 실패했습니다." } );
            next(err)
        };
    };

    postLooks = async (req, res, next) => { // 전체 조회
        try{
            const posts = await this.postService.postLooks()

            return res.status(201).json({ posts,});
        }catch (err) {
          console.error(err, { errorMessage: "게시글 전체 조회에 실패했습니다." } );
          next(err);
        };
      };

}
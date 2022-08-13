import Post from "../models/post.js"

class PostRepositorys {
    postmodels = new Postmodels()


    postLooks = async () => { // 전체 조회
        try{
            const posts = await Post.findAll({
                include: {
                model: User,
                attributes: ["name"],
                },
            });
            
            return posts;

        }catch (err) {
          console.error(err, { errorMessage: "게시글 전체 조회에 실패했습니다." } );
        };
      };

}
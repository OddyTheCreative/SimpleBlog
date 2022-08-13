import PostRepository from "../test/Repository.js"

class PostServices {
    postRepository = new PostRepository()

    postcreate = async (UserId, title, content) => {
        try{
            console.log()
            if(resultSchema.error) {
                return res.status(400).json({ errorMessage: "형식에 맞지 않습니다."});
            };

            await Post.create({ UserId, title, content });
        }catch {
            console.error(err, { errorMessage: "게시글 작성에 실패했습니다." } );
        };
    }

    postLooks = async () => { // 전체 조회
        try{

            const allPost = await this.postRepository.postLooks();

            allPost.sort((a, b) => {
                return b.createdAt - a.createdAt;
              });

            return allPost.map(posts => {
                return {
                  postId: posts.postId,
                  title: posts.title,
                  name: posts.name,
                  createdAt: posts.createdAt,
                  updatedAt: posts.updatedAt
                }
            });
            
        }catch (err) {
          console.error(err, { errorMessage: "게시글 전체 조회에 실패했습니다." } );
        };
      };

}
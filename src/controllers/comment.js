// import Joi from "joi";
import Comment from "../models/comment.js";

// const RE_COMMENT = /^[\s\S]{1,100}$/;

// const commentSchema = Joi.object({
//   comment: Joi.string().pattern(RE_COMMENT).required(),
// });

const commentRead = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const commentsQuery = `
                SELECT c.commentId, c.userId, u.nickname, c.comment, c.createdAt, c.updatedAt
                FROM Comment AS c
                JOIN User AS u
                ON c.userId = u.userId
                WHERE c.postId = ${postId}`;

    const comments = await sequelize.query(commentsQuery, {
      type: Sequelize.QueryTypes.SELECT,
    });

    comments.sort((a, b) => b.createdAt - a.createdAt);

    return res.status(200).json({ data: comments });
  } catch (err) {
    return res.status(400).json({
      errorMessage: "댓글 조회에 실패하였습니다.",
    });
  }
};

const commentCreate = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const { userId } = res.locals.user;

    await Comment.create({ postId, userId, content });
    return res.status(201).json({ message: "댓글을 작성하였습니다." });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      errorMessage: "댓글 작성에 실패하였습니다.",
    });
  }
};

const commentEdit = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const { userId } = res.locals.user;

    const isExist = await Comment.findByPk(commentId);
    if (!isExist) {
      return res.status(404).json({
        errorMessage: "댓글이 존재하지 않습니다.",
      });
    }

    const updateCount = await Comment.update(
      { content },
      { where: { commentId, userId } }
    );

    if (updateCount < 1) {
      return res.status(400).json({
        errorMessage: "댓글 수정이 정상적으로 처리되지 않았습니다.",
      });
    }

    return res.status(200).json({ message: "댓글을 수정하였습니다." });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      errorMessage: "댓글 수정에 실패하였습니다.",
    });
  }
};

const commentDelete = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { userId } = res.locals.user;

    const isExist = await Comment.findByPk(commentId);
    if (!isExist) {
      return res.status(404).json({
        errorMessage: "댓글이 존재하지 않습니다.",
      });
    }

    const deleteCount = await Comment.destroy({
      where: { commentId, userId },
    });

    if (deleteCount < 1) {
      return res.status(400).json({
        errorMessage: "댓글 삭제가 정상적으로 처리되지 않았습니다.",
      });
    }

    return res.status(200).json({ message: "댓글을 삭제하였습니다." });
  } catch (err) {
    console.log(err).message;
    return res.status(400).json({
      errorMessage: "댓글 삭제에 실패하였습니다.",
    });
  }
};

export { commentRead, commentCreate, commentEdit, commentDelete };

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

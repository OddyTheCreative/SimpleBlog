import jwt from "jsonwebtoken";
import User from "../models/user.js";

// 사용자 인증 미들웨어
const auth = async (req, res, next) => {
    // console.log("사용자 인증 미들웨어에 왔어요");
  console.log(req.get("Authorization"));

  try {
    const token = req.get("Authorization").split(" ")[1];
    console.log(token);

    if (!token) {
      res.status(400).send({ errorMessage: "유효한 토큰이 아닙니다" });
      return;
    }

    const userId = jwt.verify(token, "simple-secret-key"); //토큰을 확인
    // console.log("userId?", userId);
    // console.log("undefined?", req.userId);
    const seekUserId = await User.findOne({ where: { id: userId.userId } });
    // console.log(seekUserId);
    req.userId = seekUserId.id;

    next();
  } catch (err) {
    res.status(401).send({ errorMessage: "로그인 후 이용이 가능합니다." });
  }
};

export { auth };

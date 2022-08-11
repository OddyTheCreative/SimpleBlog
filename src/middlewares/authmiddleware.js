import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

// 사용자 인증 미들웨어
const auth = async (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1];

    if (!token) {
      res.status(400).send({ errorMessage: "유효한 토큰이 아닙니다" });
      return;
    }

    const userId = jwt.verify(token, process.env.TOKEN_SECRET); //토큰을 확인

    const seekUserId = await User.findOne({ where: { id: userId.userId } });
    req.userId = seekUserId.id;
    next();
  } catch (err) {
    res.status(401).send({ errorMessage: "로그인 후 이용이 가능합니다." });
  }
};

export { auth };

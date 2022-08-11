import jwt from "jsonwebtoken";
import Joi from "joi";
import User from "../models/user.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

// 회원가입 스키마
const userJoinSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(10).required(),
  password: Joi.string()
    .min(8)
    .max(20)
    // .pattern(new RegExp("/^[0-9a-z]/$")) //왜 안 먹히지..?
    .required(),
  confirm: Joi.ref("password"),
});

// 회원가입 API
const userJoin = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, name, password, confirm } = req.body;

    if (email === undefined || name === undefined || password === undefined) {
      return res
        .status(400)
        .json({ message: "이메일, 닉네임, 비밀번호는 필수 입력사항입니다." });
    }

    if (password !== confirm) {
      return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    // 아이디, 닉네임 중복 검사
    const isExistUser = await User.findOne({
      where: { [Op.or]: [{ email }, { name }] },
    });
    console.log("아이디 있니?", isExistUser);

    if (isExistUser !== null) {
      res
        .status(400)
        .send({ errorMessage: "이메일 혹은 아이디가 사용 중입니다." });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    console.log("bcrypt 적용", hashPassword);

    await User.create({ email, name, password: hashPassword });
    res.json({ message: "회원가입 완료" });

    // // throw Error("error");
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .send({ errMessage: "입력한 데이터 형식이 올바르지 않습니다." });
    next(err);
  }
};

// 로그인 스키마
const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// 로그인 API
const userLogin = async (req, res, next) => {
  // res.send("안 왔어..?ㅠ0ㅠ");
  try {
    // 입력받은 이메일 찾기
    const { email } = await userLoginSchema.validateAsync(req.body);
    const user = await User.findOne({ where: { email } });
    const hashPassword = user.password;

    if (!user) {
      return res
        .status(400)
        .send({ errorMessage: "일치하는 이메일이 없습니다." });
    }

    const validPassword = await bcrypt.compare(req.body.password, hashPassword);
    console.log(validPassword);

    if (validPassword) {
      const token = jwt.sign(
        {
          userId: user.id,
        },
        "simple-secret-key"
      );
      console.log("여기 왔니?", token);
      return res.status(200).send({ message: "로그인에 성공했습니다.", token });
    }
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .send({ errorMessage: "입력한 데이터 형식이 올바르지 않습니다." });
    next(err);
  }
};

export { userJoin, userLogin };

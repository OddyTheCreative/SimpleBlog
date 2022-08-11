import { userJoin, userLogin } from "../src/controllers/user.js";

describe("userJoin", () => {
  const req = {
    body: jest.fn(() => req),
    email: undefined,
    name: "관리자",
    password: "password",
    confirm: undefined,
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test("유저 정보가 없으면 res.status(400).json 에러를 반환 ", () => {
    const req = {
      body: jest.fn(() => req),
      email: "admin@admin.com",
      name: "관리자",
      password: "password",
      confirm: undefined,
    };
    userJoin(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith("유저 정보 필요");
  });
});


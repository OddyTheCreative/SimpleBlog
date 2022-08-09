import UserService from "../services/users.services";

class UserController {
  userService = new UserService();

  createUser = async (req, res, next) => {
    const { email, username, password } = req.body;
    const createUserDate = await this.userService.createUser(
      email,
      username,
      password
    );
  };
}

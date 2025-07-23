import { userRepository } from "#repositories/user-repository.js";
import { userService } from "#services/user-service.js";

class UserController {
  //Login-------------------------------------------------------------------
  async login(req, res) {
    const userDto = await userService.login(req.body);
    return res.json(userDto);
  }

  //register-------------------------------------------------------------------
  async register(req, res) {
    const userDto = await userService.register(req.body);

    return res.status(201).json(userDto);
  }

  //getAll-------------------------------------------------------------------
  async getAll(req, res) {
    const users = await userRepository.findAll();

    return res.json(users);
  }
}

export const userController = new UserController();

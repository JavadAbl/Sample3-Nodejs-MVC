import { LoginDto } from "#dto/user-dto/login-dto.js";
import { RegisterDto } from "#dto/user-dto/register-dto.js";
import { userService } from "#services/user-service.js";

class UserController {
  //Login-------------------------------------------------------------------
  async login(req, res) {
    const loginDto = new LoginDto(req.body);
    const userDto = await userService.login(loginDto);
    return res.json(userDto);
  }

  //register-------------------------------------------------------------------
  async register(req, res) {
    const registerDto = new RegisterDto(req.body);
    const userDto = await userService.register(registerDto);

    return res.status(201).json(userDto);
  }

  //getAll-------------------------------------------------------------------
  async getAll(req, res) {
    const users = await userService.getAll();

    return res.json(users);
  }
}

export const userController = new UserController();

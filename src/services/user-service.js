import { userRepository } from "#repositories/user.repository.js";
import { TokenGenerator } from "#utils/auth-utils/token-generator.js";
import { AppError } from "#utils/error-utils/app-error.js";
import { hash, compare } from "bcryptjs";

class UserService {
  //login-------------------------------------------------------------
  async login({ email, password }) {
    const user = await userRepository.findUnique("email", email);

    if (!user) throw new AppError("user not found", 400);

    const isPasswordOk = await compare(password, user.password);

    if (!isPasswordOk) throw new AppError("wrong password", 401);

    const accessToken = await TokenGenerator.generateAccessToken({
      id: user.id,
    });
    const refreshToken = await TokenGenerator.generateRefreshToken();

    return { ...user, accessToken, refreshToken };
  }

  //register-------------------------------------------------------------
  async register({ email, password, name }) {
    const user = await userRepository.findUnique("email", email);

    if (user) throw new AppError(`user with email ${email} is exists`, 409);

    const hashedPassword = await hash(password, 10);

    let newUser = {
      email,
      name,
      password: hashedPassword,
    };

    newUser = await userRepository.create(newUser);

    const accessToken = await TokenGenerator.generateAccessToken(newUser.id);
    const refreshToken = await TokenGenerator.generateRefreshToken();

    return { ...newUser, accessToken, refreshToken };
  }
}

export const userService = new UserService();

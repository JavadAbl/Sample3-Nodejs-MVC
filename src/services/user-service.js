import { promisify } from "util";
import jwt from "jsonwebtoken";
import { userRepository } from "#repositories/user.repository.js";
import { AppError } from "#utils/error-utils/app-error.js";
import { hash, compare } from "bcryptjs";

class UserService {
  //login-------------------------------------------------------------
  async login({ email, password }) {
    const user = await userRepository.findUnique("email", email);

    if (!user) throw new AppError("user not found", 400);

    const isPasswordOk = await compare(password, user.password);

    if (!isPasswordOk) throw new AppError("wrong password", 401);

    const token = await this.#createJWT({ id: user.id });

    return { ...user, token };
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

    const token = await this.#createJWT({ id: newUser.id });

    return { ...newUser, token };
  }

  //createJWT----------------------------------------------------------
  async #createJWT(payload) {
    return await promisify(jwt.sign)(payload, "secret", { expiresIn: 0 });
  }
}

export const userService = new UserService();

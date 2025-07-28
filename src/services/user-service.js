import { UserDto } from "#dto/user/user.dto.js";
import { userRepository } from "#infrastructure/database/repositories/user-repository.js";
import { TokenGenerator } from "#utils/auth-utils/token-generator.js";
import { AppError } from "#utils/error-utils/app-error.js";
import { hash, compare } from "bcryptjs";

class UserService {
  //login-------------------------------------------------------------
  async login(loginDto) {
    const user = await userRepository.findUnique("email", loginDto.email);

    if (!user) return { error: "user not found" };

    const isPasswordOk = await compare(loginDto.password, user.password);

    if (!isPasswordOk) return { error: "wrong password" };

    /* emailProvider.sendMail({
      from: '"MyApp" <no-reply@myapp.com>',
      to: "com.javadabl@gmail.com",
      subject: "Welcome!",
      text: "Thanks for registering!",
    }); */

    const userDto = new UserDto(user);

    const accessToken = await TokenGenerator.generateAccessToken({
      ...userDto,
    });
    const refreshToken = await TokenGenerator.generateRefreshToken({
      ...userDto,
    });

    return { ...userDto, accessToken, refreshToken };
  }

  //register-------------------------------------------------------------
  async register(registerDto) {
    const user = await userRepository.findUnique("email", registerDto.email);

    if (user)
      throw new AppError(`user with email ${registerDto.email} is exists`, 409);

    const hashedPassword = await hash(registerDto.password, 10);

    let newUser = {
      email: registerDto.email,
      name: registerDto.name,
      password: hashedPassword,
    };

    newUser = await userRepository.create(newUser);

    const userDto = new UserDto(newUser);

    const accessToken = await TokenGenerator.generateAccessToken({
      ...userDto,
    });
    const refreshToken = await TokenGenerator.generateRefreshToken({
      ...userDto,
    });

    return { ...userDto, accessToken, refreshToken };
  }

  //GetAll---------------------------------------------------------
  async getAll() {
    const users = await userRepository.findAll();
    return await users.map((user) => new UserDto(user));
  }
}

export const userService = new UserService();

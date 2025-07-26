import { UserDto } from "#dto/user/user.dto.js";
import { tokenRepository } from "#infrastructure/database/repositories/token-repository.js";
import { userRepository } from "#infrastructure/database/repositories/user-repository.js";
import { emailProvider } from "#infrastructure/email/email-provider.js";
import { TokenGenerator } from "#utils/auth-utils/token-generator.js";
import { AppError } from "#utils/error-utils/app-error.js";
import { hash, compare } from "bcryptjs";

class UserService {
  //login-------------------------------------------------------------
  async login(loginDto) {
    const user = await userRepository.findUnique("email", loginDto.email);

    if (!user) throw new AppError("user not found", 400);

    const isPasswordOk = await compare(loginDto.password, user.password);

    if (!isPasswordOk) throw new AppError("wrong password", 401);

    const accessToken = await TokenGenerator.generateAccessToken({
      id: user.id,
    });
    const refreshToken = await TokenGenerator.generateRefreshToken();

    await tokenRepository.create({ token: refreshToken, userId: user.id });

    emailProvider.sendMail({
      from: '"MyApp" <no-reply@myapp.com>',
      to: "com.javadabl@gmail.com",
      subject: "Welcome!",
      text: "Thanks for registering!",
    });

    const userDto = new UserDto(user);

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

    const accessToken = await TokenGenerator.generateAccessToken({
      id: newUser.id,
    });
    const refreshToken = await TokenGenerator.generateRefreshToken();

    const userDto = new UserDto(newUser);

    return { ...userDto, accessToken, refreshToken };
  }

  //GetAll---------------------------------------------------------
  async getAll() {
    const users = await userRepository.findAll();
    return await users.map((user) => new UserDto(user));
  }
}

export const userService = new UserService();

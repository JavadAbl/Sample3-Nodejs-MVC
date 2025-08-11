/* eslint-disable no-unused-vars */
import { LoginDto } from "#dto/user/login-dto.js";
import { factorService } from "#services/factor-service.js";
import { userService } from "#services/user-service.js";
import { appConfigs } from "#utils/app-utils/app-configs.js";
import { appConstants } from "#utils/app-utils/app-constants.js";
import { TokenGenerator } from "#utils/auth-utils/token-generator.js";
import jwt from "jsonwebtoken";

class UserController {
  //home----------------------------------------------------------
  async home(req, res) {
    const user = req.user;
    const data = await Promise.all([
      userService.getUsersCount(),
      factorService.factorsSum(),
      factorService.getFactorsCount({ where: { status: 1 } }),
      factorService.getFactorsCount({ where: { status: { not: 3 } } }),
      factorService.getFactorsCount({ where: { status: 3 } }),
      factorService.getAllFactors({ where: { status: 2 } }),
    ]);

    const totalUsersCount = data[0];
    const totalFactorsPrice = data[1];
    const totalPendingFactorsCount = data[2];
    const totalNotCanceledFactorsCount = data[3];
    const totalCanceledFactorsCount = data[4];
    const factors = data[5];

    const percentage =
      totalPendingFactorsCount + totalNotCanceledFactorsCount > 0
        ? Math.round(
            (totalPendingFactorsCount /
              (totalPendingFactorsCount + totalNotCanceledFactorsCount)) *
              100
          )
        : 0;

    res.render("home", {
      name: user?.email,
      totalUsersCount,
      totalFactorsPrice,
      totalPendingFactorsCount,
      totalCanceledFactorsCount,
      percentage,
      factors,
    });
  }

  //login----------------------------------------------------------
  async login(req, res) {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    let isAuthenticated = false;

    try {
      const user = jwt.verify(accessToken, appConfigs.ACCESS_TOKEN_SECRET);
      req.user = user;
      isAuthenticated = true;
    } catch (err) {
      if (!refreshToken) isAuthenticated = false;

      try {
        const user = jwt.verify(refreshToken, appConfigs.REFRESH_TOKEN_SECRET);
        const newAccessToken = await TokenGenerator.generateAccessToken(user);

        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          expires: appConstants.ACCESS_TOKEN_EXPIRE,
        });
        req.user = user;
        isAuthenticated = true;
      } catch (e) {
        isAuthenticated = false;
      }
    }

    if (isAuthenticated) return res.redirect("/");

    const error = req.query.error;

    res.render("login", { layout: false, error });
  }

  //loginPost----------------------------------------------------------
  async loginPost(req, res) {
    const loginDto = new LoginDto(req.body);

    const { error, ...userDto } = await userService.login(loginDto);

    if (error) return res.redirect(`login?error=${encodeURIComponent(error)}`);

    res.cookie("accessToken", userDto.accessToken, {
      httpOnly: true,
      expires: appConstants.ACCESS_TOKEN_EXPIRE,
    });
    res.cookie("refreshToken", userDto.refreshToken, {
      httpOnly: true,
      expires: appConstants.REFRESH_TOKEN_EXPIRE,
    });

    return res.redirect("/");
  }

  //profile----------------------------------------------------------
  profile(req, res) {
    res.render("profile", {});
  }

  //about----------------------------------------------------------
  about(req, res) {
    res.render("about", {});
  }
}

export const userController = new UserController();

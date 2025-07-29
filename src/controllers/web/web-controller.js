import { LoginDto } from "#dto/user/login-dto.js";
import { userService } from "#services/user-service.js";
import { appConfigs } from "#utils/app-utils/app-configs.js";
import { TokenGenerator } from "#utils/auth-utils/token-generator.js";
import jwt from "jsonwebtoken";

class PageController {
  //home----------------------------------------------------------
  home(req, res) {
    const user = req.user;

    res.render("home", { name: user?.email });
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
        const user = jwt.verify(refreshToken, appConfigs.REFERESH_TOKEN_SECRET);
        const newAccessToken = await TokenGenerator.generateAccessToken(user);

        res.cookie("accessToken", newAccessToken, { httpOnly: true });
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

    res.cookie("accessToken", userDto.accessToken, { httpOnly: true });
    res.cookie("refreshToken", userDto.refreshToken, { httpOnly: true });

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

export const pageController = new PageController();

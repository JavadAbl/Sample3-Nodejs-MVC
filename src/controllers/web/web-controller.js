import { LoginDto } from "#dto/user/login-dto.js";
import { userService } from "#services/user-service.js";

class PageController {
  //home----------------------------------------------------------
  home(req, res) {
    const user = req.user;
    console.log(user);

    res.render("home", { name: user?.name });
  }

  //login----------------------------------------------------------
  login(req, res) {
    const error = req.query.error;

    res.render("login", { layout: false, error });
  }

  //loginPost----------------------------------------------------------
  async loginPost(req, res) {
    const loginDto = new LoginDto(req.body);

    const { userDto, error } = await userService.login(loginDto);

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

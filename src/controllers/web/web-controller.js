class PageController {
  home(req, res) {
    throw new Error("app error");
    res.render("home", {});
  }

  profile(req, res) {
    res.render("profile", {});
  }

  about(req, res) {
    res.render("about", {});
  }
}

export const pageController = new PageController();

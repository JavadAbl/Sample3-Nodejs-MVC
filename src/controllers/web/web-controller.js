class PageController {
  home(req, res) {
    res.render("home", {});
  }

  about(req, res) {
    res.end("Welcome to the About Page");
  }
}

export const pageController = new PageController();

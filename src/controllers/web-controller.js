class WebController {
  home(req, res) {
    res.end("Welcome to the Home Page");
  }

  about(req, res) {
    res.end("Welcome to the About Page");
  }
}

export const webController = new WebController();

import { pageController } from "#controllers/web/web-controller.js";

export const pageRoutes = {
  domain: "/",

  routes: [
    {
      method: "get",
      path: "/",
      handler: pageController.home,
    },

    {
      method: "get",
      path: "/about",
      handler: pageController.about,
    },
  ],
};

import { webController } from "../../controllers/web-controller.js";

export const pageRoutes = {
  domain: "/pages",

  routes: [
    {
      method: "get",
      path: "/",
      handler: webController.home,
    },

    {
      method: "get",
      path: "/about",
      handler: webController.about,
    },
  ],
};

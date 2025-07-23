import { userController } from "#controllers/api/user-controller.js";

export const userRoutes = {
  domain: "/user",

  routes: [
    {
      method: "post",
      path: "/login",
      handler: (req, res) => userController.login(req, res),
    },

    {
      method: "post",
      path: "/register",
      handler: (req, res) => userController.register(req, res),
    },

    {
      method: "get",
      path: "/",
      handler: (req, res) => userController.getAll(req, res),
    },
  ],
};

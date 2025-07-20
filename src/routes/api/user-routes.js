import { userController } from "#controllers/api/user-controller.js";

export const userRoutes = {
  domain: "/user",

  routes: [
    {
      method: "post",
      path: "/login",
      handler: userController.login,
    },

    {
      method: "post",
      path: "/register",
      handler: userController.register,
    },
  ],
};

import { factorController } from "#controllers/api/factor-controller.js";

export const factorRoutes = {
  domain: "/Factor",
  middlewares: [auth],
  routes: [
    {
      method: "get",
      path: "/",
      handler: (req, res) => factorController.getAll(req, res),
    },
  ],
};

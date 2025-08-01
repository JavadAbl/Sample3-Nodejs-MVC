import { productController } from "#controllers/web/product-controller.js";
import { authPageMiddleware } from "#middlewares/auth-page-middleware.js";
import { validateMiddleware } from "#middlewares/validate-middleware.js";
import { CreateProductValidator } from "#validators/create-product-validator.js";

export const productRoutes = {
  domain: "/products",
  middlewares: [authPageMiddleware],
  routes: [
    {
      method: "get",
      path: "/",
      handler: (req, res) => productController.index(req, res),
    },

    {
      method: "post",
      path: "/create",
      middlewares: [validateMiddleware(CreateProductValidator.loginValidator)],
      handler: (req, res) => productController.create(req, res),
    },
  ],
};

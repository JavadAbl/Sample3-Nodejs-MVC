import { productController } from "#controllers/web/product-controller.js";
import { authPageMiddleware } from "#middlewares/auth-page-middleware.js";
import { paginationMiddleware } from "#middlewares/pagination-middleware.js";
import { validateMiddleware } from "#middlewares/validate-middleware.js";
import { ProductValidator } from "#validators/product-validator.js";

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
      method: "get",
      path: "/Page/:page",
      middlewares: [paginationMiddleware],
      handler: (req, res) => productController.index(req, res),
    },

    {
      method: "post",
      path: "/create",
      middlewares: [
        (req, res, next) => {
          res.locals.view = "products";
          next();
        },
        validateMiddleware(ProductValidator.createProductValidator),
      ],
      handler: (req, res) => productController.create(req, res),
    },
  ],
};

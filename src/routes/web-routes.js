import { factorRoutes } from "./web/factor-routes.js";
import { userRoutes } from "./web/pages-routes.js";
import { productRoutes } from "./web/product-routes.js";

export const webRoutes = [userRoutes, productRoutes, factorRoutes];

import { factorRoutes } from "./web/factor-routes.js";
import { pageRoutes } from "./web/pages-routes.js";
import { productRoutes } from "./web/product-routes.js";

export const webRoutes = [pageRoutes, productRoutes, factorRoutes];

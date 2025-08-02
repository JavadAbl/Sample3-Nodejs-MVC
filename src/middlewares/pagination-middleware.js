export function paginationMiddleware(req, res, next) {
  const page = parseInt(req.params.page) || 1;
  // res.locals.page = page;

  // Set the view to render
  //  res.locals.view = "products";

  // Pass the page to the next middleware or controller
  req.page = page;

  next();
}

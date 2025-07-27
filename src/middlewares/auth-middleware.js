import { userRepository } from "#infrastructure/database/repositories/user-repository.js";
import { AppError } from "#utils/error-utils/app-error.js";
import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token)
    return next(new AppError("No token provided, authorization denied", 401));

  jwt.verify(token, "secret", async (err, decoded) => {
    if (err)
      return next(
        new AppError("Invalid token provided, authorization denied", 401)
      );

    const user = await userRepository.findUnique("id", decoded.id);
    if (!user)
      return next(
        new AppError(
          "there is no user attached to the token, authorization denied",
          401
        )
      );

    req.user = user;

    next();
  });
}

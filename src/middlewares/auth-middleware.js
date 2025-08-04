import { appConfigs } from "#utils/app-utils/app-configs.js";
import { appConstants } from "#utils/app-utils/app-constants.js";
import { TokenGenerator } from "#utils/auth-utils/token-generator.js";
import { AppError } from "#utils/error-utils/app-error.js";
import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  try {
    const tokenPayload = jwt.verify(
      accessToken,
      appConfigs.ACCESS_TOKEN_SECRET
    );

    req.user = tokenPayload.user;
    return next();
  } catch (err) {
    if (!refreshToken)
      return next(
        new AppError(
          "there is no user attached to the token, authorization denied",
          401
        )
      );

    try {
      const tokenPayload = jwt.verify(
        refreshToken,
        appConfigs.REFRESH_TOKEN_SECRET
      );
      const newAccessToken = await TokenGenerator.generateAccessToken(
        tokenPayload.user
      );

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        expires: appConstants.ACCESS_TOKEN_EXPIRE,
      });
      req.user = tokenPayload.user;
      return next();
    } catch (e) {
      return next(
        new AppError(
          "there is no user attached to the token, authorization denied",
          401
        )
      );
    }
  }
}

/* eslint-disable no-unused-vars */
import { appConfigs } from "#utils/app-utils/app-configs.js";
import { appConstants } from "#utils/app-utils/app-constants.js";
import { TokenGenerator } from "#utils/auth-utils/token-generator.js";
import jwt from "jsonwebtoken";

export async function authPageMiddleware(req, res, next) {
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
    if (!refreshToken) return res.redirect("/login");

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
      return res.redirect("/login");
    }
  }
}

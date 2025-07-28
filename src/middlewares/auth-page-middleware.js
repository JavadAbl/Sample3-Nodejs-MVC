/* eslint-disable no-unused-vars */
import { appConfigs } from "#utils/app-utils/app-configs.js";
import { TokenGenerator } from "#utils/auth-utils/token-generator.js";
import jwt from "jsonwebtoken";

export async function authPageMiddleware(req, res, next) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  try {
    const user = jwt.verify(accessToken, appConfigs.ACCESS_TOKEN_SECRET);
    req.user = user;
    return next();
  } catch (err) {
    if (!refreshToken) return res.redirect("/login");

    try {
      const user = jwt.verify(refreshToken, appConfigs.REFERESH_TOKEN_SECRET);
      const newAccessToken = await TokenGenerator.generateAccessToken(user);

      res.cookie("accessToken", newAccessToken, { httpOnly: true });
      req.user = user;
      return next();
    } catch (e) {
      return res.redirect("/login");
    }
  }
}

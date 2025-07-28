import jwt from "jsonwebtoken";
import { promisify } from "util";
import { appConfigs } from "#utils/app-utils/app-configs.js";

export class TokenGenerator {
  static generateAccessToken(payload) {
    return promisify(jwt.sign)(payload, appConfigs.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  }

  static async generateRefreshToken(payload) {
    // return (await promisify(randomBytes)(32)).toString("hex");
    return promisify(jwt.sign)(payload, appConfigs.REFERESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  }
}

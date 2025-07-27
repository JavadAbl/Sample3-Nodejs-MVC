import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { promisify } from "util";

export class TokenGenerator {
  static generateAccessToken(payload) {
    return promisify(jwt.sign)(payload, "secret", { expiresIn: "72h" });
  }

  static async generateRefreshToken() {
    return (await promisify(randomBytes)(32)).toString("hex");
  }
}

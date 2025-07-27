import { userRepository } from "#infrastructure/database/repositories/user-repository.js";
import jwt from "jsonwebtoken";

export async function authPageMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.redirect("/login");

  jwt.verify(token, "secret", async (err, decoded) => {
    if (err) return res.redirect("/login");

    const user = await userRepository.findUnique("id", decoded.id);

    req.user = user;

    next();
  });
}

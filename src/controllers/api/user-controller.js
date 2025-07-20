import { prismaClient } from "#database/prisma-client.js";

class UserController {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return res.json("user not found");

    if (password !== user.password) return res.json("user not found");
  }

  register(req, res) {
    res.end("Welcome to the About Page");
  }
}

export const userController = new UserController();

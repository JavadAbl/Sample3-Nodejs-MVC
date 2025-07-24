import { BaseRepository } from "./base-repository.js";
import { prismaClient } from "#infrastructure/database/prisma-client.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(prismaClient.user);
  }
}

export const userRepository = new UserRepository();

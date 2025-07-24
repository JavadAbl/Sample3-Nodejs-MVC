import { BaseRepository } from "./base-repository.js";
import { prismaClient } from "#infrastructure/database/prisma-client.js";

class TokenRepository extends BaseRepository {
  constructor() {
    super(prismaClient.refreshTokens);
  }
}

export const tokenRepository = new TokenRepository();

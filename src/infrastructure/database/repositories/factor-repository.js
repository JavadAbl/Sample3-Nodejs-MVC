import { BaseRepository } from "./base-repository.js";
import { prismaClient } from "#infrastructure/database/prisma-client.js";

class FactorRepository extends BaseRepository {
  constructor() {
    super(prismaClient.factor);
  }
}

export const factorRepository = new FactorRepository();

import { BaseRepository } from "./base-repository.js";
import { prismaClient } from "#infrastructure/database/prisma-client.js";

class ProductRepository extends BaseRepository {
  constructor() {
    super(prismaClient.product);
  }
}

export const productRepository = new ProductRepository();

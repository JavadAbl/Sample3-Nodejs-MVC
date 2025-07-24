import { PrismaClient } from "#infrastructure/database/generated/prisma/index.js";

export const prismaClient = new PrismaClient();

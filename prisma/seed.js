import { PrismaClient } from "../src/infrastructure/database/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  // Seed your data here
  await prisma.user.createMany({
    data: getUsers(),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

//Seed Data--------------------------------------------------------------
function getUsers() {
  return [
    {
      name: "Alice",
      email: "alice@example.com",
      password: "1",
    },
    {
      name: "Alice2",
      email: "alice2@example.com",
      password: "1",
    },
  ];
}

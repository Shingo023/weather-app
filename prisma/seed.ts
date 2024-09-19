import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Delete all existing records from the tables
  await prisma.userFavoriteCity.deleteMany({});
  await prisma.favoriteCity.deleteMany({});
  await prisma.user.deleteMany({});

  // Hash the password
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create favorite cities first
  const london = await prisma.favoriteCity.create({
    data: {
      cityName: "London",
      address: "London, UK",
      latitude: 51.5074,
      longitude: -0.1278,
      timeZone: "Europe/London",
    },
  });

  const tokyo = await prisma.favoriteCity.create({
    data: {
      cityName: "Tokyo",
      address: "Tokyo, Japan",
      latitude: 35.6762,
      longitude: 139.6503,
      timeZone: "Asia/Tokyo",
    },
  });

  // Seed users
  const user1 = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      password: hashedPassword,
    },
  });

  // Create relations between users and favorite cities
  await prisma.userFavoriteCity.createMany({
    data: [
      {
        userId: user1.id,
        favoriteCityId: london.id,
      },
      {
        userId: user1.id,
        favoriteCityId: tokyo.id,
      },
    ],
  });

  console.log("Seeded user and favorite cities.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

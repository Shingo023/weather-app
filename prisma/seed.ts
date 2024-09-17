import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Delete all existing records from the tables
  await prisma.favoriteCity.deleteMany({});
  await prisma.user.deleteMany({});

  // Hash the password
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Seed users and favorite cities
  const user1 = await prisma.user.create({
    data: {
      name: "Bob", // New data
      email: "bob@example.com",
      password: hashedPassword,
      favoriteCities: {
        create: [
          {
            cityName: "London",
            countryName: "UK",
            latitude: 51.5074,
            longitude: -0.1278,
            timeZone: "Europe/London",
          },
          {
            cityName: "Tokyo",
            countryName: "Japan",
            latitude: 35.6762,
            longitude: 139.6503,
            timeZone: "Asia/Tokyo",
          },
        ],
      },
    },
  });

  console.log("Seeded user:", user1);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

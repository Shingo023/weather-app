import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"; // Import NextResponse for consistent response handling

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get("placeId");

  if (!placeId) {
    return NextResponse.json({ error: "placeId is required" }, { status: 400 });
  }

  const city = await prisma.favoriteCity.findUnique({
    where: { placeId: String(placeId) },
  });

  return NextResponse.json(city, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const { cityName, latitude, longitude, placeId, address, timeZone } =
      await request.json();

    const newFavoriteCity = await prisma.favoriteCity.create({
      data: {
        cityName,
        latitude,
        longitude,
        placeId,
        address,
        timeZone,
      },
    });

    return NextResponse.json(newFavoriteCity, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating city" }, { status: 500 });
  }
}

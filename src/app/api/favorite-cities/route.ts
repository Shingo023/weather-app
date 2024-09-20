import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const favoriteCities = await prisma.userFavoriteCity.findMany({
      where: { userId: userId },
      select: {
        favoriteCity: {
          select: {
            placeId: true, // Accessing placeId from the related FavoriteCity
          },
        },
      },
    });

    return NextResponse.json(
      favoriteCities.map((fc) => fc.favoriteCity.placeId) // Mapping to get placeId
    );
  } catch (error) {
    console.error("Error fetching favorite cities:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorite cities" },
      { status: 500 }
    );
  }
}

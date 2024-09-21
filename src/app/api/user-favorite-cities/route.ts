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
            placeId: true,
          },
        },
      },
    });
    return NextResponse.json(
      favoriteCities.map((fc) => fc.favoriteCity.placeId)
    );
  } catch (error) {
    console.error("Error fetching favorite cities:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorite cities" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId, favoriteCityId } = await request.json();
    const userFavoriteCity = await prisma.userFavoriteCity.create({
      data: {
        userId,
        favoriteCityId,
      },
    });
    return NextResponse.json(
      { userFavoriteCity, message: "City has been added to your favorites!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding city to favorites:", error);
    return NextResponse.json(
      { error: "Error adding city to favorites" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId, favoriteCityId } = await request.json();

    // Remove the city from user's favorites
    await prisma.userFavoriteCity.deleteMany({
      where: {
        userId,
        favoriteCityId,
      },
    });

    // Check if the city is still favorited by any user
    const remainingFavorites = await prisma.userFavoriteCity.findFirst({
      where: {
        favoriteCityId,
      },
    });

    // If no users have this city as a favorite, remove it from the FavoriteCity table
    if (!remainingFavorites) {
      await prisma.favoriteCity.delete({
        where: {
          id: favoriteCityId,
        },
      });
    }

    return NextResponse.json({
      message: "City has been removed from your favorites.",
    });
  } catch (error) {
    console.error("Error unbookmarking city:", error);
    return NextResponse.json(
      { error: "Failed to remove city from favorites" },
      { status: 500 }
    );
  }
}

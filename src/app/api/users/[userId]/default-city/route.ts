import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.id !== params.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const defaultCity = await prisma.userFavoriteCity.findFirst({
      where: {
        userId: params.userId,
        isDefault: true, // Make sure this field exists in the schema
      },
      include: {
        favoriteCity: true, // Fetch associated city details
      },
    });

    if (!defaultCity) {
      return NextResponse.json(
        { error: "Default city not found" },
        { status: 404 }
      );
    }

    const { favoriteCity } = defaultCity;
    const { cityName, latitude, longitude, address, placeId } = favoriteCity;
    return NextResponse.json({
      cityName,
      latitude,
      longitude,
      address,
      placeId,
    });
  } catch (error) {
    console.error("Error fetching default city:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

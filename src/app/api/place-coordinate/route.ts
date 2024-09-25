import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get("placeId");

  if (!placeId) {
    return NextResponse.json(
      { error: "Missing placeId parameter" },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId
    )}&key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Google Place details");
    }

    const data = await response.json();

    if (!data.result || !data.result.geometry) {
      throw new Error("Place details are incomplete");
    }

    const latitude = data.result.geometry.location.lat;
    const longitude = data.result.geometry.location.lng;

    return NextResponse.json({ latitude, longitude }, { status: 200 });
  } catch (error) {
    console.error("Error fetching place details:", error);
    return NextResponse.json(
      { error: "Failed to fetch place details" },
      { status: 500 }
    );
  }
}

import { LocationDetails } from "@/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { error: "Missing latitude or longitude" },
      { status: 400 }
    );
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      const locationDetails: LocationDetails = data.results[0];
      const cityName =
        locationDetails.address_components.find((component) =>
          component.types.includes("locality")
        )?.long_name || "Unknown Location";
      const address = locationDetails.formatted_address || null;
      const placeId = locationDetails.place_id || null;

      return NextResponse.json({ cityName, address, placeId }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "No results found for the provided coordinates" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch geocode data" },
      { status: 500 }
    );
  }
}

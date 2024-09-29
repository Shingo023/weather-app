"use client";

import { WeeklyComponent } from "@/features/weather/weeklyComponent/WeeklyComponent";
import SearchBar from "@/features/weather/searchBar/SearchBar";
import CurrentWeather from "@/features/weather/currentWeather/CurrentWeather";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { LocationDetails, WeatherData } from "@/types";
import { useSession } from "next-auth/react";

export default function WeatherPage() {
  const { lat, lng } = useParams();
  const searchParams = useSearchParams();
  const placeIdQuery = searchParams.get("placeId");
  const [displayedCityWeather, setDisplayedCityWeather] =
    useState<WeatherData | null>(null);
  const [cityToDisplay, setCityToDisplay] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [placeId, setPlaceId] = useState<string | null>(null);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router]);

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      const weatherResponse = await fetch(
        `/api/weather?lat=${latitude}&lng=${longitude}`
      );
      const weatherData: WeatherData = await weatherResponse.json();

      setDisplayedCityWeather(weatherData);
      console.log("Weather Data Fetched:", weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchLocationDetails = async (latitude: number, longitude: number) => {
    try {
      const locationDetailsResponse = await fetch(
        `/api/location-details?lat=${latitude}&lng=${longitude}`
      );
      const locationDetailsData = await locationDetailsResponse.json();

      if (
        locationDetailsData.status === "OK" &&
        locationDetailsData.results.length > 0
      ) {
        const locationDetails: LocationDetails = locationDetailsData.results[0];
        const addressComponents = locationDetails.address_components;

        const cityComponent = addressComponents.find((component) =>
          component.types.includes("locality")
        );
        const cityName = cityComponent?.long_name || "Unknown Location";
        const address = locationDetails?.formatted_address || null;
        const placeId = locationDetails?.place_id || null;

        setCityToDisplay(cityName || "Unknown Location");
        setAddress(address || null);
        // setPlaceId(placeId || null);
      } else {
        console.error("No results from Geocoding API");
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  const fetchPlaceDataByPlaceId = async (placeIdQuery: string) => {
    try {
      const response = await fetch(
        `/api/favorite-cities?placeId=${placeIdQuery}`
      );
      const placeData = await response.json();

      if (placeData && placeData.latitude && placeData.longitude) {
        await fetchWeatherData(placeData.latitude, placeData.longitude);

        setCityToDisplay(placeData.cityName || "Unknown Location");
        setAddress(placeData.address || null);
        setPlaceId(placeIdQuery || null);
      } else {
        console.error("No valid place data found for placeId.");
      }
    } catch (error) {
      console.error("Error fetching place data by placeId:", error);
    }
  };

  useEffect(() => {
    if (placeIdQuery) {
      fetchPlaceDataByPlaceId(placeIdQuery);
    } else if (lat && lng) {
      fetchWeatherData(Number(lat), Number(lng));
      fetchLocationDetails(Number(lat), Number(lng));
    }
  }, [lat, lng, placeId]);

  return (
    <div>
      <SearchBar
        setCityToDisplay={setCityToDisplay}
        setAddress={setAddress}
        setPlaceId={setPlaceId}
      />
      <CurrentWeather
        displayedCityWeather={displayedCityWeather}
        setDisplayedCityWeather={setDisplayedCityWeather}
        cityToDisplay={cityToDisplay}
        address={address}
        placeId={placeId}
      />
      <WeeklyComponent displayedCityWeather={displayedCityWeather} />
    </div>
  );
}

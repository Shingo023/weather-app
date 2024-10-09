"use client";

import { WeeklyComponent } from "@/features/weather/weeklyComponent/WeeklyComponent";
import SearchBar from "@/features/weather/searchBar/SearchBar";
import CurrentWeather from "@/features/weather/currentWeather/CurrentWeather";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { WeatherData } from "@/types";
import { useSession } from "next-auth/react";
import styles from "./page.module.scss";

export default function WeatherPage() {
  const { lat, lng } = useParams();
  const searchParams = useSearchParams();
  const cityQuery = searchParams.get("place");
  const addressQuery = searchParams.get("address");
  const placeIdQuery = searchParams.get("id");

  const [displayedCityWeather, setDisplayedCityWeather] =
    useState<WeatherData | null>(null);
  const [favoriteCitiesPlaceIds, setFavoriteCitiesPlaceIds] = useState<
    string[]
  >([]);

  const router = useRouter();
  const { data: session, status } = useSession();

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      const weatherResponse = await fetch(
        `/api/weather?lat=${latitude}&lng=${longitude}`
      );
      const weatherData: WeatherData = await weatherResponse.json();

      setDisplayedCityWeather(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchFavoriteCitiesPlaceIds = async () => {
    if (session?.user?.id) {
      try {
        const response = await fetch(
          `/api/users/${session.user.id}/favorite-cities/placeIds`
        );
        const favoriteCitiesPlaceIdsData = await response.json();
        setFavoriteCitiesPlaceIds(favoriteCitiesPlaceIdsData);
      } catch (error) {
        console.error("Error fetching favorite cities place IDs:", error);
      }
    }
  };

  useEffect(() => {
    if (lat && lng) {
      fetchWeatherData(Number(lat), Number(lng));
    }
  }, [lat, lng]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchFavoriteCitiesPlaceIds();
    }
  }, [status, session?.user?.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router]);

  return (
    <div className={styles.weatherPage}>
      <div className={styles.weatherPage__leftContent}>
        <SearchBar />
        <CurrentWeather
          displayedCityWeather={displayedCityWeather}
          setDisplayedCityWeather={setDisplayedCityWeather}
          cityToDisplay={cityQuery}
          address={addressQuery}
          placeId={placeIdQuery}
          favoriteCitiesPlaceIds={favoriteCitiesPlaceIds}
          setFavoriteCitiesPlaceIds={setFavoriteCitiesPlaceIds}
        />
      </div>
      <div className={styles.weatherPage__rightContent}>
        <WeeklyComponent displayedCityWeather={displayedCityWeather} />
      </div>
    </div>
  );
}

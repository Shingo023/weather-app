"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  FavoriteCity,
  FavoriteCityWithWeather,
  WeatherData,
  WeatherIconType,
} from "@/types";
import FavoriteCityCard from "@/features/favoritesList/favoriteCityCard/FavoriteCityCard";
import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import { useRouter } from "next/navigation";

const FavoriteList = () => {
  const [favoriteCitiesWithWeather, setFavoriteCitiesWithWeather] = useState<
    FavoriteCityWithWeather[]
  >([]);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchFavoriteCitiesWithWeather = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(
            `/api/user-favorite-cities?userId=${session.user.id}`
          );
          const favoriteCitiesData = await response.json();

          // Fetch weather for each favorite city
          const favoriteCitiesWeatherData = await Promise.all(
            favoriteCitiesData.map(async (favoriteCity: FavoriteCity) => {
              const weatherResponse = await fetch(
                `/api/weather?lat=${favoriteCity.latitude}&lng=${favoriteCity.longitude}`
              );
              const weatherData: WeatherData = await weatherResponse.json();

              return {
                ...favoriteCity,
                weather: weatherData,
              };
            })
          );
          setFavoriteCitiesWithWeather(favoriteCitiesWeatherData);
        } catch (error) {
          console.error("Error fetching favorite cities:", error);
        }
      }
    };

    // Only run the effect once the session is loaded and available
    if (status === "authenticated") {
      fetchFavoriteCitiesWithWeather();
    }
  }, [status, session?.user?.id]);

  const handleCardClick = (
    lat: number,
    lng: number,
    placeName: string,
    address: string,
    placeId: string
  ) => {
    router.push(
      `/weather/${lat}/${lng}?place=${placeName}&address=${address}&id=${placeId}`
    );
  };

  return (
    <>
      {favoriteCitiesWithWeather.map((favoriteCity) => {
        const cityName = favoriteCity.cityName;
        const cityAddress = favoriteCity.address;
        const currentTemp = Math.round(
          favoriteCity.weather.currentConditions.temp
        );
        const currentWeather = favoriteCity.weather.currentConditions
          .icon as WeatherIconType;
        const currentDateTime = getCurrentTimeAndDate(favoriteCity.timeZone);

        return (
          <FavoriteCityCard
            key={favoriteCity.id}
            cityName={cityName}
            cityAddress={cityAddress}
            currentTemp={currentTemp}
            currentWeather={currentWeather}
            currentDateTime={currentDateTime}
            onClick={() =>
              handleCardClick(
                favoriteCity.latitude,
                favoriteCity.longitude,
                cityName,
                cityAddress,
                favoriteCity.placeId
              )
            }
          />
        );
      })}
    </>
  );
};

export default FavoriteList;

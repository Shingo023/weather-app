"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FavoriteCity, FavoriteCityWithWeather, WeatherData } from "@/types";
import FavoriteCityCard from "@/features/favoritesList/favoriteCityCard/FavoriteCityCard";
import { getCurrentTimeAndDate } from "@/utils/dateUtils";

const FavoriteList = () => {
  const [favoriteCitiesWithWeather, setFavoriteCitiesWithWeather] = useState<
    FavoriteCityWithWeather[]
  >([]);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchFavoriteCitiesWithWeather = async () => {
      if (session?.user?.id && favoriteCitiesWithWeather.length === 0) {
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

    fetchFavoriteCitiesWithWeather();
  }, [session, favoriteCitiesWithWeather.length]);

  return (
    <>
      {favoriteCitiesWithWeather.map((favoriteCity) => {
        const cityName = favoriteCity.cityName;
        const cityAddress = favoriteCity.address;
        const currentTemp = Math.round(
          favoriteCity.weather.currentConditions.temp
        );
        const currentWeather = favoriteCity.weather.currentConditions.icon;
        const currentDateTime = getCurrentTimeAndDate(favoriteCity.timeZone);

        return (
          <FavoriteCityCard
            key={favoriteCity.id}
            cityName={cityName}
            cityAddress={cityAddress}
            currentTemp={currentTemp}
            currentWeather={currentWeather}
            currentDateTime={currentDateTime}
          />
        );
      })}
    </>
  );
};

export default FavoriteList;

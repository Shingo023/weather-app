"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  FavoriteCityWithWeather,
  UserFavoriteCity,
  WeatherData,
  WeatherIconType,
} from "@/types";
import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import FavoriteCityContainer from "@/features/favoritesList/favoriteCityContainer/FavoriteCityContainer";
import styles from "./page.module.scss";

const FavoriteList = () => {
  const [favoriteCitiesWithWeather, setFavoriteCitiesWithWeather] = useState<
    FavoriteCityWithWeather[]
  >([]);
  const [homeLocationId, setHomeLocationId] = useState<number | null>(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchFavoriteCitiesWithWeather = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(
            `/api/user-favorite-cities?userId=${session.user.id}`
          );
          const userFavoriteCitiesData = await response.json();

          // Fetch weather for each favorite city
          const favoriteCitiesWithWeatherData = await Promise.all(
            userFavoriteCitiesData.map(
              async (userFavoriteCity: UserFavoriteCity) => {
                if (userFavoriteCity.isDefault) {
                  setHomeLocationId(userFavoriteCity.id);
                }

                const weatherResponse = await fetch(
                  `/api/weather/favorite-cities?lat=${userFavoriteCity.favoriteCity.latitude}&lng=${userFavoriteCity.favoriteCity.longitude}`
                );
                const weatherData: WeatherData = await weatherResponse.json();
                return {
                  ...userFavoriteCity,
                  weather: weatherData,
                };
              }
            )
          );
          favoriteCitiesWithWeatherData.sort((a, b) => a.id - b.id);
          setFavoriteCitiesWithWeather(favoriteCitiesWithWeatherData);
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

  return (
    <div className={styles.favoritesList}>
      {favoriteCitiesWithWeather.map((favoriteCityWithWeather) => {
        const userId = session?.user.id;
        const userFavoriteCityId = favoriteCityWithWeather.id;
        const favoriteCityPlaceId =
          favoriteCityWithWeather.favoriteCity.placeId;
        const cityName = favoriteCityWithWeather.customName;
        const cityAddress = favoriteCityWithWeather.favoriteCity.address;
        const currentTemp = Math.round(
          favoriteCityWithWeather.weather.currentConditions.temp
        );
        const currentWeather = favoriteCityWithWeather.weather.currentConditions
          .icon as WeatherIconType;
        const timeZone = favoriteCityWithWeather.favoriteCity.timeZone;
        const cityLat = favoriteCityWithWeather.favoriteCity.latitude;
        const cityLng = favoriteCityWithWeather.favoriteCity.longitude;

        return (
          <FavoriteCityContainer
            key={userFavoriteCityId}
            userId={userId}
            favoriteCityId={userFavoriteCityId}
            cityName={cityName}
            cityAddress={cityAddress}
            cityPlaceId={favoriteCityPlaceId}
            currentTemp={currentTemp}
            currentWeather={currentWeather}
            timeZone={timeZone}
            homeLocationId={homeLocationId}
            setHomeLocationId={setHomeLocationId}
            cityLat={cityLat}
            cityLng={cityLng}
          />
        );
      })}
    </div>
  );
};

export default FavoriteList;

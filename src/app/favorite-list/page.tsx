"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  FavoriteCity,
  FavoriteCityWithWeather,
  WeatherData,
  WeatherIcon,
} from "@/types";
import FavoriteCityCard from "@/features/favoritesList/favoriteCityCard/FavoriteCityCard";
import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import { useRouter } from "next/navigation";
import { useDisplayedCityWeather } from "@/contexts/DisplayedCityWeatherContext";

const FavoriteList = () => {
  const [favoriteCitiesWithWeather, setFavoriteCitiesWithWeather] = useState<
    FavoriteCityWithWeather[]
  >([]);
  const { setDisplayedCityWeather, setCityToDisplay, setAddress, setPlaceId } =
    useDisplayedCityWeather();

  const { data: session } = useSession();
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
          console.log(favoriteCitiesWeatherData);
          setFavoriteCitiesWithWeather(favoriteCitiesWeatherData);
        } catch (error) {
          console.error("Error fetching favorite cities:", error);
        }
      }
    };

    fetchFavoriteCitiesWithWeather();
  }, [session]);

  const handleCardClick = (
    weather: WeatherData,
    cityName: string,
    cityAddress: string,
    placeId: string
  ) => {
    setDisplayedCityWeather(weather);
    setCityToDisplay(cityName);
    setAddress(cityAddress);
    setPlaceId(placeId);
    router.push("/weather");
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
          .icon as WeatherIcon;
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
                favoriteCity.weather,
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

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  FavoriteCityWithWeather,
  UserFavoriteCity,
  WeatherData,
  WeatherIconType,
} from "@/types";
import FavoriteCityContainer from "@/features/favoritesList/favoriteCityContainer/FavoriteCityContainer";
import styles from "./page.module.scss";
import { getCurrentHourInTimeZone } from "@/utils/dateUtils";

const FavoriteList = () => {
  const [favoriteCitiesWithWeather, setFavoriteCitiesWithWeather] = useState<
    FavoriteCityWithWeather[]
  >([]);
  const [homeLocationId, setHomeLocationId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

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
        } finally {
          // Set loading to false after all data is fetched and processed
          setLoading(false);
        }
      }
    };

    // Only run the effect once the session is loaded and available
    if (status === "authenticated") {
      fetchFavoriteCitiesWithWeather();
    }
  }, [status, session?.user?.id]);

  // Render skeletons while loading
  if (loading) {
    const skeletons = Array(4).fill(null);

    return (
      <div className={styles.favoritesList}>
        {skeletons.map((_, index) => (
          <div key={index} className={styles.skeleton}>
            <div className={styles.cityCard__cityInfo}>
              <div className={styles.cityCard__homeIconContainer}>
                <div className={styles.skeleton__homeIcon} />
              </div>
              <div className={styles.skeleton__cityName} />
              <div className={styles.skeleton__cityAddress} />
            </div>

            <div className={styles.cityCard__weather}>
              <div className={styles.cityCard__currentInfo}>
                <div className={styles.skeleton__dateAndTime} />
                <div className={styles.cityCard__currentWeather}>
                  <div className={styles.cityCard__currentWeatherIconContainer}>
                    <div className={styles.skeleton__weatherIcon} />
                  </div>
                  <div className={styles.skeleton__currentTemp} />
                </div>
              </div>
              <div className={styles.cityCard__hourlyWeather}></div>
            </div>

            <div className={styles.cityCard__buttons}>
              <div className={styles.skeleton__weatherDetailBtn} />
            </div>
          </div>
        ))}
      </div>
    );
  }

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

        const todaysWeather = favoriteCityWithWeather.weather.days[0].hours;
        const tomorrowsWeather = favoriteCityWithWeather.weather.days[1].hours;
        const fortyEightHoursWeather = [...todaysWeather, ...tomorrowsWeather];
        const currentHour = getCurrentHourInTimeZone(timeZone);
        const twentyFourHoursWeather = fortyEightHoursWeather.slice(
          currentHour,
          currentHour + 24
        );

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
            twentyFourHoursWeather={twentyFourHoursWeather}
          />
        );
      })}
    </div>
  );
};

export default FavoriteList;

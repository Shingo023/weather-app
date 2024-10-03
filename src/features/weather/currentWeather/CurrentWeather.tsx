"use client";

import { CurrentWeatherPropsType, WeatherIconType } from "@/types";
import { iconMapping } from "@/utils/weatherIconMapping";
import styles from "./CurrentWeather.module.scss";
import StarIcon from "./StarIcon";
import CurrentDateTime from "./CurrentDateTime";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import { useState } from "react";

const CurrentWeather = ({
  displayedCityWeather,
  setDisplayedCityWeather,
  cityToDisplay,
  address,
  placeId,
  favoriteCitiesPlaceIds,
  setFavoriteCitiesPlaceIds,
}: CurrentWeatherPropsType) => {
  const currentTemp = displayedCityWeather?.currentConditions.temp
    ? Math.round(displayedCityWeather.currentConditions.temp)
    : undefined;

  const currentFeelslikeTemp = displayedCityWeather?.currentConditions.feelslike
    ? Math.round(displayedCityWeather.currentConditions.feelslike)
    : undefined;

  const currentWeather = displayedCityWeather?.currentConditions.icon as
    | WeatherIconType
    | undefined;

  const currentWeatherIcon =
    currentWeather !== undefined ? iconMapping[currentWeather] : undefined;

  // Render loading state if any key weather information is missing
  const isLoading =
    !cityToDisplay ||
    currentTemp === undefined ||
    currentFeelslikeTemp === undefined ||
    currentWeatherIcon === undefined;

  if (isLoading) {
    return (
      <div className={styles.currentWeather__loading}>
        Loading weather data...
      </div>
    );
  }

  return (
    <div className={styles.currentWeather}>
      <div className={styles.currentWeather__data}>
        <div className={styles.currentWeather__citySection}>
          <div className={styles.currentWeather__cityName}>{cityToDisplay}</div>
          <StarIcon
            displayedCityWeather={displayedCityWeather}
            cityToDisplay={cityToDisplay}
            address={address}
            placeId={placeId}
            favoriteCitiesPlaceIds={favoriteCitiesPlaceIds}
            setFavoriteCitiesPlaceIds={setFavoriteCitiesPlaceIds}
          />
        </div>

        <div className={styles.currentWeather__stateAndCountry}>
          <div className={styles.currentWeather__stateName}>{address}</div>
        </div>

        {displayedCityWeather && (
          <CurrentDateTime
            displayedCityWeather={displayedCityWeather}
            setDisplayedCityWeather={setDisplayedCityWeather}
          />
        )}

        <div className={styles.currentWeather__temp}>{currentTemp}°</div>
        <div className={styles.currentWeather__feelslikeTemp}>
          Feels like {currentFeelslikeTemp}°
        </div>
      </div>

      <div className={styles.currentWeather__weatherIconContainer}>
        <WeatherIcon
          weatherIcon={currentWeatherIcon}
          width={150}
          height={150}
        />
      </div>
    </div>
  );
};
export default CurrentWeather;

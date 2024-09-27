"use client";

import { useDisplayedCityWeather } from "@/contexts/DisplayedCityWeatherContext";
import { WeatherIcon } from "@/types";
import { iconMapping } from "@/utils/weatherIconMapping";
import styles from "./CurrentWeather.module.scss";
import StarIcon from "./StarIcon";
import CurrentDateTime from "./CurrentDateTime";

const CurrentWeather = () => {
  const { cityToDisplay, address, displayedCityWeather } =
    useDisplayedCityWeather();

  const currentTemp = displayedCityWeather?.currentConditions.temp
    ? Math.round(displayedCityWeather.currentConditions.temp)
    : undefined;

  const currentFeelslikeTemp = displayedCityWeather?.currentConditions.feelslike
    ? Math.round(displayedCityWeather.currentConditions.feelslike)
    : undefined;

  const currentWeather = displayedCityWeather?.currentConditions.icon as
    | WeatherIcon
    | undefined;

  const currentWeatherIcon =
    currentWeather !== undefined ? iconMapping[currentWeather] : undefined;

  // Render loading state if any key weather information is missing
  if (
    !cityToDisplay ||
    currentTemp === undefined ||
    currentFeelslikeTemp === undefined ||
    currentWeatherIcon === undefined
  ) {
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
          <StarIcon />
        </div>

        <div className={styles.currentWeather__stateAndCountry}>
          <div className={styles.currentWeather__stateName}>{address}</div>
        </div>

        <CurrentDateTime />

        <div className={styles.currentWeather__temp}>{currentTemp}°</div>
        <div className={styles.currentWeather__feelslikeTemp}>
          Feels like {currentFeelslikeTemp}°
        </div>
      </div>

      <div className={styles.currentWeather__weatherIconContainer}>
        {currentWeatherIcon ? (
          <img
            src={currentWeatherIcon}
            alt="Weather icon"
            width={150}
            height={150}
            className={styles.currentWeather__weatherIcon}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CurrentWeather;

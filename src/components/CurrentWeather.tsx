import { useDisplayedCityWeather } from "@/contexts/DisplayedCityWeatherContext";
import { WeatherIcon } from "@/types";
import { iconMapping } from "@/utils/weatherIconMapping";
import React from "react";
import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import { RotateCcw } from "lucide-react";
import { getCityWeatherInfoByCoordinates } from "@/actions/weather";
import styles from "./CurrentWeather.module.scss";

const CurrentWeather = () => {
  const { cityToDisplay, setDisplayedCityWeather, displayedCityWeather } =
    useDisplayedCityWeather();

  const currentTimeAndDate =
    displayedCityWeather?.timezone !== undefined
      ? getCurrentTimeAndDate(displayedCityWeather?.timezone)
      : undefined;

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

  const updateWeatherInfo = async () => {
    setDisplayedCityWeather(null);

    const displayedCityLat = displayedCityWeather?.latitude;
    const displayedCityLng = displayedCityWeather?.longitude;

    if (displayedCityLat !== undefined && displayedCityLng !== undefined) {
      try {
        const updatedWeather = await getCityWeatherInfoByCoordinates(
          displayedCityLat,
          displayedCityLng
        );
        setDisplayedCityWeather(updatedWeather);
      } catch (error) {
        console.error("Error updating weather information:", error);
      }
    } else {
      console.error("Latitude or longitude is undefined.");
    }
  };

  // Render loading state if any key weather information is missing
  if (
    !cityToDisplay ||
    currentTimeAndDate === undefined ||
    currentTemp === undefined ||
    currentFeelslikeTemp === undefined ||
    currentWeatherIcon === undefined
  ) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div className={styles.currentWeather}>
      <div className={styles.currentWeather__data}>
        <div className={styles.currentWeather__cityName}>{cityToDisplay}</div>
        <div className={styles.currentWeather__dateTimeContainer}>
          <div className={styles.currentWeather__dateTime}>
            {currentTimeAndDate}
          </div>
          <div
            className={styles.currentWeather__updateIconContainer}
            onClick={updateWeatherInfo}
          >
            <RotateCcw className={styles.currentWeather__updateIcon} />
          </div>
        </div>

        <div className={styles.currentWeather__temp}>{currentTemp}°</div>
        <div className={styles.currentWeather__feelslikeTemp}>
          Feels like {currentFeelslikeTemp}°
        </div>
      </div>

      <div className={styles.currentWeather__weatherIconContainer}>
        {currentWeatherIcon
          ? React.createElement(currentWeatherIcon, {
              className: styles.currentWeather__weatherIconContainer,
            })
          : undefined}
      </div>
    </div>
  );
};

export default CurrentWeather;

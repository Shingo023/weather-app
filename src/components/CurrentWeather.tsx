import { useDisplayedCityWeather } from "@/contexts/DisplayedCityWeatherContext";
import { WeatherIcon } from "@/types";
import styles from "../style/components/CurrentWeather.module.scss";
import { iconMapping } from "@/utils/weatherIconMapping";
import React from "react";
import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import { RotateCcw } from "lucide-react";
import { getCityWeatherInfoByCoordinates } from "@/actions/weather";

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
    <div className={styles.CurrentWeather}>
      <div>{cityToDisplay}</div>
      <div>{currentTimeAndDate}</div>
      <div onClick={updateWeatherInfo} style={{ cursor: "pointer" }}>
        <RotateCcw />
      </div>
      <div>{currentTemp}°</div>
      <div>Feels like {currentFeelslikeTemp}°</div>
      <div>
        {currentWeatherIcon
          ? React.createElement(currentWeatherIcon, { size: 48 })
          : undefined}
      </div>
    </div>
  );
};

export default CurrentWeather;

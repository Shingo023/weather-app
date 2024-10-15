import SunsetAndSunrise from "./sunsetAndSunrise/SunsetAndSunrise";
import UVIndex from "./uvIndex/UVIndex";
import styles from "./TodaysHighlights.module.scss";
import { WeatherDay } from "@/types";
import Overview from "./overview/Overview";
import {
  getRainfallIntensity,
  getWindStrength,
} from "../../../utils/weatherUtils";
import React from "react";

const TodaysHighlights = ({
  todaysWeather,
}: {
  todaysWeather: WeatherDay | null;
}) => {
  if (!todaysWeather) return;

  const humidity = Math.round(todaysWeather.humidity);
  const windSpeed = todaysWeather.windspeed;
  const rainfall = Math.round(
    (todaysWeather.precip ?? 0) - (todaysWeather.snow ?? 0)
  );
  const snowfall = todaysWeather.snow ?? 0;
  const snowDepth = todaysWeather.snowdepth;

  const sunriseData = todaysWeather.sunrise;
  const sunsetData = todaysWeather.sunset;

  const uvIndexData = todaysWeather.uvindex;

  return (
    <div className={styles.todaysHighlights}>
      <div className={styles.todaysHighlights__container}>
        <h2>Today's Highlights</h2>
        <div className={styles.todaysHighlights__contents}>
          <Overview
            humidity={humidity}
            windSpeed={windSpeed}
            rainfall={rainfall}
            snowfall={snowfall}
            snowDepth={snowDepth}
          />
          <UVIndex uvIndex={uvIndexData} />
          <SunsetAndSunrise sunrise={sunriseData} sunset={sunsetData} />
        </div>
      </div>
    </div>
  );
};

export default TodaysHighlights;

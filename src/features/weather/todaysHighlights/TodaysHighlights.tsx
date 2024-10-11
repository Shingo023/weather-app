import SunsetAndSunrise from "./sunsetAndSunrise/SunsetAndSunrise";
import UVIndex from "./uvIndex/UVIndex";
import WindStatus from "./windStatus/windStatus";
import styles from "./TodaysHighlights.module.scss";
import { WeatherDay } from "@/types";

const TodaysHighlights = ({
  todaysWeather,
}: {
  todaysWeather: WeatherDay | null;
}) => {
  if (!todaysWeather) return;

  const sunriseData = todaysWeather.sunrise;
  const sunsetData = todaysWeather.sunset;

  const uvIndexData = todaysWeather.uvindex;

  return (
    <div className={styles.todaysHighlights}>
      <div className={styles.todaysHighlights__container}>
        <h2>Today's Highlights</h2>
        <div className={styles.todaysHighlights__contents}>
          <WindStatus />
          <UVIndex uvIndex={uvIndexData} />
          <SunsetAndSunrise sunrise={sunriseData} sunset={sunsetData} />
        </div>
      </div>
    </div>
  );
};

export default TodaysHighlights;

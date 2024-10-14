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

  function getHourFromTimeString(timeString: string): number {
    const [hours] = timeString.split(":");
    return parseInt(hours);
  }

  const sunriseData: number = getHourFromTimeString(todaysWeather.sunrise);

  const sunsetData: number = getHourFromTimeString(todaysWeather.sunset);

  const now: Date = new Date();
  const totalHours: number = sunsetData - sunriseData;
  const currentHour: number = now.getHours() - sunriseData;
  const sunCurrentLocation: number = (currentHour * 100) / totalHours;

  const uvIndexData = (180 * todaysWeather.uvindex * 10) / 100;

  return (
    <div className={styles.todaysHighlights}>
      <div className={styles.todaysHighlights__container}>
        <h2>Today s Highlights</h2>
        <div className={styles.todaysHighlights__contents}>
          <WindStatus />
          <UVIndex uvIndex={uvIndexData} />
          <SunsetAndSunrise
            sunrise={todaysWeather.sunrise.slice(0, 5)}
            sunset={todaysWeather.sunset.slice(0, 5)}
            sunCurrentLocation={sunCurrentLocation}
          />
        </div>
      </div>
    </div>
  );
};

export default TodaysHighlights;

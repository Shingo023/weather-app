import SunsetAndSunrise from "./sunsetAndSunrise/SunsetAndSunrise";
import UVIndex from "./uvIndex/UVIndex";
import styles from "./TodaysHighlights.module.scss";
import { WeatherDay } from "@/types";
import Overview from "./overview/Overview";

const TodaysHighlights = ({
  todaysWeather,
}: {
  todaysWeather: WeatherDay | null;
}) => {
  if (!todaysWeather) return;

  const humidity = Math.round(todaysWeather.humidity);
  const snowDepth = todaysWeather.snowdepth ?? 0;
  const weatherOverview = todaysWeather.description;
  const visibility = todaysWeather.visibility;
  const feelsLikeTempMax = Math.round(todaysWeather.feelslikemax);
  const feelsLikeTempMin = Math.round(todaysWeather.feelslikemin);

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
            snowDepth={snowDepth}
            weatherOverview={weatherOverview}
            visibility={visibility}
            feelsLikeTempMax={feelsLikeTempMax}
            feelsLikeTempMin={feelsLikeTempMin}
          />
          <UVIndex uvIndex={uvIndexData} />
          <SunsetAndSunrise sunrise={sunriseData} sunset={sunsetData} />
        </div>
      </div>
    </div>
  );
};

export default TodaysHighlights;

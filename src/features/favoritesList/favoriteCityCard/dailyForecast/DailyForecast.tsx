import { WeatherHour, WeatherIconType } from "@/types";
import styles from "./DailyForecast.module.scss";
import { formatTimeTo12Hour } from "@/utils/dateUtils";
import HourlyWeatherCard from "@/features/weather/todaysForecast/hourlyWeatherCard/HourlyWeatherCard";
import { iconMapping } from "@/utils/weatherIconMapping";

const DailyForecast = ({
  twentyFourHoursWeather,
}: {
  twentyFourHoursWeather: WeatherHour[];
}) => {
  return (
    <div className={styles.dailyForecast}>
      {twentyFourHoursWeather.map((hourlyWeather: WeatherHour) => {
        const hour = formatTimeTo12Hour(hourlyWeather.datetime);
        const weatherIcon = hourlyWeather.icon as WeatherIconType;
        const weatherIconSrc = iconMapping[weatherIcon];
        const temp = Math.round(hourlyWeather.temp);
        const precipProb = Math.round(hourlyWeather.precipprob / 5) * 5;

        const precipAmount = hourlyWeather.precip ?? 0;
        const windSpeed = Math.round(hourlyWeather.windspeed);

        return (
          <HourlyWeatherCard
            key={hourlyWeather.datetime}
            hour={hour}
            weatherIconSrc={weatherIconSrc}
            iconWidth={50}
            iconHeight={50}
            temp={temp}
            precipProb={precipProb}
            precipAmount={precipAmount}
            windSpeed={windSpeed}
          />
        );
      })}
    </div>
  );
};

export default DailyForecast;

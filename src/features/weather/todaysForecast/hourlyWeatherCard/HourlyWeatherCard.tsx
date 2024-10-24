import { CloudHail, Umbrella, Wind } from "lucide-react";
import styles from "./HourlyWeatherCard.module.scss";
import { getPrecipIntensity, getWindStrength } from "@/utils/weatherUtils";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";

const HourlyWeatherCard = ({
  hour,
  weatherIconSrc,
  iconWidth,
  iconHeight,
  temp,
  precipProb,
  precipAmount,
  windSpeed,
}: {
  hour: string;
  weatherIconSrc: string;
  iconWidth: number;
  iconHeight: number;
  temp: number;
  precipProb: number;
  precipAmount: number;
  windSpeed: number;
}) => {
  return (
    <div className={styles.hourlyWeather}>
      <div className={styles.hourlyWeather__top}>
        <p className={styles.hourlyWeather__time}>{hour}</p>
        <div className={styles.hourlyWeather__weatherIcon}>
          <WeatherIcon
            weatherIcon={weatherIconSrc}
            width={iconWidth}
            height={iconHeight}
          />
        </div>
        <div className={styles.hourlyWeather__temp}>{temp}°</div>
      </div>

      <div className={styles.hourlyWeather__bottom}>
        <div
          className={`${styles.hourlyWeather__precipProb} ${
            precipProb > 0 ? styles.precipProbActive : ""
          }`}
        >
          <Umbrella className={styles.hourlyWeather__icon} />
          <p>
            {precipProb}
            <span>%</span>
          </p>
        </div>

        <div className={styles.hourlyWeather__precip}>
          <CloudHail className={styles.hourlyWeather__icon} />
          <p>
            {precipAmount}
            <span>mm</span>
          </p>
          <div className={styles.hourlyWeather__weatherIndex}>
            {getPrecipIntensity(precipAmount)}
          </div>
        </div>

        <div className={styles.hourlyWeather__wind}>
          <Wind className={styles.hourlyWeather__icon} />
          <p>
            {windSpeed}
            <span>kph</span>
          </p>
          <div className={styles.hourlyWeather__weatherIndex}>
            {getWindStrength(windSpeed)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyWeatherCard;

// return (
//   <div className={styles.dailyWeather}>
//     <div className={styles.dailyWeather__top}>
//       <p className={styles.dailyWeather__time}>9:00 AM</p>

//       <div className={styles.dailyWeather__weatherIcon}>Icon</div>

//       <div className={styles.dailyWeather__temp}>10°</div>
//     </div>

//     <div className={styles.dailyWeather__bottom}>
//       <div className={styles.dailyWeather__precip}>
//         <div className={styles.dailyWeather__precipProb}>
//           <Umbrella className={styles.dailyWeather__icon} />
//           <p>10%</p>
//         </div>

//         <div className={styles.dailyWeather__precipAmount}>
//           <p>5.5mm</p>
//           <div className={styles.dailyWeather__weatherIndex}>
//             {getPrecipIntensity(5.5)}
//           </div>
//         </div>
//       </div>

//       <div className={styles.dailyWeather__wind}>
//         <div className={styles.dailyWeather__windSpeed}>
//           <Wind className={styles.dailyWeather__icon} />
//           <p>120kph</p>
//         </div>
//         <div className={styles.dailyWeather__weatherIndex}>
//           {getWindStrength(120)}
//         </div>
//       </div>
//     </div>
//   </div>
// );

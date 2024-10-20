import { CloudHail, Umbrella, Wind } from "lucide-react";
import styles from "./DailyWeatherCard.module.scss";
import { getPrecipIntensity, getWindStrength } from "@/utils/weatherUtils";

const DailyWeatherCard = () => {
  return (
    <div className={styles.dailyWeather}>
      <div className={styles.dailyWeather__top}>
        <p className={styles.dailyWeather__time}>9:00 AM</p>
        <div className={styles.dailyWeather__weatherIcon}>Icon</div>
        <div className={styles.dailyWeather__temp}>10°</div>
      </div>

      <div className={styles.dailyWeather__bottom}>
        <div className={styles.dailyWeather__precipProb}>
          <Umbrella className={styles.dailyWeather__icon} />
          <p>
            10 <span>%</span>
          </p>
        </div>

        <div className={styles.dailyWeather__precip}>
          <CloudHail className={styles.dailyWeather__icon} />
          <p>
            5.5<span>mm</span>
          </p>
          <div className={styles.dailyWeather__weatherIndex}>
            {getPrecipIntensity(5.5)}
          </div>
        </div>

        <div className={styles.dailyWeather__wind}>
          <Wind className={styles.dailyWeather__icon} />
          <p>
            120<span>kph</span>
          </p>
          <div className={styles.dailyWeather__weatherIndex}>
            {getWindStrength(120)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyWeatherCard;

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

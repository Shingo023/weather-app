import CurrentDateTime from "@/features/weather/currentWeather/CurrentDateTime";
import styles from "./FavoriteCityCard.module.scss";

type FavoriteCityCardPropsType = {
  cityName: string;
  cityAddress: string;
  currentTemp: number;
  currentWeather: string;
};

const FavoriteCityCard = ({
  cityName,
  cityAddress,
  currentTemp,
  currentWeather,
}: FavoriteCityCardPropsType) => {
  return (
    <div className={styles.cityCard}>
      <div className={styles.cityCard__cityInfo}>
        <div className={styles.cityCard__cityName}>{cityName}</div>
        <div className={styles.cityCard__cityAddress}>{cityAddress}</div>
      </div>

      <div className={styles.cityCard__weather}>
        <div className={styles.cityCard__currentWeatherInfo}>
          <div className={styles.cityCard__currentDateTime}>
            {currentDateTime}
          </div>
          <div className={styles.cityCard__currentTemp}>{currentTemp}°</div>
          <div className={styles.cityCard__currentWeather}>
            {currentWeather}
          </div>
        </div>
        <div className={styles.cityCard__hourlyWeather}></div>
      </div>

      <div className={styles.cityCard__buttons}>
        <button>Edit City Name</button>
        <button>Set as Default</button>
      </div>
    </div>
  );
};

export default FavoriteCityCard;

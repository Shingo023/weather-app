"use client";

import { FavoriteCityCardPropsType } from "@/types";
import styles from "./FavoriteCityCard.module.scss";
import { iconMapping } from "@/utils/weatherIconMapping";

const FavoriteCityCard = ({
  cityName,
  cityAddress,
  currentTemp,
  currentWeather,
  currentDateTime,
  onClick,
}: FavoriteCityCardPropsType) => {
  const currentWeatherIcon =
    currentWeather !== undefined ? iconMapping[currentWeather] : undefined;

  return (
    <div className={styles.cityCard} onClick={onClick}>
      <div className={styles.cityCard__cityInfo}>
        <div className={styles.cityCard__cityName}>{cityName}</div>
        <div className={styles.cityCard__nameEdit}>Edit</div>
        <div className={styles.cityCard__cityAddress}>{cityAddress}</div>
      </div>

      <div className={styles.cityCard__weather}>
        <div className={styles.cityCard__currentInfo}>
          <div className={styles.cityCard__currentDateTime}>
            {currentDateTime}
          </div>
          <div className={styles.cityCard__currentWeather}>
            <div className={styles.cityCard__currentWeatherIconContainer}>
              {currentWeatherIcon ? (
                <img
                  src={currentWeatherIcon}
                  alt="Weather icon"
                  width={70}
                  height={70}
                  className={styles.cityCard__currentWeatherIcon}
                />
              ) : null}
            </div>
            <div className={styles.cityCard__currentTemp}>{currentTemp}°</div>
          </div>
        </div>
        <div className={styles.cityCard__hourlyWeather}></div>
      </div>

      <div className={styles.cityCard__buttons}>
        <button>Set as Default</button>
      </div>
    </div>
  );
};

export default FavoriteCityCard;

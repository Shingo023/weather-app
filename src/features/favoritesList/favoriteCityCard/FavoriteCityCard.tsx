"use client";

import { FavoriteCityCardPropsType } from "@/types";
import styles from "./FavoriteCityCard.module.scss";
import { iconMapping } from "@/utils/weatherIconMapping";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FavoriteCityCard = ({
  favoriteCityId,
  userId,
  cityName,
  cityAddress,
  currentTemp,
  currentWeather,
  currentDateTime,
  homeLocationId,
  setHomeLocationId,
  onClick,
}: FavoriteCityCardPropsType) => {
  const currentWeatherIcon =
    currentWeather !== undefined ? iconMapping[currentWeather] : null;

  const updateHomeLocation = async (
    currentHomeLocationId: number | null,
    newHomeLocationId: number | null
  ) => {
    try {
      const response = await fetch(`/api/users/${userId}/default-city`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentHomeLocationId,
          newHomeLocationId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update default city");
      }

      setHomeLocationId(newHomeLocationId);
      toast.success(
        `${cityName} has been successfully set as the home location.`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const unsetHomeLocation = async (currentHomeLocationId: number | null) => {
    try {
      const response = await fetch(`/api/users/${userId}/default-city`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentHomeLocationId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update default city");
      }

      setHomeLocationId(null);
      toast.success(`${cityName} has been unset as the home location.`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.cityCard}>
      <div className={styles.cityCard__cityInfo}>
        <div className={styles.cityCard__cityName}>{cityName}</div>
        <div className={styles.cityCard__homeIconContainer}>
          <MapPinIcon
            className={`${styles.cityCard__homeIcon} ${
              favoriteCityId === homeLocationId ? styles.active : ""
            }`}
            onClick={() => {
              if (favoriteCityId === homeLocationId) {
                unsetHomeLocation(homeLocationId);
              } else {
                updateHomeLocation(homeLocationId, favoriteCityId);
              }
            }}
          />
        </div>
        <div className={styles.cityCard__cityAddress}>{cityAddress}</div>
      </div>

      <div className={styles.cityCard__weather}>
        <div className={styles.cityCard__currentInfo}>
          <div className={styles.cityCard__currentDateTime}>
            {currentDateTime}
          </div>
          <div className={styles.cityCard__currentWeather}>
            <div className={styles.cityCard__currentWeatherIconContainer}>
              <WeatherIcon
                weatherIcon={currentWeatherIcon}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.cityCard__currentTemp}>{currentTemp}°</div>
          </div>
        </div>
        <div className={styles.cityCard__hourlyWeather}></div>
      </div>

      <div className={styles.cityCard__buttons}>
        <button onClick={onClick}>Weather Details</button>
        <button>Edit Place Name</button>
      </div>
    </div>
  );
};

export default FavoriteCityCard;

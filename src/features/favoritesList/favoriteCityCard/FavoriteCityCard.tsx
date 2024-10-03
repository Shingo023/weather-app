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

  const updateHomeLocationApi = async (body: any) => {
    const response = await fetch(`/api/users/${userId}/default-city`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to update default city");
    }
    return response;
  };

  const updateHomeLocation = async (newHomeLocationId: number | null) => {
    try {
      await updateHomeLocationApi({
        currentHomeLocationId: homeLocationId,
        newHomeLocationId,
      });
      setHomeLocationId(newHomeLocationId);
      toast.success(
        `${cityName} has been successfully set as the home location.`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const unsetHomeLocation = async () => {
    try {
      await updateHomeLocationApi({
        currentHomeLocationId: homeLocationId,
      });
      setHomeLocationId(null);
      toast.success(`${cityName} has been unset as the home location.`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIconClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    if (favoriteCityId === homeLocationId) {
      unsetHomeLocation();
    } else {
      updateHomeLocation(favoriteCityId);
    }
  };

  return (
    <div className={styles.cityCard} onClick={onClick}>
      <div className={styles.cityCard__cityInfo}>
        <div className={styles.cityCard__cityName}>{cityName}</div>
        <div className={styles.cityCard__homeIconContainer}>
          <MapPinIcon
            className={`${styles.cityCard__homeIcon} ${
              favoriteCityId === homeLocationId ? styles.active : ""
            }`}
            onClick={handleIconClick}
          />
          <span className={styles.cityCard__homeIconTooltip}>
            {favoriteCityId === homeLocationId
              ? "Unset home location"
              : "Set as home location"}
          </span>
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
        <button>Edit Place Name</button>
      </div>
    </div>
  );
};

export default FavoriteCityCard;

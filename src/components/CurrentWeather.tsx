"use client";

import { useDisplayedCityWeather } from "@/contexts/DisplayedCityWeatherContext";
import { WeatherIcon } from "@/types";
import { iconMapping } from "@/utils/weatherIconMapping";
import React, { useEffect, useState } from "react";
import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import { RotateCcw, Star } from "lucide-react";
import { getCityWeatherInfoByCoordinates } from "@/actions/weather";
import styles from "./CurrentWeather.module.scss";
import { useSession } from "next-auth/react";

const CurrentWeather = () => {
  const {
    cityToDisplay,
    address,
    placeId,
    setDisplayedCityWeather,
    displayedCityWeather,
  } = useDisplayedCityWeather();
  const { data: session } = useSession();

  const [favoriteCityPlaceIds, setFavoriteCityPlaceIds] = useState<string[]>(
    []
  );
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavoriteCities = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(
            `/api/user-favorite-cities?userId=${session.user.id}`
          );
          const favoriteCities = await response.json();
          setFavoriteCityPlaceIds(favoriteCities);
        } catch (error) {
          console.error("Error fetching favorite cities:", error);
        }
      }
    };

    fetchFavoriteCities();
  }, [session]);

  useEffect(() => {
    if (placeId && favoriteCityPlaceIds.length > 0) {
      const isCityFavorite = favoriteCityPlaceIds.includes(placeId);
      setIsFavorite(isCityFavorite);
    }
  }, [placeId, favoriteCityPlaceIds]);

  const currentTimeAndDate =
    displayedCityWeather?.timezone !== undefined
      ? getCurrentTimeAndDate(displayedCityWeather?.timezone)
      : undefined;

  const currentTemp = displayedCityWeather?.currentConditions.temp
    ? Math.round(displayedCityWeather.currentConditions.temp)
    : undefined;

  const currentFeelslikeTemp = displayedCityWeather?.currentConditions.feelslike
    ? Math.round(displayedCityWeather.currentConditions.feelslike)
    : undefined;

  const currentWeather = displayedCityWeather?.currentConditions.icon as
    | WeatherIcon
    | undefined;

  const currentWeatherIcon =
    currentWeather !== undefined ? iconMapping[currentWeather] : undefined;

  const updateWeatherInfo = async () => {
    setDisplayedCityWeather(null);

    const displayedCityLat = displayedCityWeather?.latitude;
    const displayedCityLng = displayedCityWeather?.longitude;

    if (displayedCityLat !== undefined && displayedCityLng !== undefined) {
      try {
        const updatedWeather = await getCityWeatherInfoByCoordinates(
          displayedCityLat,
          displayedCityLng
        );
        setDisplayedCityWeather(updatedWeather);
      } catch (error) {
        console.error("Error updating weather information:", error);
      }
    } else {
      console.error("Latitude or longitude is undefined.");
    }
  };

  const handleStarClick = async () => {
    if (isFavorite) {
      const confirmUnbookmark = window.confirm(
        `Do you want to remove ${cityToDisplay} from your favorite cities?`
      );
      if (confirmUnbookmark) {
        try {
          setIsFavorite(false);
          await unbookmarkCity();
        } catch (error) {
          console.error("Error unbookmarking city:", error);
        }
      }
    } else {
      const confirmBookmark = window.confirm(
        `Do you want to add ${cityToDisplay} to your favorite cities?`
      );
      if (confirmBookmark) {
        try {
          setIsFavorite(true);
          await bookmarkCity();
        } catch (error) {
          console.error("Error bookmarking city:", error);
        }
      }
    }
  };

  const bookmarkCity = async () => {
    const newCity = {
      cityName: cityToDisplay,
      latitude: displayedCityWeather?.latitude,
      longitude: displayedCityWeather?.longitude,
      placeId,
      address,
      timeZone: displayedCityWeather?.timezone,
    };

    try {
      // First, check if the city already exists in the FavoriteCity table
      const cityResponse = await fetch(
        `/api/favorite-cities?placeId=${placeId}`
      );
      const city = await cityResponse.json();

      let cityId;
      if (!city) {
        // City does not exist, so create a new city in the FavoriteCity table
        const createCityResponse = await fetch(`/api/favorite-cities`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCity),
        });

        const createdCity = await createCityResponse.json();
        cityId = createdCity.id;
      } else {
        // City exists, use the existing city ID
        cityId = city.id;
      }

      // Now, add the city to the UserFavoriteCity table for the current user
      const addUserFavoriteCityResponse = await fetch(
        `/api/user-favorite-cities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session?.user?.id,
            favoriteCityId: cityId,
          }),
        }
      );

      if (!addUserFavoriteCityResponse.ok) {
        throw new Error("Failed to add city to favorites");
      }
    } catch (error) {
      console.error("Error bookmarking the city:", error);
      throw error;
    }
  };

  const unbookmarkCity = async () => {
    try {
      // First, get the favoriteCityId for the current city (using placeId)
      const cityResponse = await fetch(
        `/api/favorite-cities?placeId=${placeId}`
      );
      const city = await cityResponse.json();

      if (!city || !city.id) {
        throw new Error("City not found in favorites");
      }

      const favoriteCityId = city.id;

      // Delete the city from the UserFavoriteCity table using favoriteCityId
      const response = await fetch(`/api/user-favorite-cities`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          favoriteCityId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove city from favorites");
      }
    } catch (error) {
      console.error("Error unbookmarking the city:", error);
      throw error;
    }
  };

  // Render loading state if any key weather information is missing
  if (
    !cityToDisplay ||
    currentTimeAndDate === undefined ||
    currentTemp === undefined ||
    currentFeelslikeTemp === undefined ||
    currentWeatherIcon === undefined
  ) {
    return (
      <div className={styles.currentWeather__loading}>
        Loading weather data...
      </div>
    );
  }

  return (
    <div className={styles.currentWeather}>
      <div className={styles.currentWeather__data}>
        <div className={styles.currentWeather__citySection}>
          <div className={styles.currentWeather__cityName}>{cityToDisplay}</div>
          <div className={styles.currentWeather__starContainer}>
            <Star
              className={styles.currentWeather__starIcon}
              style={{
                height: "24px",
                width: "24px",
                fill: isFavorite ? "yellow" : "none",
                color: isFavorite ? "yellowgreen" : "black",
              }}
              onClick={handleStarClick}
            />
          </div>
        </div>

        <div className={styles.currentWeather__stateAndCountry}>
          <div className={styles.currentWeather__stateName}>{address}</div>
        </div>

        <div className={styles.currentWeather__dateTimeContainer}>
          <div
            className={styles.currentWeather__dateTime}
            onClick={updateWeatherInfo}
          >
            {currentTimeAndDate}
          </div>
          <div className={styles.currentWeather__updateIconContainer}>
            <RotateCcw className={styles.currentWeather__updateIcon} />
          </div>
        </div>

        <div className={styles.currentWeather__temp}>{currentTemp}°</div>
        <div className={styles.currentWeather__feelslikeTemp}>
          Feels like {currentFeelslikeTemp}°
        </div>
      </div>

      <div className={styles.currentWeather__weatherIconContainer}>
        {currentWeatherIcon ? (
          <img
            src={currentWeatherIcon}
            alt="Weather icon"
            width={150}
            height={150}
            className={styles.currentWeather__weatherIcon}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CurrentWeather;

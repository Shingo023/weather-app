"use client";

import styles from "./CurrentWeather.module.scss";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StarIconPropsType } from "@/types";

const StarIcon = ({
  displayedCityWeather,
  cityToDisplay,
  address,
  placeId,
  favoriteCitiesPlaceIds,
  setFavoriteCitiesPlaceIds,
}: StarIconPropsType) => {
  const { data: session } = useSession();

  const fetchCityData = async () => {
    const response = await fetch(`/api/favorite-cities?placeId=${placeId}`);
    if (!response.ok) {
      throw new Error("City not found");
    }
    return response.json();
  };

  const updateFavoriteCities = (placeId: string, add: boolean) => {
    setFavoriteCitiesPlaceIds((prev) =>
      add ? [...prev, placeId] : prev.filter((id) => id !== placeId)
    );
  };

  const bookmarkCity = async () => {
    if (!session) {
      alert("You need to log in to use the favorites feature.");
      return;
    }

    if (!placeId) return;

    updateFavoriteCities(placeId, true);

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
      const city = await fetchCityData();
      let cityId = city?.id;

      if (!city) {
        // If the city does not exist, create a new city in the FavoriteCity table
        const createCityResponse = await fetch(`/api/favorite-cities`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCity),
        });
        const createdCity = await createCityResponse.json();
        cityId = createdCity.id;
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
            customName: cityToDisplay,
            favoriteCityId: cityId,
          }),
        }
      );

      if (!addUserFavoriteCityResponse.ok) {
        updateFavoriteCities(placeId, false);
        throw new Error("Failed to add city to favorites");
      }

      toast.success(`${cityToDisplay} has been added to your favorite cities!`);
    } catch (error) {
      console.error("Error bookmarking the city:", error);
      updateFavoriteCities(placeId, false);
      toast.error(`Failed to add ${cityToDisplay} to favorites.`);
    }
  };

  const unbookmarkCity = async () => {
    if (!session) {
      alert("You need to log in to use the favorites feature.");
      return;
    }

    if (!placeId) return;

    updateFavoriteCities(placeId, false);

    try {
      // First, get the favoriteCityId for the current city (using placeId)
      const city = await fetchCityData();
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
        updateFavoriteCities(placeId, true);
        throw new Error("Failed to remove city from favorites");
      }

      toast.success(`${cityToDisplay} has been removed from your favorites.`);
    } catch (error) {
      console.error("Error unbookmarking the city:", error);
      updateFavoriteCities(placeId, true);
      toast.error(`Failed to remove ${cityToDisplay} from favorites.`);
    }
  };

  const handleStarClick = () => {
    if (placeId && favoriteCitiesPlaceIds.includes(placeId)) {
      unbookmarkCity();
    } else {
      bookmarkCity();
    }
  };

  return (
    <div>
      <div className={styles.currentWeather__starContainer}>
        <Star
          className={`${styles.currentWeather__starIcon} ${
            placeId && favoriteCitiesPlaceIds.includes(placeId)
              ? styles.isFavorite
              : ""
          }`}
          onClick={handleStarClick}
          style={{
            cursor: placeId ? "pointer" : "not-allowed",
          }}
        />
      </div>
    </div>
  );
};

export default StarIcon;

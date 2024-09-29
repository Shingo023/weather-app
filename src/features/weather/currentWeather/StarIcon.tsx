"use client";

import { useEffect, useState } from "react";
import styles from "./CurrentWeather.module.scss";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useDisplayedCityWeather } from "@/contexts/DisplayedCityWeatherContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FavoriteCity, WeatherData } from "@/types";

interface CurrentWeatherProps {
  displayedCityWeather: WeatherData | null;
  cityToDisplay: string | null;
  address: string | null;
  placeId: string | null;
}

const StarIcon = ({
  displayedCityWeather,
  cityToDisplay,
  address,
  placeId,
}: CurrentWeatherProps) => {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavoriteCities = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(
            `/api/user-favorite-cities?userId=${session.user.id}`
          );
          const favoriteCities = await response.json();

          if (favoriteCities.length > 0) {
            const isCityFavorite = favoriteCities.some(
              (city: FavoriteCity) => city.placeId === placeId
            );
            setIsFavorite(isCityFavorite);
          } else {
            setIsFavorite(false);
          }
        } catch (error) {
          console.error("Error fetching favorite cities:", error);
        }
      }
    };

    fetchFavoriteCities();
  }, [session, placeId]);

  const handleStarClick = async () => {
    if (!session) {
      alert("You need to log in to use the favorites feature.");
      return;
    }

    if (isFavorite) {
      try {
        setIsFavorite(false);
        await unbookmarkCity();
      } catch (error) {
        console.error("Error unbookmarking city:", error);
      }
    } else {
      try {
        setIsFavorite(true);
        await bookmarkCity();
      } catch (error) {
        console.error("Error bookmarking city:", error);
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

      toast.success(`${cityToDisplay} has been added to your favorite cities!`);
    } catch (error) {
      console.error("Error bookmarking the city:", error);
      toast.error(`Failed to add ${cityToDisplay} to favorites.`);
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

      toast.success(`${cityToDisplay} has been removed from your favorites.`);
    } catch (error) {
      console.error("Error unbookmarking the city:", error);
      toast.error(`Failed to remove ${cityToDisplay} from favorites.`);
      throw error;
    }
  };

  return (
    <>
      <ToastContainer />

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
    </>
  );
};

export default StarIcon;

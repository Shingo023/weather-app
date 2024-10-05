import { FavoriteCityContainerPropsType } from "@/types";
import EditPlaceNameModal from "../editPlaceNameModal/EditPlaceNameModal";
import FavoriteCityCard from "../favoriteCityCard/FavoriteCityCard";
import { useState } from "react";

const FavoriteCityContainer = ({
  favoriteCityId,
  userId,
  cityName,
  cityAddress,
  cityPlaceId,
  currentTemp,
  currentWeather,
  currentDateTime,
  homeLocationId,
  setHomeLocationId,
  cityLat,
  cityLng,
}: FavoriteCityContainerPropsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [placeNameToDisplay, setPlaceNameToDisplay] = useState(cityName);

  return (
    <div>
      <FavoriteCityCard
        userId={userId}
        favoriteCityId={favoriteCityId}
        cityName={cityName}
        cityAddress={cityAddress}
        cityPlaceId={cityPlaceId}
        currentTemp={currentTemp}
        currentWeather={currentWeather}
        currentDateTime={currentDateTime}
        homeLocationId={homeLocationId}
        setHomeLocationId={setHomeLocationId}
        cityLat={cityLat}
        cityLng={cityLng}
        placeNameToDisplay={placeNameToDisplay}
        setIsModalOpen={setIsModalOpen}
      />
      <EditPlaceNameModal
        cityName={cityName}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setPlaceNameToDisplay={setPlaceNameToDisplay}
        favoriteCityId={favoriteCityId}
        cityAddress={cityAddress}
      />
    </div>
  );
};

export default FavoriteCityContainer;

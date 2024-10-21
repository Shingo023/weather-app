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
  timeZone,
  homeLocationId,
  setHomeLocationId,
  cityLat,
  cityLng,
  twentyFourHoursWeather,
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
        timeZone={timeZone}
        homeLocationId={homeLocationId}
        setHomeLocationId={setHomeLocationId}
        cityLat={cityLat}
        cityLng={cityLng}
        placeNameToDisplay={placeNameToDisplay}
        setIsModalOpen={setIsModalOpen}
        twentyFourHoursWeather={twentyFourHoursWeather}
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

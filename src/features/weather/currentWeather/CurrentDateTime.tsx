import { getCityWeatherInfoByCoordinates } from "@/actions/weather";
import { useDisplayedCityWeather } from "@/contexts/DisplayedCityWeatherContext";
import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import styles from "./CurrentWeather.module.scss";
import { RotateCcw } from "lucide-react";

const CurrentDateTime = () => {
  const { displayedCityWeather, setDisplayedCityWeather } =
    useDisplayedCityWeather();

  const currentTimeAndDate =
    displayedCityWeather?.timezone !== undefined
      ? getCurrentTimeAndDate(displayedCityWeather?.timezone)
      : undefined;

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

  return (
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
  );
};

export default CurrentDateTime;

import { useDisplayedCityWeather } from "@/contexts/DisplayedCityWeatherContext";
import { WeatherDay } from "@/types";
import styles from "../style/components/CurrentWeather.module.scss";

const CurrentWeather = () => {
  const { displayedCityWeather } = useDisplayedCityWeather();

  // To display city, province, and country (e.g., Vancouver, BC, Canada)
  const displayedCity: string | undefined =
    displayedCityWeather?.resolvedAddress;

  // To display city as you input in the field (e.g., vancouver / Vancouver)
  // const cityName: string | undefined = displayedCityWeather?.address;

  const currentWeather: WeatherDay | undefined = displayedCityWeather?.days[0];

  const currentFahrenheit: number | undefined = currentWeather?.temp;

  function fahrenheitToCelsius(fahrenheit: number) {
    return ((fahrenheit - 32) * 5) / 9;
  }

  const currentCelsius: number | undefined =
    currentFahrenheit !== undefined
      ? Math.round(fahrenheitToCelsius(currentFahrenheit))
      : undefined;

  return (
    <div className={styles.CurrentWeather}>
      <h3>{displayedCity}</h3>
      <h2>{currentCelsius}°</h2>
    </div>
  );
};

export default CurrentWeather;

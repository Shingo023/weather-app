import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DisplayedCityWeatherContextType, WeatherData } from "@/types";
import { getCityWeatherInfoByCoordinates } from "@/actions/weather";

const defaultValue: DisplayedCityWeatherContextType = {
  displayedCityWeather: null,
  setDisplayedCityWeather: () => {},
  updateCity: () => {},
  cityToDisplay: null,
  setCityToDisplay: () => {},
  state: null,
  setState: () => {},
  country: null,
  setCountry: () => {},
};

export const DisplayedCityWeatherContext =
  createContext<DisplayedCityWeatherContextType>(defaultValue);

export function DisplayedCityWeatherProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [displayedCityWeather, setDisplayedCityWeather] =
    useState<WeatherData | null>(null);

  const [cityToDisplay, setCityToDisplay] = useState<string | null>(null);

  const [state, setState] = useState<string | null>(null);

  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherForCurrentLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const weatherData = await getCityWeatherInfoByCoordinates(
                latitude,
                longitude
              );
              setDisplayedCityWeather(weatherData);

              // Reverse Geocoding API call to get the city name
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const data = await response.json();
              console.log(data);
              const cityName =
                data.address.city || data.address.town || data.address.village;
              const countryName = data.address.country;
              const stateName = data.address.state;

              setCityToDisplay(cityName || "Unknown Location");
              setState(stateName || null);
              setCountry(countryName || null);
            } catch (error) {
              console.error("Error fetching weather or location info:", error);
            }
          },
          (error) => {
            console.error("Error getting geolocation:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchWeatherForCurrentLocation();
  }, []);

  const updateCity = (newCity: WeatherData) => {
    setDisplayedCityWeather(newCity);
  };

  return (
    <DisplayedCityWeatherContext.Provider
      value={{
        cityToDisplay,
        setCityToDisplay,
        displayedCityWeather,
        setDisplayedCityWeather,
        updateCity,
        state,
        setState,
        country,
        setCountry,
      }}
    >
      {children}
    </DisplayedCityWeatherContext.Provider>
  );
}

export const useDisplayedCityWeather = () =>
  useContext(DisplayedCityWeatherContext);

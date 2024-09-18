import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DisplayedCityWeatherContextType, WeatherData } from "@/types";
import { getCityWeatherInfoByCoordinates } from "@/actions/weather";

// Define the GeocodeResult type for Google Maps API response
interface GeocodeResult {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
}

const defaultValue: DisplayedCityWeatherContextType = {
  displayedCityWeather: null,
  setDisplayedCityWeather: () => {},
  updateCity: () => {},
  cityToDisplay: null,
  setCityToDisplay: () => {},
  address: null,
  setAddress: () => {},
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

  const [address, setAddress] = useState<string | null>(null);

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

              // Google Maps Geocoding API call to get the city name
              const googleMapsApiKey =
                process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}`
              );
              const data = await response.json();

              if (data.status === "OK" && data.results.length > 0) {
                const geocodeResult: GeocodeResult = data.results[0];
                const addressComponents = geocodeResult.address_components;

                // Extracting city from the geocode result
                const cityComponent = addressComponents.find((component) =>
                  component.types.includes("locality")
                );

                console.log(data);

                const cityName = cityComponent?.long_name || "Unknown Location";
                const address = geocodeResult?.formatted_address || null;

                setCityToDisplay(cityName || "Unknown Location");
                setAddress(address || null);
              } else {
                console.error("No results from Geocoding API");
              }
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
        address,
        setAddress,
      }}
    >
      {children}
    </DisplayedCityWeatherContext.Provider>
  );
}

export const useDisplayedCityWeather = () =>
  useContext(DisplayedCityWeatherContext);

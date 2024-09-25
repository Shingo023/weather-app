"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DisplayedCityWeatherContextType,
  GeocodeResult,
  WeatherData,
} from "@/types";

const defaultValue: DisplayedCityWeatherContextType = {
  displayedCityWeather: null,
  setDisplayedCityWeather: () => {},
  updateCity: () => {},
  cityToDisplay: null,
  setCityToDisplay: () => {},
  address: null,
  setAddress: () => {},
  placeId: null,
  setPlaceId: () => {},
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
  const [placeId, setPlaceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherForCurrentLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const weatherResponse = await fetch(
                `/api/weather?lat=${latitude}&lng=${longitude}`
              );
              const weatherData: WeatherData = await weatherResponse.json();
              setDisplayedCityWeather(weatherData);

              const geocodeResponse = await fetch(
                `/api/geocode?lat=${latitude}&lng=${longitude}`
              );
              const geocodeData = await geocodeResponse.json();

              if (
                geocodeData.status === "OK" &&
                geocodeData.results.length > 0
              ) {
                const geocodeResult: GeocodeResult = geocodeData.results[0];
                const addressComponents = geocodeResult.address_components;

                // Extracting city from the geocode result
                const cityComponent = addressComponents.find((component) =>
                  component.types.includes("locality")
                );

                const cityName = cityComponent?.long_name || "Unknown Location";
                const address = geocodeResult?.formatted_address || null;
                const placeId = geocodeResult?.place_id || null;

                setCityToDisplay(cityName || "Unknown Location");
                setAddress(address || null);
                setPlaceId(placeId || null);
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
        placeId,
        setPlaceId,
      }}
    >
      {children}
    </DisplayedCityWeatherContext.Provider>
  );
}

export const useDisplayedCityWeather = () =>
  useContext(DisplayedCityWeatherContext);

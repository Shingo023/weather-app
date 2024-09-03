"use client";

import { useRef, useEffect, useState } from "react";
import { LoadScriptProps, useJsApiLoader } from "@react-google-maps/api";
import { useDisplayedCityWeather } from "@/contexts/DisplayedCityWeatherContext";
import { getCityWeatherInfoByCoordinates } from "@/actions/weather";

// "places" library: necessary for autocomplete for addresses and places
const libraries: LoadScriptProps["libraries"] = ["places"];

const SearchBar = () => {
  const { setDisplayedCityWeather } = useDisplayedCityWeather();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [librariesArray] = useState<LoadScriptProps["libraries"]>(libraries);

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: librariesArray,
  });

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    // Initialize Google Places Autocomplete
    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ["(cities)"],
      fields: ["name", "geometry"], // Include geometry to get lat/lng
    });

    // Event listener for place selection
    const handlePlaceChanged = async () => {
      const place = autocomplete.getPlace();
      const city = place.name;
      const lat = place.geometry?.location?.lat();
      const lng = place.geometry?.location?.lng();

      if (city && lat && lng) {
        try {
          // Fetch weather data using coordinates
          const weatherData = await getCityWeatherInfoByCoordinates(lat, lng);

          if (weatherData) {
            setDisplayedCityWeather(weatherData);
          } else {
            alert(
              "Weather data for the selected city is unavailable. Please try another city."
            );
          }
        } catch (error) {
          console.error("Error fetching weather info", error);
          alert("Failed to fetch weather data. Please try again later.");
        }
      } else {
        alert("Please select a city from the suggestions.");
      }
    };

    // Attach the listener
    autocomplete.addListener("place_changed", handlePlaceChanged);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [isLoaded, setDisplayedCityWeather]);

  if (loadError) {
    console.error("Error loading Google Maps:", loadError);
    return <div>Error loading Google Maps</div>;
  }

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Enter a city" />
    </div>
  );
};

export default SearchBar;
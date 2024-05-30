"use client";

import { useRef, useState, useEffect } from "react";
import { useJsApiLoader, LoadScriptProps } from "@react-google-maps/api";
import { useDisplayedCityWeather } from "@/contexts/DisplayedCityWeatherContext";
import { getCityWeatherInfo } from "@/actions/weather";

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
    if (isLoaded && inputRef.current) {
      // Add an autocomplete feature to the input field
      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["(cities)"],
          fields: ["name"], // other options: "address_components", "geometry"
        }
      );

      // 'addListener' is used to add event listeners to Google Maps objects (e.g., 'autocomple').
      autocomplete.addListener("place_changed", async () => {
        const cityData = autocomplete.getPlace();
        const city = cityData.name;

        if (city) {
          try {
            console.log("Selected place:", city);
            // Handle the selected city's weather.
            const selectedCityWeather = await getCityWeatherInfo(city);
            setDisplayedCityWeather(selectedCityWeather);
          } catch (error) {
            console.error("Error fetching weather info", error);
          }
        } else {
          console.error("City name is undefined.");
        }
      });
    }
  }, [isLoaded, setDisplayedCityWeather]);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
    <div>
      <input
        ref={inputRef}
        id="searchCity"
        type="text"
        placeholder="Enter a city"
        onFocus={handleFocus}
      />
    </div>
  );
};

export default SearchBar;

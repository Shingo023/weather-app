"use client";

import { useRef, useState } from "react";
import { useDisplayedCityWeather } from "@/contexts/DisplayedCityWeatherContext";
import { autocompleteSuggestion, WeatherData } from "@/types";
import { debounce } from "@/utils/debounce";
import styles from "./SearchBar.module.scss";

// "places" library: necessary for autocomplete for addresses and places
const SearchBar = () => {
  const { setCityToDisplay, setAddress, setPlaceId, setDisplayedCityWeather } =
    useDisplayedCityWeather();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<
    autocompleteSuggestion[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = debounce(async () => {
    const input = inputRef.current?.value;

    if (!input) {
      setAutocompleteSuggestions([]);
      setError(null);
      return;
    }

    setError(null);

    try {
      const response = await fetch(
        `/api/autocomplete?input=${encodeURIComponent(input)}`
      );
      const data = await response.json();

      if (data.predictions) {
        setAutocompleteSuggestions(data.predictions);
      } else {
        setAutocompleteSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching autocomplete data:", error);
      setError("Failed to fetch suggestions. Please try again.");
    }
  }, 500);

  // Handle place selection and fetch weather data
  const handlePlaceSelect = async (
    placeName: string,
    placeId: string,
    description: string
  ) => {
    setAutocompleteSuggestions([]);
    setError(null);

    if (inputRef.current) {
      inputRef.current.value = description;
    }

    try {
      const coordinateResponse = await fetch(
        `/api/place-coordinate?placeId=${placeId}`
      );
      const coordinateData = await coordinateResponse.json();
      const { latitude, longitude } = coordinateData;

      if (latitude && longitude && placeName && description) {
        setCityToDisplay(placeName);
        setAddress(description);
        setPlaceId(placeId);

        // Fetch weather data only if coordinates are valid
        try {
          const weatherResponse = await fetch(
            `/api/weather?lat=${latitude}&lng=${longitude}`
          );
          const weatherData: WeatherData = await weatherResponse.json();
          setDisplayedCityWeather(weatherData);
        } catch (error) {
          console.error("Error fetching weather info", error);
          setError("Failed to fetch weather data. Please try again.");
        }
      } else {
        setError("Invalid place data. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      setError("Failed to fetch place details. Please try again.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (autocompleteSuggestions.length > 0) {
        setError("Please select a suggested place from the dropdown.");
      } else {
        setError(null);
      }
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a city"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {autocompleteSuggestions.length > 0 && (
        <ul className={styles.searchBar__suggestionsList} role="listbox">
          {autocompleteSuggestions.map((suggestion) => (
            <li
              className={styles.searchBar__suggestion}
              role="option"
              key={suggestion.place_id}
              onClick={() =>
                handlePlaceSelect(
                  suggestion.structured_formatting.main_text,
                  suggestion.place_id,
                  suggestion.description
                )
              }
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

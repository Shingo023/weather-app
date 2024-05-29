"use client";

import { useRef, useState, useEffect } from "react";
import { useJsApiLoader, LoadScriptProps } from "@react-google-maps/api";

// "places" library: necessary for autocomplete for addresses and places
const libraries: LoadScriptProps["libraries"] = ["places"];

const SearchBar = () => {
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
          // fields: ["address_components", "geometry", "name"],
          fields: ["name"],
        }
      );

      // 'addListener' is used to add event listeners to Google Maps objects (e.g., 'autocomple').
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("Selected place:", place);
        // Handle the selected place here. Set state that is shared through the context.
      });
    }
  }, [isLoaded]);

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
      />
    </div>
  );
};

export default SearchBar;

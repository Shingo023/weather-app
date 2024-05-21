"use client";

import { useRef, useEffect } from "react";
// The 'useLoadScript' hook handles the loading of the Google Maps JavaScript API script in a React application.
import { useLoadScript } from "@react-google-maps/api";

// The "places" library is necessary for autocomplete for addresses and places.
const libraries: "places"[] = ["places"];

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      // Set up an autocomplete feature for an input element
      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["(cities)"],
          fields: ["address_components", "geometry", "name"],
        }
      );

      // 'addListener' is used to add event listeners to Google Maps objects like autocomplete instances.
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

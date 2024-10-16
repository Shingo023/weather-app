import { Dispatch, SetStateAction } from "react";
import { DefaultSession } from "next-auth";

export type DisplayedCityWeatherContextType = {
  displayedCityWeather: WeatherData | null;
  setDisplayedCityWeather: Dispatch<SetStateAction<WeatherData | null>>;
  cityToDisplay: string | null;
  setCityToDisplay: React.Dispatch<React.SetStateAction<string | null>>;
  address: string | null;
  setAddress: (state: string | null) => void;
  placeId: string | null;
  setPlaceId: (state: string | null) => void;
};

// The original types of the weather data
// export type WeatherData = {
//   queryCost: number;
//   latitude: number;
//   longitude: number;
//   resolvedAddress: string;
//   address: string;
//   timezone: string;
//   tzoffset: number;
//   description: string;
//   days: WeatherDay[];
//   currentConditions: { feelslike: number; icon: string; temp: number };
// };

// export type WeatherDay = {
//   datetime: string;
//   datetimeEpoch: number;
//   tempmax: number;
//   tempmin: number;
//   temp: number;
//   feelslikemax: number;
//   feelslikemin: number;
//   feelslike: number;
//   dew: number;
//   humidity: number;
//   precip: number | null;
//   precipprob: number;
//   precipcover: number;
//   preciptype: string[] | null;
//   snow: number | null;
//   snowdepth: number | null;
//   windgust: number;
//   windspeed: number;
//   winddir: number;
//   pressure: number;
//   description: string;
//   cloudcover: number;
//   visibility: number;
//   solarradiation: number;
//   solarenergy: number;
//   uvindex: number;
//   severerisk: number;
//   sunrise: string;
//   sunriseEpoch: number;
//   sunset: string;
//   sunsetEpoch: number;
//   moonphase: number;
//   conditions: string;
//   icon: string;
//   stations: string[] | null;
//   source: string;
//   hours: WeatherHour[];
// };

// type WeatherHour = {
//   datetime: string;
//   datetimeEpoch: number;
//   temp: number;
//   feelslike: number;
//   humidity: number;
//   dew: number;
//   precip: number | null;
//   precipprob: number;
//   snow: number | null;
//   snowdepth: number | null;
//   preciptype: string[] | null;
//   windgust: number;
//   windspeed: number;
//   winddir: number;
//   pressure: number;
//   visibility: number;
//   cloudcover: number;
//   solarradiation: number;
//   solarenergy: number;
//   uvindex: number;
//   severerisk: number;
//   conditions: string;
//   icon: string;
//   stations: string[] | null;
//   source: string;
// };

// Formatted types of the weather data so that unnecessary fields will not be fetched
export type WeatherData = {
  latitude: number;
  longitude: number;
  address: string;
  timezone: string;
  description: string;
  days: WeatherDay[];
  currentConditions: {
    datetime: string;
    feelslike: number;
    icon: string;
    temp: number;
  };
};

export type WeatherDay = {
  datetime: string;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslike: number;
  humidity: number;
  precip: number | null;
  precipprob: number;
  precipcover: number;
  snow: number | null;
  snowdepth: number | null;
  windgust: number;
  windspeed: number;
  winddir: number;
  description: string;
  uvindex: number;
  sunrise: string;
  sunset: string;
  conditions: string;
  icon: string;
  hours: WeatherHour[];
};

export type WeatherHour = {
  datetime: string;
  temp: number;
  feelslike: number;
  humidity: number;
  precip: number | null;
  precipprob: number;
  snow: number | null;
  snowdepth: number | null;
  windgust: number;
  windspeed: number;
  winddir: number;
  uvindex: number;
  conditions: string;
  icon: string;
};

// Weather types for the favorites list
export type WeatherDataForFavoritesList = {
  latitude: number;
  longitude: number;
  address: string;
  timezone: string;
  description: string;
  days: WeatherDay[];
  currentConditions: {
    datetime: string;
    feelslike: number;
    icon: string;
    temp: number;
  };
};

export type WeatherDayForFavoritesList = {
  hours: WeatherHour[];
};

export type WeatherHourForFavoritesList = {
  datetime: string;
  temp: number;
  feelslike: number;
  humidity: number;
  precip: number | null;
  precipprob: number;
  icon: string;
};
export type WeatherIconType =
  | "clear-day"
  | "clear-night"
  | "rain"
  | "snow"
  | "wind"
  | "fog"
  | "cloudy"
  | "partly-cloudy-day"
  | "partly-cloudy-night";

// Extend the User object returned by NextAuth to include an ID
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the id field to the session's user object
    } & DefaultSession["user"];
  }

  interface User {
    id: string; // Add the id field to the User object
  }
}

export type FavoriteCity = {
  id: number;
  cityName: string;
  placeId: string;
  address: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  createdAt: Date;
  customName: string;
};

export type FavoriteCityWithWeather = {
  id: number;
  customName: string;
  isDefault: boolean;
  favoriteCity: FavoriteCity;
  weather: WeatherData;
};

export type LocationDetails = {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
  place_id: string;
};

export type autocompleteSuggestion = {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
  };
};

export type FavoriteCityContainerPropsType = {
  favoriteCityId: number;
  userId: string | undefined;
  cityName: string;
  cityAddress: string;
  cityPlaceId: string;
  currentTemp: number;
  currentWeather: WeatherIconType;
  timeZone: string;
  homeLocationId: number | null;
  setHomeLocationId: (homeLocationId: number | null) => void;
  cityLat: number;
  cityLng: number;
};

export type FavoriteCityCardPropsType = {
  favoriteCityId: number;
  userId: string | undefined;
  cityName: string;
  cityAddress: string;
  cityPlaceId: string;
  currentTemp: number;
  currentWeather: WeatherIconType;
  timeZone: string;
  homeLocationId: number | null;
  setHomeLocationId: (homeLocationId: number | null) => void;
  cityLat: number;
  cityLng: number;
  placeNameToDisplay: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type EditPlaceNameModalPropsType = {
  cityName: string;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setPlaceNameToDisplay: (name: string) => void;
  favoriteCityId: number;
  cityAddress: string;
};

export type CurrentWeatherPropsType = {
  displayedCityWeather: WeatherData | null;
  setDisplayedCityWeather: (weatherData: WeatherData | null) => void;
  cityToDisplay: string | null;
  address: string | null;
  placeId: string | null;
  favoriteCitiesPlaceIds: string[];
  setFavoriteCitiesPlaceIds: React.Dispatch<React.SetStateAction<string[]>>;
  latitude: string;
  longitude: string;
};

export type CurrentDateAndTimePropsType = {
  placeTimeZone: string | undefined;
  setDisplayedCityWeather: (weatherData: WeatherData | null) => void;
  latitude: string;
  longitude: string;
};

export type StarIconPropsType = {
  displayedCityWeather: WeatherData | null;
  cityToDisplay: string | null;
  address: string | null;
  placeId: string | null;
  favoriteCitiesPlaceIds: string[];
  setFavoriteCitiesPlaceIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export type HomeLocationContextType = {
  homeLocationId: string | null;
  setHomeLocationId: React.Dispatch<React.SetStateAction<string | null>>;
};

export type UserFavoriteCity = {
  id: number;
  customName: string | null;
  isDefault: boolean;
  favoriteCity: FavoriteCity;
};

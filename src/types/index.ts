import { Dispatch, SetStateAction } from "react";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

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

export type currentCityContextType = {
  currentCity: WeatherData | null;
  updateCity: (newCity: WeatherData) => void;
};

export type WeatherData = {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  description: string;
  days: WeatherDay[];
  currentConditions: { feelslike: number; icon: string; temp: number };
};

export type WeatherDay = {
  datetime: string;
  datetimeEpoch: number;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax: number;
  feelslikemin: number;
  feelslike: number;
  dew: number;
  humidity: number;
  precip: number | null;
  precipprob: number;
  precipcover: number;
  preciptype: string[] | null;
  snow: number | null;
  snowdepth: number | null;
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  description: string;
  cloudcover: number;
  visibility: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  severerisk: number;
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  moonphase: number;
  conditions: string;
  icon: string;
  stations: string[] | null;
  source: string;
  hours: WeatherHour[];
};

type WeatherHour = {
  datetime: string;
  datetimeEpoch: number;
  temp: number;
  feelslike: number;
  humidity: number;
  dew: number;
  precip: number | null;
  precipprob: number;
  snow: number | null;
  snowdepth: number | null;
  preciptype: string[] | null;
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  visibility: number;
  cloudcover: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  severerisk: number;
  conditions: string;
  icon: string;
  stations: string[] | null;
  source: string;
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
  customName?: string;
};

export type FavoriteCityWithWeather = FavoriteCity & {
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

export type FavoriteCityCardPropsType = {
  cityName: string;
  cityAddress: string;
  currentTemp: number;
  currentWeather: WeatherIconType;
  currentDateTime: string;
  onClick: () => void;
};

export type CurrentWeatherPropsType = {
  displayedCityWeather: WeatherData | null;
  setDisplayedCityWeather: (weatherData: WeatherData | null) => void;
  cityToDisplay: string | null;
  address: string | null;
  placeId: string | null;
};

export type StarIconPropsType = {
  displayedCityWeather: WeatherData | null;
  cityToDisplay: string | null;
  address: string | null;
  placeId: string | null;
};

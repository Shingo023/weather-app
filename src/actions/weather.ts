"use server";

import { WeatherData } from "@/types";

let displayedCityWeather: WeatherData;

export const getCityWeatherInfo = async (cityName: string) => {
  const res: Response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=${process.env.WEATHER_API_KEY}`
  );
  const data: WeatherData = await res.json();
  displayedCityWeather = data;
  return data;
};

export const getDisplayedCityWeather = () => {
  return displayedCityWeather;
};

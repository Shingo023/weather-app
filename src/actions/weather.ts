"use server";

import { WeatherData } from "@/types";

let currentCity: WeatherData;

export const getCityWeatherInfo = async (cityName: string) => {
  const res: Response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=${process.env.WEATHER_API_KEY}`
  );
  const data: WeatherData = await res.json();
  currentCity = data;
  return data;
};

export const getCurrentCity = () => {
  return currentCity;
};

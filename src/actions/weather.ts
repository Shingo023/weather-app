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

export const getCityWeatherInfoByCoordinates = async (
  lat: number,
  lng: number
) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lng}?unitGroup=metric&key=${apiKey}&contentType=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather data.");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather info:", error);
    throw error;
  }
};

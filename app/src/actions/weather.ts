"use server"

import { WeatherData } from "@/types";

export const getWeatherINfo = async (cityName: string): Promise<WeatherData> => {
  const res: Response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=${process.env.API_KEY}`
  );
  const data: WeatherData = await res.json();
  return data;
};

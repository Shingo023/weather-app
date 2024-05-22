"use server"

import { WeatherData } from "@/types";

let currentCity: WeatherData 

export const getCityWeatherInfo = async () => {
  const res: Response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Vancouver?key=VF5PEJPAPKTNXHHF5YJYB34FR`
  );
  const data: WeatherData = await res.json();
  currentCity = data
  return data;
};

export const getCurrentCity = () => {
  return currentCity
}
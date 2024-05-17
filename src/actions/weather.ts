import { WeatherData } from "@/types";

export const getWeatherINfo = async (cityName: string) => {
  const res: Response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=VF5PEJPAPKTNXHHF5YJYB34FR`
  );
  const data: WeatherData = await res.json();
  return data;
};

"use client";

import { WeeklyComponent } from "@/features/weather/weeklyComponent/WeeklyComponent";
import SearchBar from "@/features/weather/searchBar/SearchBar";
import { DisplayedCityWeatherProvider } from "../../contexts/DisplayedCityWeatherContext";
import CurrentWeather from "@/features/weather/currentWeather/CurrentWeather";

export default function Home() {
  return (
    <DisplayedCityWeatherProvider>
      <SearchBar />
      <CurrentWeather />
      <WeeklyComponent />
    </DisplayedCityWeatherProvider>
  );
}

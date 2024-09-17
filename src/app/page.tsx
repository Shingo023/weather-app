"use client";
import { WeeklyComponent } from "@/components/WeeklyComponent";
import SearchBar from "@/components/SearchBar";
import { DisplayedCityWeatherProvider } from "../contexts/DisplayedCityWeatherContext";
import CurrentWeather from "@/components/CurrentWeather";

export default function Home() {
  return (
    <DisplayedCityWeatherProvider>
      <SearchBar />
      <CurrentWeather />
      <WeeklyComponent />
    </DisplayedCityWeatherProvider>
  );
}

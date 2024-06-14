"use client";
import { WeeklyComponent } from "@/components/WeeklyComponent";
import SearchBar from "@/components/SearchBar";
import { DisplayedCityWeatherProvider } from "../contexts/DisplayedCityWeatherContext";

export default function Home() {
  return (
    <DisplayedCityWeatherProvider>
      <SearchBar />
      <WeeklyComponent />
    </DisplayedCityWeatherProvider>
  );
}

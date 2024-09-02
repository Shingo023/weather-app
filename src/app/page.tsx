"use client";
import { WeeklyComponent } from "@/components/WeeklyComponent";
import SearchBar from "@/components/SearchBar";
import { DisplayedCityWeatherProvider } from "../contexts/DisplayedCityWeatherContext";
import { AirConditionComponent } from "@/components/AirConditionComponent";

export default function Home() {
  return (
    <DisplayedCityWeatherProvider>
      <SearchBar />
      <AirConditionComponent/>
      <WeeklyComponent />
    </DisplayedCityWeatherProvider>
  );
}

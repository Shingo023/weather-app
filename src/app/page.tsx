"use client";
import { WeeklyComponent } from "@/components/WeeklyComponent";
import SearchBar from "@/components/SearchBar";
import { CurrentCityProvider } from "../contexts/currentCity";

export default function Home() {
  return (
    <CurrentCityProvider>
      <SearchBar />
      <WeeklyComponent />
    </CurrentCityProvider>
  );
}

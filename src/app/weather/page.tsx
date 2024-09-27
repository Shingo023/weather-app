"use client";

import { WeeklyComponent } from "@/features/weather/weeklyComponent/WeeklyComponent";
import SearchBar from "@/features/weather/searchBar/SearchBar";
import CurrentWeather from "@/features/weather/currentWeather/CurrentWeather";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router]);

  return (
    <div>
      <SearchBar />
      <CurrentWeather />
      <WeeklyComponent />
    </div>
  );
}

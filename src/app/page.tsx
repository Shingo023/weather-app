"use client"
import { WeeklyComponent } from "@/components/WeeklyComponent";
import { CurrentCityProvider } from "../contexts/currentCity";

export default function Home() {
  return (
    <CurrentCityProvider>
      <h1>Hello world</h1>
      <WeeklyComponent />
    </CurrentCityProvider>
  );
}
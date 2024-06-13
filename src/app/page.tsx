"use client"
import { WeeklyComponent } from "@/components/WeeklyComponent";
import { CurrentCityProvider } from "../contexts/currentCity";
import { AirConditionComponent } from "@/components/AirConditionComponent";

export default function Home() {
  return (
    <CurrentCityProvider>
      <h1>Hello world</h1>
      <AirConditionComponent/>
      <WeeklyComponent />
    </CurrentCityProvider>
  );
}

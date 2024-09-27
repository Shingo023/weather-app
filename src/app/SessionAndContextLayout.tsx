"use client";

import { DisplayedCityWeatherProvider } from "@/contexts/DisplayedCityWeatherContext";
import { SessionProvider } from "next-auth/react";

export default function SessionAndContextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SessionProvider>
        <DisplayedCityWeatherProvider>{children}</DisplayedCityWeatherProvider>
      </SessionProvider>
    </div>
  );
}

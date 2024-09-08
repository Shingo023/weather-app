import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Weather application",
};

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Weather App</h1>
    </div>
  );
}

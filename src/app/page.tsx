import { getCityWeatherInfo } from "@/actions/weather";
import { WeeklyComponent } from "@/components/WeeklyComponent";

export default function Home() {
  getCityWeatherInfo()
  return (
    <>
      <h1>Hello world</h1>
      <WeeklyComponent />
    </>
  );
}

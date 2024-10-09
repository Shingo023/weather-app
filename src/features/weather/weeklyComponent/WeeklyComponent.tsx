import { WeatherData, WeatherDay, WeatherIconType } from "@/types";
import styles from "./WeeklyComponent.module.scss";
import { iconMapping } from "@/utils/weatherIconMapping";
import React from "react";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import { Droplet } from "lucide-react";

export const WeeklyComponent = ({
  displayedCityWeather,
}: {
  displayedCityWeather: WeatherData | null;
}) => {
  const weeklyWeather: WeatherDay[] | undefined =
    displayedCityWeather?.days.slice(0, 7);

  const isCurrentDate = (dateString: string): boolean => {
    // Create a Date object from the date string
    const givenDate = new Date(dateString);

    // Get the current date
    const currentDate = new Date();

    return (
      givenDate.getUTCFullYear() === currentDate.getUTCFullYear() &&
      givenDate.getUTCMonth() === currentDate.getUTCMonth() &&
      givenDate.getUTCDate() === currentDate.getUTCDate()
    );
  };

  const getWeekday = (dateString: string): string => {
    const date = new Date(dateString);

    // Array of weekday names
    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const dayIndex = date.getDay();

    if (isCurrentDate(dateString)) {
      return "Today";
    }

    return weekdays[dayIndex];
  };

  return (
    <div className={styles.WeeklyComponent}>
      <div className={styles.WeeklyComponent__content}>
        <h2>Weekly Forecast</h2>
        <ul className={styles.WeeklyComponentList}>
          {weeklyWeather ? (
            weeklyWeather.map((dailyWeather, index) => {
              const dailyWeatherIcon =
                iconMapping[dailyWeather.icon as WeatherIconType];

              return (
                <li className={styles.WeeklyComponentItem} key={index}>
                  <p className={styles.WeeklyComponentDay}>
                    {getWeekday(dailyWeather.datetime)}
                  </p>
                  <div>
                    <WeatherIcon
                      weatherIcon={dailyWeatherIcon}
                      width={60}
                      height={60}
                    />
                  </div>
                  <p>
                    {Math.round(dailyWeather.tempmax)}°/
                    {Math.round(dailyWeather.tempmin)}°
                  </p>
                  <div className={styles.humidity}>
                    <Droplet className={styles.humidity__icon} />
                    <p>{Math.round(dailyWeather.humidity)}%</p>
                  </div>
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
};

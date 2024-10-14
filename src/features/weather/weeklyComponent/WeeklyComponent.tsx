import { WeatherData, WeatherDay, WeatherIconType } from "@/types";
import styles from "./WeeklyComponent.module.scss";
import { iconMapping } from "@/utils/weatherIconMapping";
import React, { useEffect, useState } from "react";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import { Droplet, Umbrella } from "lucide-react";

export const WeeklyComponent = ({
  displayedCityWeather,
}: {
  displayedCityWeather: WeatherData | null;
}) => {
  const [loading, setLoading] = useState(true);

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
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const dayIndex = date.getDay();

    if (isCurrentDate(dateString)) {
      return "Today";
    }

    return weekdays[dayIndex];
  };

  useEffect(() => {
    if (weeklyWeather && weeklyWeather.length > 0) {
      setLoading(false);
    }
  }, [weeklyWeather]);

  // Render skeletons while loading
  if (loading) {
    const items = Array(7).fill(null); // Create an array with 7 undefined elements

    return (
      <div className={styles.skeleton}>
        <div className={styles.WeeklyComponent__content}>
          <h2 />
          <ul className={styles.WeeklyComponentList}>
            {items.map((_, index) => (
              <li key={index} className={styles.WeeklyComponentItem}>
                <div className={styles.WeeklyComponentItem__left}>
                  <p className={styles.skeleton__WeeklyComponentDay} />
                  <div
                    className={styles.skeleton__WeeklyComponentWeatherIcon}
                  />
                </div>
                <div className={styles.WeeklyComponentItem__right}>
                  <p className={styles.skeleton__temps} />
                  <div className={styles.skeleton__chanceOfRain} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

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
                  <div className={styles.WeeklyComponentItem__left}>
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
                  </div>

                  <div className={styles.WeeklyComponentItem__right}>
                    <p>
                      {Math.round(dailyWeather.tempmax)}°/
                      {Math.round(dailyWeather.tempmin)}°
                    </p>
                    <div className={styles.chanceOfRain}>
                      <Umbrella className={styles.chanceOfRain__icon} />
                      <p>{Math.round(dailyWeather.precipprob / 5) * 5}%</p>
                    </div>
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

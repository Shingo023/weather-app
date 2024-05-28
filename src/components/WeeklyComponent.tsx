import { useCurrentCity } from "@/contexts/currentCity";
import { WeatherDay } from "@/types";
import styles from "./WeeklyComponent.module.scss";

export const WeeklyComponent = () => {
  const { currentCity } = useCurrentCity();

  const weeklyWeather: WeatherDay[] | undefined = currentCity?.days.slice(0, 7)

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

    console.log(dateString);

    if (isCurrentDate(dateString)) {
      return "Today";
    }

    return weekdays[dayIndex];
  };

  return (
    <div className={styles.WeeklyComponent}>
      <h2>Weekly Forecast</h2>
      <ul className={styles.WeeklyComponentList}>
        {weeklyWeather ? (
          dailyWeather.map((day, index) => (
            <li className={styles.WeeklyComponentItem} key={index}>
              <p className={styles.WeeklyComponentDay}>{getWeekday(day.datetime)}</p>
              <p>icon</p>
              <p>
                {Math.ceil((day.tempmax - 30) / 2)}°/{Math.floor((day.tempmin - 30) / 2)}°
              </p>
              <p>{Math.ceil(day.humidity)}%</p>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

import { useCurrentCity } from "@/contexts/currentCity";
import "@/style/components/WeeklyComponent.scss"

export const WeeklyComponent = () => {
  const { currentCity } = useCurrentCity();

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
    <div className="WeeklyComponent">
      <h2>Weekly Forecast</h2>
      <ul className="WeeklyComponentList">
        {currentCity ? (
          currentCity.days.map((day, index) => (
            <li className="WeeklyComponentItem" key={index}>
              <p className="WeeklyComponentDay">{getWeekday(day.datetime)}</p>
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

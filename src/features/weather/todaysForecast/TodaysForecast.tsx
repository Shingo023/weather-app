import DailyWeatherCard from "./dailyWeatherCard/DailyWeatherCard";
import styles from "./TodaysForecast.module.scss";

const TodaysForecast = () => {
  return (
    <div className={styles.todaysForecast}>
      <div className={styles.todaysForecast__container}>
        <h2>Daily Forecast</h2>
        <DailyWeatherCard />
      </div>
    </div>
  );
};

export default TodaysForecast;

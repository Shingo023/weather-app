import styles from "./TodaysForecast.module.scss";

const TodaysForecast = () => {
  return (
    <div className={styles.todaysForecast}>
      <div className={styles.todaysForecast__container}>
        <h2>Today's Forecast</h2>
      </div>
    </div>
  );
};

export default TodaysForecast;

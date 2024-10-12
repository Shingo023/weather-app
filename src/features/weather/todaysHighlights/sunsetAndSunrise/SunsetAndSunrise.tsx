import styles from "./SunsetAndSunrise.module.scss";

const SunsetAndSunrise = ({
  sunrise,
  sunset,
}: {
  sunrise: string;
  sunset: string;
}) => {
  return (
    <div className={styles.sunsetAndSunrise}>
      <h3>Sunrise & Sunset</h3>
    </div>
  );
};

export default SunsetAndSunrise;

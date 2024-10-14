import styles from "./SunsetAndSunrise.module.scss";
import Image from "next/image";
import sunriseSVG from "../../../../public/bi_sunrise.svg";
import sunsetSVG from "../../../../public/Vector.svg";
import sun from "../../../../public/heroicons_sun-solid.svg";

const SunsetAndSunrise = ({
  sunrise,
  sunset,
  sunCurrentLocation,
}: {
  sunrise: string;
  sunset: string;
  sunCurrentLocation: number;
}) => {
  const sunPathPercentage = {
    transform: `rotate(${sunCurrentLocation}deg`,
  };

  const sunIconPathPercentage = {
    transform: `rotate(${sunCurrentLocation + 5}deg`,
  };

  return (
    <div className={styles.sunsetAndSunrise}>
      <p className={styles.SunsetAndSunriseTitle}>Sunrise & Sunset</p>
      <div className={styles.sunsetAndSunriseContainer}>
        <div className={styles.circles}>
          <div className={styles.gaugeSun}>
            <div className={styles.gaugeBodySun}>
              <div
                className={styles.gaugeFillSun}
                style={sunPathPercentage}
              ></div>
              <div
                className={styles.gaugeCoverSun}
                style={sunIconPathPercentage}
              >
                <Image className={styles.sunIcon} src={sun} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.hoursContainer}>
            <p className={styles.dayTime}>
              <Image src={sunriseSVG} alt="" />
              <span>sunrise</span>
              {sunrise}
            </p>
            <p className={styles.dayTime}>
              <Image src={sunsetSVG} alt="" />
              <span>sunset</span>
              {sunset}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunsetAndSunrise;

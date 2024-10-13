import styles from "./AirConditionComponent.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import sunriseSVG from "../../../public/bi_sunrise.svg";
import sunsetSVG from "../../../public/Vector.svg";
import sun from "../../../public/heroicons_sun-solid.svg";
import { WeatherData } from "@/types";

type AirConditionComponentProps = {
  displayedCityWeather: WeatherData | null;
};

export const AirConditionComponent = ({
  displayedCityWeather,
}: AirConditionComponentProps) => {
  const [totalUV, setTotalUV] = useState<number>(0);
  const [sunPath, setSunPath] = useState<[string, string, number]>([
    "00:00",
    "00:00",
    0,
  ]);

  function getHourFromTimeString(timeString: string): number {
    const [hours] = timeString.split(":");
    return parseInt(hours);
  }

  useEffect(() => {
    if (displayedCityWeather) {
      setTotalUV((180 * displayedCityWeather.days[0].uvindex * 10) / 100);

      const sunrise: number = getHourFromTimeString(
        displayedCityWeather.days[0].sunrise
      );
      const sunset: number = getHourFromTimeString(
        displayedCityWeather.days[0].sunset
      );

      const now: Date = new Date();
      const totalHours: number = sunset - sunrise;
      const currentHour: number = now.getHours() - sunrise;
      const currentSunLocation: number = (currentHour * 100) / totalHours;

      const currentSunLocationPercentage: number = currentSunLocation
        
      setSunPath([
        displayedCityWeather.days[0].sunrise.slice(0, 5),
        displayedCityWeather.days[0].sunset.slice(0, 5),
        currentSunLocationPercentage,
      ]);
    }
  }, [displayedCityWeather]);

  const getUvMessage = (uvPercentage: number): string => {
    let message = "";

    switch (true) {
      case uvPercentage <= 25:
        message = "Low: Minimal risk of harm";
        break;
      case uvPercentage <= 50:
        message = "";
        break;
      case uvPercentage <= 75:
        message = "";
        break;
      case uvPercentage <= 100:
        message = "";
        break;
      default:
        message = "Error, please try again later";
        break;
    }

    return message;
  };

  const UVpercentage = {
    transform: `rotate(${(totalUV * 100) / 10 / 180}deg`,
  };

  const sunPathPercentage = {
    transform: `rotate(${sunPath[2]}deg`,
  };

  const sunIconPathPercentage = {
    transform: `rotate(${sunPath[2] + 5}deg`,
  };

  return (
    <div className={styles.AirConditionComponent}>
      <h1>Air Condition</h1>
      <div className={styles.AirConditionContainer}>
        <>
          <div className={styles.AirConditionContainerChildren}>WindStatus</div>
          <div className={styles.AirConditionContainerChildren}>
            UV index
            <div className={styles.circles}>
              <div className={styles.gauge}>
                <div className={styles.gaugeBody}>
                  <div className={styles.gaugeFill} style={UVpercentage}></div>
                  <div className={styles.gaugeCover}>
                    <p>{((totalUV * 100) / 10 / 180).toFixed(1)} %</p>
                  </div>
                </div>
              </div>
              <p className={styles.uvMessage}>{getUvMessage((totalUV * 100) / 10 / 180)}</p>
            </div>
          </div>
          <div className={styles.AirConditionContainerChildren}>
            <p>Sunrise & Sunset</p>
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
                  {sunPath[0]}
                </p>
                <p className={styles.dayTime}>
                  <Image src={sunsetSVG} alt="" />
                  <span>sunset</span>
                  {sunPath[1]}
                </p>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

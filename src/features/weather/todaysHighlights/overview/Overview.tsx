import { CloudRain, Droplet, Snowflake, Wind } from "lucide-react";
import styles from "./Overview.module.scss";
import React from "react";
import {
  getRainfallIntensity,
  getWindStrength,
} from "../../../../utils/weatherUtils";

type TodaysWeatherOverviewType = {
  humidity: number;
  windSpeed: number;
  rainfall: number;
  snowfall: number | null;
  snowDepth: number | null;
};

const Overview = ({
  humidity,
  windSpeed,
  rainfall,
  snowfall,
  snowDepth,
}: TodaysWeatherOverviewType) => {
  return (
    <div className={styles.overview}>
      <div className={styles.overview__top}>
        <div className={styles.overview__humidity}>
          <h5>Humidity</h5>

          <div>
            <Droplet className={styles.overview__icon} />
            <p>
              <span className={styles.overview__numberData}>{humidity}</span>%
            </p>
          </div>
        </div>

        <div className={styles.overview__wind}>
          <h5>Wind</h5>
          <div>
            <Wind className={styles.overview__icon} />
            <p>
              <span className={styles.overview__numberData}>{windSpeed}</span>
              k/h
            </p>
          </div>

          {windSpeed && (
            <p className={styles.overview__weatherIndex}>
              {getWindStrength(windSpeed)}
            </p>
          )}
        </div>
      </div>

      <div className={styles.overview__bottom}>
        <div className={styles.overview__snowfall}>
          <h5>Precip</h5>
          <div>
            <Snowflake className={styles.overview__icon} />
            <p>
              <span className={styles.overview__numberData}>{snowfall}</span>
              mm/d
            </p>
          </div>

          {snowfall !== 0 && (
            <p className={styles.overview__weatherIndex}>
              {getRainfallIntensity(snowfall)}
            </p>
          )}
          <p>
            <span className={styles.overview__snowDepth}>{snowDepth}</span> cm
          </p>
        </div>

        {/* 
        {snowfall || snowDepth ? (
          <div className={styles.overview__snowfall}>
            <div>
              <Snowflake className={styles.overview__icon} />
              <h5>Snowfall</h5>
            </div>
            <p>
              <span className={styles.overview__numberData}>{snowfall}</span>
              mm/d
            </p>
            {snowfall !== 0 && (
              <p className={styles.overview__weatherIndex}>
                {getRainfallIntensity(snowfall)}
              </p>
            )}
            <p>
              <span className={styles.overview__snowDepth}>{snowDepth}</span> cm
            </p>
          </div>
        ) : null}

        {rainfall ? (
          <div className={styles.overview__rainfall}>
            <div>
              <CloudRain className={styles.overview__icon} />
              <h5>Rainfall</h5>
            </div>

            <p>
              <span className={styles.overview__numberData}>{rainfall}</span>
              mm/d
            </p>
            <p className={styles.overview__weatherIndex}>
              {getRainfallIntensity(rainfall)}
            </p>
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

export default Overview;

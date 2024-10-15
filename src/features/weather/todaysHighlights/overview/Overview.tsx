import {
  ArrowUpToLine,
  CloudRain,
  CloudSnow,
  Droplet,
  Wind,
} from "lucide-react";
import styles from "./Overview.module.scss";
import {
  getRainfallIntensity,
  getWindStrength,
} from "../../../../utils/weatherUtils";

type TodaysWeatherOverviewType = {
  humidity: number;
  windSpeed: number;
  rainfall: number;
  snowfall: number;
  snowDepth: number;
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
      <div className={styles.overview__container}>
        {(snowfall > 0 || snowDepth > 0) && (
          <div className={styles.overview__snowfall}>
            <h5>Snowfall</h5>
            <div>
              <CloudSnow className={styles.overview__icon} />
              <p>
                <span className={styles.overview__numberData}>{snowfall}</span>
                mm/d
              </p>
            </div>

            {snowfall > 0 && (
              <p className={styles.overview__weatherIndex}>
                {getRainfallIntensity(snowfall)}
              </p>
            )}
          </div>
        )}

        {(snowfall > 0 || snowDepth > 0) && (
          <div className={styles.overview__snowDepth}>
            <h5>Snow Depth</h5>
            <div>
              <ArrowUpToLine className={styles.overview__icon} />
              <p>
                <span className={styles.overview__numberData}>{snowDepth}</span>
                cm
              </p>
            </div>
          </div>
        )}

        {rainfall > 0 && (
          <div className={styles.overview__rainfall}>
            <h5>Rainfall</h5>

            <div>
              <CloudRain className={styles.overview__icon} />
              <p>
                <span className={styles.overview__numberData}>{rainfall}</span>
                mm/d
              </p>
            </div>

            <p className={styles.overview__weatherIndex}>
              {getRainfallIntensity(rainfall)}
            </p>
          </div>
        )}

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
    </div>
  );
};

export default Overview;

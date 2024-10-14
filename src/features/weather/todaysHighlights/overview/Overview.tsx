import { CloudRain, CloudSnow, Droplet, Wind } from "lucide-react";
import styles from "./Overview.module.scss";

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
          <div>
            <Droplet className={styles.overview__icon} />
            <h5>Humidity</h5>
          </div>
          <p>
            <span className={styles.overview__numberData}>{humidity}</span>%
          </p>
        </div>
        <div className={styles.overview__wind}>
          <div>
            <Wind className={styles.overview__icon} />
            <h5>Wind</h5>
          </div>
          <p>
            <span className={styles.overview__numberData}>{windSpeed}</span>k/h
          </p>
        </div>
      </div>
      <div className={styles.overview__bottom}>
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
          </div>
        ) : null}
        {snowfall ? (
          <div className={styles.overview__snowfall}>
            <div>
              <CloudSnow className={styles.overview__icon} />
              <h5>Snowfall</h5>
            </div>
            <p>
              <span className={styles.overview__numberData}>{snowfall}</span>
              mm/d
            </p>
            <p>
              <span className={styles.overview__snowDepth}>{snowDepth}</span> cm
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Overview;

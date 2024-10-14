import styles from "./UVIndex.module.scss";

const UVIndex = ({ uvIndex }: { uvIndex: number }) => {
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
    transform: `rotate(${(uvIndex * 100) / 10 / 180}deg`,
  };

  return (
    <div className={styles.uvIndex}>
      UV index
      <div className={styles.circles}>
        <div className={styles.gauge}>
          <div className={styles.gaugeBody}>
            <div className={styles.gaugeFill} style={UVpercentage}></div>
            <div className={styles.gaugeCover}>
              <p>{((uvIndex * 100) / 10 / 180).toFixed(1)} %</p>
            </div>
          </div>
        </div>
        <p className={styles.uvMessage}>
          {getUvMessage((uvIndex * 100) / 10 / 180)}
        </p>
      </div>
    </div>
  );
};

export default UVIndex;

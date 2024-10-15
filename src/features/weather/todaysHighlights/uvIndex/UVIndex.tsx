import styles from "./UVIndex.module.scss";

const UVIndex = ({ uvIndex }: { uvIndex: number }) => {
  const getUvMessage = (uvPercentage: number): string => {
    let message = "";

    switch (true) {
      case uvPercentage <= 2:
        message = "Low";
        break;
      case uvPercentage <= 5:
        message = "Moderate";
        break;
      case uvPercentage <= 7:
        message = "High";
        break;
      case uvPercentage <= 10:
        message = "Very high";
        break;
      case uvPercentage >= 11:
        message = "Extreme";
        break;
      default:
        message = "Error, please try again later";
        break;
    }

    return message;
  };

  const UVpercentage = {
    transform: `rotate(${(16.36 * (uvIndex * 100)) / 10 / 180}deg`,
  };

  return (
    <div className={styles.uvIndex}>
      UV index
      <div className={styles.circles}>
        <div className={styles.gauge}>
          <div className={styles.gaugeBody}>
            <div className={styles.gaugeFill} style={UVpercentage}></div>
            <div className={styles.gaugeCover}>
              <p>{(uvIndex * 100) / 10 / 180} uv</p>
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

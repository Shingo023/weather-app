import styles from "./UVIndex.module.scss";

const UVIndex = ({ uvIndex }: { uvIndex: number }) => {
  return (
    <div className={styles.uvIndex}>
      <h3>UV Index</h3>
    </div>
  );
};

export default UVIndex;

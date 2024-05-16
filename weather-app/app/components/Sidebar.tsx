import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Link className={styles.link} href={"/"}>
        <Image
          className={styles.img}
          src={"/weather-icon.svg"}
          alt="weather-icon"
          width={50}
          height={50}
        />
        <span className={styles.name}>Weather</span>
      </Link>
      <Link className={styles.link} href={"/favorite-list"}>
        <Image
          className={styles.img}
          src={"/favorite-list-icon.svg"}
          alt="favorite-list-icon"
          width={50}
          height={50}
        />
        <span className={styles.name}>Favorite List</span>
      </Link>
    </div>
  );
};

export default Sidebar;

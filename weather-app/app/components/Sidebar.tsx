import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Link className={styles.link} href={"/"}>
        <Image
          src={"/weather-icon.svg"}
          alt="weather-icon"
          width={50}
          height={50}
        />
        Weather
      </Link>
      <Link className={styles.link} href={"/favorite-list"}>
        <Image
          src={"/favorite-list-icon.svg"}
          alt="favorite-list-icon"
          width={50}
          height={50}
        />
        Favorite List
      </Link>
    </div>
  );
};

export default Sidebar;

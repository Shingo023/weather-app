"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const [isWeatherActive, setIsWeatherActive] = useState<boolean>(true);
  const [isFavoriteListActive, setIsFavoriteListActive] =
    useState<boolean>(false);

  const weatherIconHandler = () => {
    if (!isWeatherActive) {
      setIsWeatherActive(true);
      setIsFavoriteListActive(false);
    }
  };

  const favoriteListIconHandler = () => {
    if (!isFavoriteListActive) {
      setIsWeatherActive(false);
      setIsFavoriteListActive(true);
    }
  };

  return (
    <div className={styles.sidebar}>
      <Link className={styles.link} href={"/"} onClick={weatherIconHandler}>
        <Image
          className={styles.img}
          src={isWeatherActive ? "/weather-icon.svg" : "/weather-icon-pale.svg"}
          alt="weather-icon"
          width={50}
          height={50}
        />
        <span className={isWeatherActive ? styles.name : styles.namePale}>
          Weather
        </span>
      </Link>
      <Link
        className={styles.link}
        href={"/favorite-list"}
        onClick={favoriteListIconHandler}
      >
        <Image
          className={styles.img}
          src={
            isFavoriteListActive
              ? "/favorite-list-icon.svg"
              : "/favorite-list-icon-pale.svg"
          }
          alt="favorite-list-icon"
          width={50}
          height={50}
        />
        <span className={isFavoriteListActive ? styles.name : styles.namePale}>
          Favorite List
        </span>
      </Link>
    </div>
  );
};

export default Sidebar;

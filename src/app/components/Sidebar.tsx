"use client";

import styles from "./Sidebar.module.scss";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <SidebarLink
        linkName={"Weather"}
        path={"/"}
        icon={"/weather-icon.svg"}
        iconPale={"/weather-icon-pale.svg"}
        alt={"weather-icon"}
      />
      <SidebarLink
        linkName={"Favorite List"}
        path={"/favorite-list"}
        icon={"/favorite-list-icon.svg"}
        iconPale={"/favorite-list-icon-pale.svg"}
        alt={"favorite-list-icon"}
      />
    </div>
  );
};

export default Sidebar;

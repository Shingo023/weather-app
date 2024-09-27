"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Sidebar.module.scss";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const { data: session, status } = useSession();

  return (
    <div className={styles.sidebar}>
      {status === "authenticated" ? (
        <>
          <p>Hi, {session.user?.name}</p>
          <SidebarLink
            linkName={"Weather"}
            path={"/weather"}
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
          <div onClick={() => signOut()} style={{ cursor: "pointer" }}>
            Log Out
          </div>
        </>
      ) : (
        <>
          <SidebarLink
            linkName={"Weather"}
            path={"/weather"}
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
          <div onClick={() => signIn()} style={{ cursor: "pointer" }}>
            Log In
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Sidebar.module.scss";
import SidebarLink from "./SidebarLink";
import { memo } from "react";
import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
  const { data: session, status } = useSession();

  // Render nothing while the session status is "loading"
  if (status === "loading") {
    return null;
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/weather" });
  };

  return (
    <div className={styles.sidebar}>
      {status === "authenticated" ? (
        <>
          <div className={styles.sidebar__user}>
            <UserCircleIcon className={styles.sidebar__userIcon} />
            <p>{session.user?.name}</p>
          </div>

          <div className={styles.sidebar__links}>
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
          </div>

          <div onClick={handleSignOut} style={{ cursor: "pointer" }}>
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

export default memo(Sidebar);

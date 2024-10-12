"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Sidebar.module.scss";
import SidebarLink from "./SidebarLink";
import { memo } from "react";
import React from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  const { data: session, status } = useSession();

  // Render nothing while the session status is "loading"
  if (status === "loading") {
    return (
      <div className={styles.skeleton}>
        <>
          <div className={styles.sidebar__links}>
            <div className={styles.skeleton__link} />
            <div className={styles.skeleton__link} />
          </div>

          <div className={styles.sidebar__bottom}>
            <div className={styles.skeleton__log} />
          </div>
        </>
      </div>
    );
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/weather" });
  };

  return (
    <div className={styles.sidebar}>
      {status === "authenticated" ? (
        <>
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

          <div className={styles.sidebar__bottom}>
            <div className={styles.sidebar__user}>
              <UserCircleIcon className={styles.sidebar__userIcon} />
              <p>{session.user?.name}</p>
            </div>

            <div className={styles.sidebar__log} onClick={handleSignOut}>
              <ArrowLeftStartOnRectangleIcon
                className={styles.sidebar__logIcon}
              />
              <p>Log Out</p>
            </div>
          </div>
        </>
      ) : (
        <>
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

          <div className={styles.sidebar__log} onClick={() => signIn()}>
            <ArrowRightStartOnRectangleIcon
              className={styles.sidebar__logIcon}
            />
            <p>Log In</p>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Sidebar);

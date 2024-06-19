import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./SidebarLink.module.scss";
import { usePathname } from "next/navigation";

type SidebarLinkProps = {
  linkName: string;
  path: string;
  icon: string;
  iconPale: string;
  alt: string;
};

const SidebarLink = ({
  linkName,
  path,
  icon,
  iconPale,
  alt,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  return (
    <Link className={styles.link} href={path}>
      <Image
        src={pathname === path ? icon : iconPale}
        alt={alt}
        width={50}
        height={50}
      />
      <span className={pathname === path ? styles.name : styles.namePale}>
        {linkName}
      </span>
    </Link>
  );
};

export default SidebarLink;

"use client";

import React from "react";
import useDrawer from "@/hooks/useDrawer";
import styles from "./drawer-container.module.css";

export default function DrawerContainer() {
  const {
    showDrawer,
    onCloseDrawer,
    DrawerComponent,
    drawerTitle,
    dimmer,
    position,
    width,
  } = useDrawer();

  const handleOverlayClick = (event: any) => {
    if (event.target === event.currentTarget) {
      onCloseDrawer();
    }
  };

  const drawerContainerClasses = [
    styles.drawerContainer,
    styles[position],
    !showDrawer && styles.closing,
  ]
    .filter(Boolean)
    .join(" ");

  const overlayClasses = [styles.drawerOverlay, showDrawer && styles.show]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={overlayClasses} onClick={handleOverlayClick}>
      <div
        className={drawerContainerClasses}
        style={{
          width: width,
          boxShadow: "0px 0px 20px rgba(34, 36, 38, 0.15)",
        }}
      >
        {DrawerComponent && <DrawerComponent />}
      </div>
    </div>
  );
}

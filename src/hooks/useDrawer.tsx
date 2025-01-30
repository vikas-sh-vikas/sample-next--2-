/**
 * useDrawer.tsx
 * This hook is used to manage drawer functionality to toggle and render the drawer component
 */
"use client";
import React from "react";
import { useSelector } from "react-redux";

// Importing selectors and actions from the drawer slice
import {
  DrawerOpen,
  closeDrawer,
  selectDrawer,
  selectDrawerComponent,
  selectDrawerDimmer,
  selectDrawerName,
  selectDrawerPostion,
  selectDrawerWidth,
  showDrawer,
} from "@/state/drawer/slice";

// Importing custom hook for accessing the dispatch function
import { useAppDispatch } from "@/state/hook";

// Type definition for the props that can be passed to the drawer
export type DrawerProps = {
  name?: string;
  width?: string;
  dimmer?: boolean;
  position?: DrawerOpen;
  showCloseButton?: boolean;
  Component?: React.FunctionComponent<any>;
  className?: string;
};

// Main hook function
export default function useDrawer() {
  // Accessing the dispatch function
  const dispatch = useAppDispatch();

  // Selecting state values from the drawer slice
  const show = useSelector(selectDrawer);
  const dimmer = useSelector(selectDrawerDimmer);
  const name = useSelector(selectDrawerName);
  const Component = useSelector(selectDrawerComponent);
  const position = useSelector(selectDrawerPostion);
  const width = useSelector(selectDrawerWidth);

  // Function to show the drawer with specified properties
  const onShowDrawer = (props: DrawerProps) => {
    dispatch(showDrawer(props));
  };

  // Function to close the drawer
  const onCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  // Return an object with properties and functions related to the drawer
  return {
    width,
    dimmer,
    position,
    onShowDrawer,
    onCloseDrawer,
    showDrawer: show,
    drawerTitle: name,
    DrawerComponent: Component,
    classNames: (className: string) => className, // Use simple className handling
  };
}

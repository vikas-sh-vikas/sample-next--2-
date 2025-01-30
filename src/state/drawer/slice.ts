// Import necessary dependencies
"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Enum for defining drawer positions
export enum DrawerOpen {
  left = "left",
  right = "right",
}

// Define the shape of the drawer state
interface DrawerState {
  name: string;
  show: boolean;
  width: string;
  dimmer: boolean;
  position: DrawerOpen;
  Component: React.FunctionComponent<any> | null;
}

// Define the initial state for the drawer slice
const initialState: DrawerState = {
  width: "50%",
  show: false,
  dimmer: true,
  name: "Drawer",
  Component: null,
  position: DrawerOpen.right,
};

// Create a Redux slice for the drawer
export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    // Reducer for showing the drawer with specified properties
    showDrawer: (state, action) => {
      state.show = true;
      state.name = action.payload.name;
      state.width = action.payload.width;
      state.dimmer = action.payload.dimmer;
      state.position = action.payload.position;
      state.Component = action.payload.Component;
    },
    // Reducer for closing the drawer
    closeDrawer: (state) => {
      state.name = "";
      state.dimmer = true;
      state.show = false;
    },
  },
});

// Export action creators and selectors
export const { showDrawer, closeDrawer } = drawerSlice.actions;
export const selectDrawer = (state: RootState) => state.drawer.show;
export const selectDrawerName = (state: RootState) => state.drawer.name;
export const selectDrawerPostion = (state: RootState) => state.drawer.position;
export const selectDrawerDimmer = (state: RootState) => state.drawer.dimmer;
export const selectDrawerWidth = (state: RootState) => state.drawer.width;
export const selectDrawerComponent = (state: RootState) =>
  state.drawer.Component;

// Export the drawer reducer for use in the Redux store
const drawerReducer = drawerSlice.reducer;
export default drawerReducer;

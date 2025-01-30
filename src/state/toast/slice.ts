// Import necessary dependencies
"use client"

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface ToastState {
  show: boolean;
  position: ToastOpen;
  type: ToastType;
  content: string;
  title: string;
}

// Enum for defining toast positions
export enum ToastOpen {
  leftTop = "leftTop",
  rightTop = "rightTop",
  leftBottom = "leftBottom",
  rightBottom = "rightBottom",
}

// Enum for defining toast types
export enum ToastType {
  info = "info",
  error = "error",
  success = "success",
}

// Define the initial state using that type
const initialState: ToastState = {
  title: "",
  content: "",
  show: false,
  type: ToastType.info,
  position: ToastOpen.leftBottom,
};

// Create a Redux slice for the toast
export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    // Reducer for showing the toast with specified properties
    showToast: (state, action) => {
      state.show = true;
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.position = action.payload.position;
    },
    // Reducer for closing the toast
    closeToast: (state) => {
      state.title = "";
      state.content = "";
      state.show = false;
      state.type = ToastType.info;
      state.position = ToastOpen.leftBottom;
    },
  },
});

// Export action creators and selectors
export const { showToast, closeToast } = toastSlice.actions;
export const selectToast = (state: RootState) => state.toast.show;
export const selectToastPosition = (state: RootState) => state.toast.position;
export const selectToastTitle = (state: RootState) => state.toast.title;
export const selectToastContent = (state: RootState) => state.toast.content;
export const selectToastType = (state: RootState) => state.toast.type;

// Export the toast reducer for use in the Redux store
const toastReducer = toastSlice.reducer;
export default toastReducer;

/**
 * useToast.tsx
 * This hook is used to manage toast functionality throughout the project.
 */
"use client";

import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

// Importing the custom hook for accessing the dispatch function
import { useAppDispatch } from "@/state/hook";

// Importing actions and selectors from the toast slice
import {
  selectToast,
  showToast,
  closeToast,
  ToastOpen,
  selectToastPosition,
  selectToastType,
  selectToastTitle,
  selectToastContent,
} from "@/state/toast/slice";

// Type definition for the properties that can be passed to the toast
export type ToastProps = {
  type?: string;
  title?: ReactNode;
  content?: string;
  position?: ToastOpen;
  showCloseButton?: boolean;
};

// Main hook function
export default function useToast() {
  // Accessing the dispatch function
  const dispatch = useAppDispatch();

  // Selecting state values from the toast slice
  const show = useSelector(selectToast);
  const position = useSelector(selectToastPosition);
  const title = useSelector(selectToastTitle);
  const content = useSelector(selectToastContent);
  const type = useSelector(selectToastType);

  // Function to show the toast with specified properties
  const onShowToast = (props: ToastProps) => {
    dispatch(showToast(props));
  };

  // Function to close the toast
  const onCloseToast = () => {
    dispatch(closeToast());
  };

  // Return an object with properties and functions related to the toast
  return {
    type,
    title,
    content,
    position,
    closeToast,
    onShowToast,
    onCloseToast,
    showToast: show,
  };
}

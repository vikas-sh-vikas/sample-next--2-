/**
 * useModal.tsx
 * This hook is used to manage modal functionality throughout the project.
 */
"use client";

import React from "react";
import { useSelector } from "react-redux";

// Importing the custom hook for accessing the dispatch function
import { useAppDispatch } from "@/state/hook";

// Importing actions and selectors from the modal slice
import {
  showModal,
  ModalSize,
  closeModal,
  selectModal,
  selectModalSize,
  selectModalTitle,
  selectModalComponent,
  selectModalonSave,
  selectModalContent,
  selectModalshowButton,
  selectModalShowTitle,
  selectremarkOpen,
  selectPreview,
} from "@/state/modal/slice";

// Type definition for the properties that can be passed to the modal
export type ModalProps = {
  showTitle?: boolean;
  showButton?: boolean;
  content?: string | Array<any> | React.ReactNode | undefined;
  title?: string;
  size?: ModalSize;
  showCloseButton?: boolean;
  Component?: React.FunctionComponent<any>;
  onSave?: Function;
  onCancel?: () => {};
  remarkOpen?: boolean
  preview?: boolean
};

// Main hook function
export default function useModal() {
  // Accessing the dispatch function
  const dispatch = useAppDispatch();

  // Selecting state values from the modal slice
  const show = useSelector(selectModal);
  const title = useSelector(selectModalTitle);
  const showTitle = useSelector(selectModalShowTitle);
  const showButton = useSelector(selectModalshowButton);
  const content = useSelector(selectModalContent);
  const Component = useSelector(selectModalComponent);
  const size = useSelector(selectModalSize);
  const onSave = useSelector(selectModalonSave);
  const remarkOpen = useSelector(selectremarkOpen);
  const preview = useSelector(selectPreview);
  // Function to show the modal with specified properties
  const onShowModal = (props: ModalProps) => {
    dispatch(showModal(props));
  };

  // Function to close the modal
  const onCloseModal = () => {
    dispatch(closeModal());
  };

  // Return an object with properties and functions related to the modal
  return {
    size,
    title,
    onSave,
    content,
    showTitle,
    showButton,
    onShowModal,
    onCloseModal,
    showModal: show,
    remarkOpen,
    preview,
    ModalComponent: Component,
  };
}

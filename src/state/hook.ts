"use client";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Create a custom hook to use the Redux dispatch function in components
export const useAppDispatch: () => AppDispatch = useDispatch;

// Create a custom hook to use the Redux useSelector function with strongly typed RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

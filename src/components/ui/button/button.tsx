"use client";

import React, { ReactNode, MouseEventHandler } from "react";

type VariantTypes = "red" | "green" | "grey" | "white" | "default" | "blue";
type ButtonTypes = "submit" | "button" | "reset";
type Sizes = "smaller" | "small" | "basic" | "medium" | "large";

type ButtonProps = {
  disabled?: boolean;
  borderRadius?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  variant?: VariantTypes;
  buttonClassNames?: string;
  type?: ButtonTypes;
  size?: Sizes;
  className?: string;
  style?: any;
};

export const Button = ({
  children = "Button",
  disabled,
  variant = "default",
  buttonClassNames,
  type = "button",
  size = "basic",
  borderRadius,
  className,
  ...buttonProps
}: ButtonProps) => {
  const variantClass = {
    red: "bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg",
    green:
      "bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg",
    grey: "bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg",
    blue: "bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg",
    white: "bg-white text-black",
    default: "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
  };

  const sizeClass = {
    smaller: "py-2 px-4",
    small: "text-sm py-[8px] px-[10px]",
    basic: "text-sm py-[10px] px-[12px]",
    medium: "py-4 px-4",
    large: "py-5 px-4",
  };

  const classNames = [
    "border-none cursor-pointer rounded-md transition-opacity",
    variantClass[variant],
    sizeClass[size],
    disabled && "opacity-50 cursor-not-allowed",
    borderRadius && `rounded-${borderRadius}`,
    className,
    buttonClassNames,
  ]
    .filter(Boolean) // Remove any undefined or false values
    .join(" "); // Join the class strings with a space

  return (
    <button
      type={type}
      disabled={disabled}
      {...buttonProps}
      className={classNames}
      onClick={buttonProps.onClick}
    >
      {children}
    </button>
  );
};

import React, { ReactNode } from "react";

type Size = "small" | "basic" | "medium" | "large";

type PageHeaderProps = {
  title?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  itemsClassName?: string;
  titleClassName?: string;
  size?: Size;
  searchButton?: any;
};

export const PageHeader = (props: PageHeaderProps) => {
  let {
    children,
    className,
    itemsClassName,
    titleClassName,
    icon,
    title,
    size,
    searchButton,
    ...pageHeaderProps
  } = props;

  title = title ?? "PageTitle";
  size = size ?? "small";

  const sizeClass = {
    small: "text-sm",
    basic: "text-base",
    medium: "text-md",
    large: "text-lg",
  }[size];

  return (
    <div
      {...pageHeaderProps}
      className={`flex justify-between items-center p-3 border-b border-indigo-500 bg-white ${className}`}
    >
      <div
        className={`flex justify-between items-center gap-2 ${titleClassName} ${sizeClass}`}
      >
        <span className="text-indigo-500 text-xl flex items-center">
          {icon}
        </span>
        <strong className="text-indigo-500 text-lg">{title}</strong>
        <div
          className={`flex justify-between items-center ${titleClassName} ${sizeClass}`}
        >
          {searchButton}
        </div>
      </div>
      <div
        className={`flex justify-between gap-3 items-center ${itemsClassName} ${sizeClass}`}
      >
        {children}
      </div>
    </div>
  );
};

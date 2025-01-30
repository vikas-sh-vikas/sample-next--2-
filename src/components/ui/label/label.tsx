import React, { ReactNode } from "react";
import styles from "./label.module.css";

type LabelSizes = "small" | "basic" | "medium" | "large";

type LabelProps = {
  children?: ReactNode;
  className?: string;
  moduleClassName?: string;
  labelSize?: LabelSizes;
  forminputlables?: string;
};

export default function Label(props: LabelProps) {
  let {
    children,
    className,
    labelSize,
    forminputlables,
    moduleClassName = "",
    ...labelProps
  } = props;
  children = children ?? "Label";

  return (
    <label
      {...labelProps}
      className={`${className} ${styles[moduleClassName]} ${styles.label}`}
    >
      {children}
    </label>
  );
}

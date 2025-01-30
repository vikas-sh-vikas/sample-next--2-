import React from "react";
import styles from "@/components/ui/form/form.module.css";

type FormRowProps = {
  children: React.ReactNode;
  className?: string;
};

export const FormRow = (props: FormRowProps) => {
  let { children, className } = props;
  return <div className={`${styles.formRow} ${className}`}>{children}</div>;
};

import React, { InputHTMLAttributes } from "react";
import styles from "./form.module.css";
import Label from "@/components/ui/label/label";
import { UseFormRegister } from "react-hook-form";

export enum varientProps {
  row = "row",
  column = "column",
}

type CheckboxProps = {
  label: string;
  checked: boolean;
  className?: string;
  register?: UseFormRegister<any>;
  name: string;
  error?: string;
  varient?: varientProps;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<any>;

export default function FormCheckbox(props: CheckboxProps) {
  const {
    label,
    checked,
    name,
    onChange,
    error,
    varient = "row",
    className = "",
    disabled,
    register,
    ...checkBoxProps
  } = props;

  return (
    <div className={`${styles.formCheckbox} ${className} ${styles[varient]}`}>
      <div className={styles.RowDropdownDiv}>
        <input
          {...checkBoxProps}
          className={`${styles.checkbox} ${className}`}
          type="checkbox"
          {...register?.(name)}
          checked={checked}
          onChange={onChange}
        />
        {error && (
          <Label className={styles.errorLabel} moduleClassName="error">
            {error}
          </Label>
        )}
      </div>
      {label && (
        <Label
          className={`${styles.lables} ${disabled ? styles.disabledLabel : ""}`}
        >
          {label}
        </Label>
      )}
    </div>
  );
}

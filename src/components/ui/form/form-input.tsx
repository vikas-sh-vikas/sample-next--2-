/**
 * form-input.tsx
 * This file is used for form input for the form component throughout the application.
 */

import React, { useState, InputHTMLAttributes } from "react";
import Label from "@/components/ui/label/label";
import { Input } from "@/components/ui/input/input";
import styles from "@/components/ui/form/form.module.css";
import { UseFormRegister } from "react-hook-form";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
export enum varientProps {
  row = "row",
  column = "column",
}

type FormInputProps = {
  label?: string;
  name: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  row?: boolean;
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  varient?: varientProps;
  register?: UseFormRegister<any>;
  autoComplete?: "on" | "off";
  password?: boolean;
  search?: boolean;
  number?: boolean;
  verified?: boolean;
  isRequired?: boolean;
  length?: any;
  isDisabled?: boolean;
} & InputHTMLAttributes<any>;

export const FormInput = (props: FormInputProps) => {
  let {
    label,
    className = "",
    error,
    onChange,
    inputClassName = "",
    disabled,
    varient = "row",
    password,
    search,
    verified,
    register,
    length,
    number,
    placeholder,
    isRequired,
    ...formInputProps
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    if (!disabled) setShowPassword(!showPassword);
  };

  const formInputClass = `${styles.formInput} ${className} ${styles[varient]}`;
  const labelClass = `${className} ${styles.lables}`;
  const inputClass = `${styles.RowInputCss} ${inputClassName}`;

  return (
    <div className={formInputClass}>
      {label && (
        <Label className={labelClass}>
          {label}
          &nbsp;
          {isRequired && <span style={{ color: "red" }}>*</span>}
        </Label>
      )}
      <div className={styles.RowInputCssDiv}>
        <div className={styles.inputWrapper}>
          <Input
            {...formInputProps}
            placeholder={placeholder}
            onChange={onChange}
            type={
              password && !showPassword
                ? "password"
                : search
                ? "search"
                : number
                ? "number"
                : "text"
            }
            className={inputClass}
            length={length}
            disabled={disabled}
            register={register}
          />
          {password && (
            <span
              className="absolute inset-y-0 flex items-center cursor-pointer right-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEye className={disabled ? styles.disabledIcon : ""} />
              ) : (
                <FaEyeSlash className={disabled ? styles.disabledIcon : ""} />
              )}
            </span>
          )}
          {verified && (
            <span className={styles.eyeButton}>
              <FaCheck className={styles.checkIcon} />
            </span>
          )}
        </div>
        {error && (
          <Label className={styles.errorLabel} moduleClassName="error">
            {error}
          </Label>
        )}
      </div>
    </div>
  );
};

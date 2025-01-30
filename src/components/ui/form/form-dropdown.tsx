// "use client";
import Dropdown from "../dropdown/dropdown";
import Label from "@/components/ui/label/label";
import { UseFormRegister } from "react-hook-form";
import React, { ReactNode } from "react";
import styles from "@/components/ui/form/form.module.css";

type DropdownProps = {
  name?: string;
  error?: string;
  register?: UseFormRegister<any>;
  label?: string;
  children?: ReactNode;
  className?: string;
  value?: string | Array<string> | Array<any> | number;
  isMulti?: boolean;
  placeholder?: string;
  onChange?: (option: any) => void;
  onInputChange?: (inputValue: string) => void;
  isDisabled?: boolean;
  isRequired?: boolean;
  options?: {
    value: string | number;
    label: string;
  }[];
};

export const FormDropdown = (props: DropdownProps) => {
  const {
    error,
    children,
    options,
    label,
    className = "",
    isRequired,
    isDisabled,
    placeholder,
    onChange,
    isMulti,
    onInputChange,
    value,
    ...dropdownProps
  } = props;

  const dropdownWrapperClass = `${styles.dropdownWrapper} ${className}`;
  const formDropdownClass = `${styles.formDropdown} ${
    label || ""
  } ${className}`;

  return (
    <div className={dropdownWrapperClass}>
      {label && (
        <Label className={styles.lables}>
          {label}
          &nbsp;
          {isRequired && <span style={{ color: "red" }}>*</span>}
        </Label>
      )}
      <div className={formDropdownClass}>
        <Dropdown
          {...dropdownProps}
          placeholder={placeholder}
          options={options}
          disabled={isDisabled}
          buttonClassNames={className}
          onChange={onChange}
          isMulti={isMulti}
          onInputChange={onInputChange}
          value={value}
        />
        {error && (
          <Label className={styles.errorLabel} moduleClassName="error">
            {error}
          </Label>
        )}
      </div>
    </div>
  );
};

import React from "react";
import Select from "react-select";
import { UseFormRegister } from "react-hook-form";
import styles from "./dropdown.module.css";

type DropdownProps = {
  name?: string;
  isClearable?: boolean;
  isMulti?: boolean;
  options: any;
  value?: any;
  placeholder?: string;
  buttonClassNames?: string;
  onChange?: (newValue: any) => void;
  onInputChange?: (inputValue: string) => void;
  register?: UseFormRegister<any>;
  size?: Sizes;
  disabled?: boolean;
  error?: string;
  isError?: boolean;
  applyCustomMargin?: boolean;
};
type Sizes = "smaller" | "small" | "basic" | "medium" | "large";

export default function DropdownWidget(props: DropdownProps) {
  let {
    isClearable,
    isMulti,
    buttonClassNames,
    options,
    value,
    onChange,
    placeholder,
    onInputChange,
    register = (name: string) => {},
    name,
    size,
    error,
    isError,
    disabled,
    applyCustomMargin,
    ...dropdownProps
  } = props;

  isClearable = isClearable ?? false;
  isMulti = isMulti ?? false;
  size = size ?? "basic";
  const sizeClass = styles[size];

  if (isMulti) {
    value = options.filter((option: any) => value?.includes(option.value));
  } else {
    value = options?.find((option: any) => option.value === value);
  }

  const customStyles = {
    control: (base: any) => ({
      ...base,
      border: "none",
      backgroundColor: disabled ? "#white" : "#fff",
      boxShadow: "none",
      marginTop: applyCustomMargin ? "1vh" : "3vh",
      fontSize: "1rem",
      color: "red",
      textAlign: "center",
      "&:hover": {
        border: "none",
      },
    }),
    option: (base: any, { isSelected }: any) => ({
      ...base,
      backgroundColor: isSelected ? "#ec1a23" : "#fff",
      "&:hover": {
        borderColor: "red",
        backgroundColor: "#ffebec",
        color: "#2c2c2c",
      },
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#ccc",
    }),
    singleValue: (base: any) => ({
      ...base,
      fontSize: "1rem",
      color: "#e1000f",
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: "#e0e0e0",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: "#333",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: "#666",
      "&:hover": {
        backgroundColor: "#ffebec",
        color: "#ec1a23",
      },
    }),
    input: (base: any) => ({
      ...base,
      fontSize: "1rem",
    }),
  };

  const dropdownClassNames = [
    styles.dropdownWidget,
    buttonClassNames,
    sizeClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <Select
        {...dropdownProps}
        placeholder={placeholder}
        value={value}
        classNamePrefix="an-simple-select"
        className={dropdownClassNames}
        isClearable={isClearable}
        isMulti={isMulti}
        onChange={(newValue: any) => onChange?.(newValue)}
        onInputChange={onInputChange}
        options={options}
        styles={customStyles}
        isDisabled={disabled}
      />
      {isError && error && <span className={styles.errorLabel}>{error}</span>}
    </>
  );
}

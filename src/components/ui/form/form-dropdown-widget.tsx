import Dropdown from "../dropdown/dropdown";
import Label from "@/components/ui/label/label";
import { UseFormRegister } from "react-hook-form";
import React, { ReactNode } from "react";
import styles from "@/components/form/form.module.css";
import DropdownWidget from "../dropdown/dropdown-widget";

type DropdownProps = {
  name?: string;
  tagFooter?: string;
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
  section?: boolean;
  applyCustomMargin?: boolean;
  fileName?: string;
};

export const FormDropdownWidget = (props: DropdownProps) => {
  const {
    error,
    options,
    label,
    className,
    isRequired,
    isDisabled,
    placeholder,
    onChange,
    isMulti,
    onInputChange,
    value,
    fileName,
    applyCustomMargin,
    ...dropdownProps
  } = props;

  const combinedClassName = `${styles.dropdownWrapper} ${className || ""}`;

  return (
    <div className={combinedClassName}>
      <div
        style={{
          background: "#F0F0F0",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          fontSize: "0.9rem",
          padding: "0.4rem 0rem",
          textWrap: "nowrap",
        }}
      >
        {fileName == "" || fileName == undefined ? (
          ""
        ) : (
          <img
            style={{ height: "20px", width: "25px" }}
            src={`/uploads/${fileName}`}
            alt=""
            className={styles.imgStyle}
          />
        )}
        &nbsp;
        {label}
        &nbsp;
        {isRequired && <span style={{ color: "red" }}> *</span>}
      </div>
      <div className={`${styles.formDropdown} ${label || ""} ${className || ""}`}>
        <DropdownWidget
          {...dropdownProps}
          applyCustomMargin={applyCustomMargin}
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
      <div
        style={{
          display: "flex",
          textAlign: "center",
          fontSize: "0.7rem",
          height: props.section ? "2.6vh" : "4.5vh",
        }}
      >
        <div style={{ width: "33.33%" }}> </div>
        <div style={{ width: "33.33%" }}></div>
        <div style={{ width: "33.33%" }}></div>
      </div>
      <div
        style={{
          background: "#F0F0F0",
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
          fontSize: "0.9rem",
          height: "2vh",
          padding: "0.3rem 0.5rem",
          marginTop: "5px",
          borderBottom: "1px solid #e1000f",
        }}
      >
        <div style={{ fontSize: "0.9rem" }}></div>
        <div style={{ fontSize: "0.6rem", textWrap: "nowrap" }}>
          {props.tagFooter}
        </div>
        <div style={{ fontSize: "0.9rem" }}></div>
      </div>
    </div>
  );
};

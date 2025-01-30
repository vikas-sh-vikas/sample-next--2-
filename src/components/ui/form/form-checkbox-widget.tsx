import React, { ReactNode, useState } from "react";
import DropdownWidget from "../dropdown/dropdown-widget";
import Label from "@/components/ui/label/label";
import styles from "@/components/form/form.module.css";
import { UseFormRegister } from "react-hook-form";

type DropdownProps = {
  name?: string;
  error?: string;
  tagFooter?: string;
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

export const FormCheckboxWidget = (props: DropdownProps) => {
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

  const [selectedValues, setSelectedValues] = useState<Array<any>>(
    Array.isArray(value) ? value : []
  );

  const handleCheckboxChange = (optionValue: any) => {
    let updatedValues;
    if (selectedValues.includes(optionValue)) {
      updatedValues = selectedValues.filter((val) => val !== optionValue);
    } else {
      updatedValues = [...selectedValues, optionValue];
    }
    setSelectedValues(updatedValues);
    onChange?.(updatedValues);
  };

  const chunkArray = (arr: any[], size: number) =>
    arr.reduce(
      (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
      []
    );

  const optionPairs = chunkArray(options || [], 2);

  return (
    <>
      <div className={`${styles.radioWrapper} ${className}`}>
        <label
          style={{
            fontFamily: "SegoeUI, sans-serif, Arial",
            color: "#383838",
            fontSize: "0.9rem",
            textWrap: "nowrap",
          }}
        >
          {label}
        </label>
        {isRequired && (
          <span
            style={{
              color: "red",
              fontSize: "0.85rem",
              fontWeight: "700",
            }}
          >
            *
          </span>
        )}
      </div>
      {optionPairs.map((pair: any, pairIndex: any) => (
        <div key={pairIndex} className={`${styles.radioOptions} ${className}`}>
          {pair.map((option: any, index: any) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`checkbox_${index}`}
                className="custom-checkbox"
                name={option.label}
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                disabled={isDisabled}
              />
              <label htmlFor={`checkbox_${index}`}>{option.label}</label>
            </div>
          ))}
        </div>
      ))}
      {error && (
        <Label className={styles.errorLabel} moduleClassName="error">
          {error}
        </Label>
      )}
      <div
        style={{
          background: "#fbfbfb",
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
          fontSize: "0.9rem",
          height: "2.2vh",
          padding: "0.7rem 0.5rem",
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
    </>
  );
};

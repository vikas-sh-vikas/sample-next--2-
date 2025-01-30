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
};

export const FormRadioWidget = (props: DropdownProps) => {
  const {
    error,
    children,
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
    ...dropdownProps
  } = props;

  const chunkArray = (arr: any[], size: number) =>
    arr.reduce(
      (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
      []
    );

  // Chunk the options into pairs
  const optionPairs = chunkArray(options || [], 2);

  return (
    <>
      <div className={`${styles.formInput} ${className} ${styles["row"]}`}>
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
          <label
            style={{
              fontFamily: "SegoeUI, sans-serif, Arial",
              color: "#383838",
              fontSize: "0.9rem",
              textWrap: "nowrap",
            }}
          >
            {props.label}
          </label>
          {props.isRequired ? (
            <span
              style={{
                color: "red",
                fontSize: "0.85rem",
                fontWeight: "700",
              }}
            >
              *
            </span>
          ) : (
            ""
          )}
        </div>
        <div className={styles.RowInputCssDivWidget}>
          {optionPairs.map((pair: any, pairIndex: any) => (
            <div
              key={pairIndex}
              className={`${styles.radioOptions} ${className}`}
            >
              {pair.map((option: any, index: any) => (
                <React.Fragment key={index}>
                  <input
                    checked={value == option.value ? true : false}
                    type="radio"
                    id={`radio_${pairIndex}_${index}`}
                    name={label}
                    value={option.value}
                    onChange={onChange}
                    className="custom-radio"
                    disabled={isDisabled}
                  />
                  <label htmlFor={`radio_${pairIndex}_${index}`}>
                    {option.label}
                  </label>
                </React.Fragment>
              ))}
            </div>
          ))}
          {props.error
            ? error && (
                <Label className={styles.errorLabel} moduleClassName="error">
                  {error}
                </Label>
              )
            : ""}
        </div>
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
      </div>
    </>
  );
};

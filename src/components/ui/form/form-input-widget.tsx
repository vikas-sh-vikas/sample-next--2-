/**
 * form-input.tsx
 * This file is used for form input for the form component throughout the application.
 */

import React, { useState, InputHTMLAttributes, useEffect } from "react";
import Label from "@/components/label/label";
import { Input } from "@/components/input/input";
import classNames from "classNames";
import styles from "@/components/form/form.module.css";
import { UseFormRegister } from "react-hook-form";
import {
  FaArrowDown,
  FaArrowUp,
  FaCheck,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { InputWidget } from "../input/input-widget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTemperatureFull } from "@fortawesome/free-solid-svg-icons";
export enum varientProps {
  row = "row",
  column = "column",
}

type FormInputProps = {
  label?: string;
  minValue?: number | string | any;
  maxValue?: number | string | any;
  uOMName?: number | string;
  uomUniqueId?: string
  tagFooter?: string;
  prevValue?: any;
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
  verified?: boolean;
  isRequired?: boolean;
  length?: any;
  isDisabled?: boolean;
  normalInput?: boolean;
  isNested?: boolean;
  defaultTagH?: number | null | string | any;
  defaultTagHH?: number | null | string | any;
  defaultTagL?: number | null | string | any;
  defaultTagLL?: number | null | string | any;
  fileName?: string
} & InputHTMLAttributes<any>;

export const FormInputWidget = (props: FormInputProps) => {
  let {
    label,
    className,
    error,
    onChange,
    inputClassName,
    disabled,
    varient = "row",
    password,
    search,
    verified,
    register,
    length,
    isRequired,
    normalInput,
    defaultTagH,
    defaultTagHH,
    defaultTagL,
    defaultTagLL,
    minValue,
    fileName,
    maxValue,
    ...formInputProps
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    if (!disabled) setShowPassword(!showPassword);
  };
  const [inputValue, setInputValue] = useState<number | string | any>("");
  const getArrowColor = () => {
    const value = parseFloat(inputValue);
    const min = parseFloat(minValue as string);
    const max = parseFloat(maxValue as string);
    const high =
      defaultTagH !== null && defaultTagH !== ""
        ? parseFloat(defaultTagH as string)
        : NaN;
    const low =
      defaultTagL !== null && defaultTagL !== ""
        ? parseFloat(defaultTagL as string)
        : NaN;
    if (value < low) return "blue";
    if (value > high) return "red";
    if (value > low && value < high) return "none";
  };

  const getArrowDirection = () => {
    const value = parseFloat(inputValue);
    const min = parseFloat(minValue as string);
    const max = parseFloat(maxValue as string);
    const high =
      defaultTagH !== null && defaultTagH !== ""
        ? parseFloat(defaultTagH as string)
        : NaN;
    const low =
      defaultTagL !== null && defaultTagL !== ""
        ? parseFloat(defaultTagL as string)
        : NaN;
    if (value < low) return "down";
    if (value > high) return "up";
    if (value > low && value < high) return "none";
  };

  const arrowColor = getArrowColor();
  const arrowDirection = getArrowDirection();

  useEffect(() => {
    if (formInputProps.value !== undefined) {
      setInputValue(formInputProps.value as any);
    }
  }, [formInputProps.value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      <div className={classNames(styles.formInput, className, styles[varient])}>
        <div
          style={{
            background: "#F0F0F0",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            fontSize: "0.8rem",
            padding: "0.4rem 0rem",
            textWrap: "nowrap",
          }}
        >
          {
            fileName == "" || fileName == undefined ? "" :
              (<img
                style={{ height: "20px", width: "25px" }}
                src={`/uploads/${props.fileName}`}
                // src={`/assets/icons/${props.fileName}`}
                alt=""
                className={styles.imgStyle}
              />)
          }
          &nbsp;
          {props.isNested ? `${label?.slice(0, 3)}...` : label}
          &nbsp;
          {isRequired && <span style={{ color: "red" }}> *</span>}
          &nbsp;
          {arrowDirection === "down" && (
            <FaArrowDown style={{ color: arrowColor }} />
          )}
          {arrowDirection === "up" && (
            <FaArrowUp style={{ color: arrowColor }} />
          )}
        </div>
        <div className={styles.RowInputCssDivWidget}>
          <div className={styles.inputWrapper}>
            <InputWidget
              normalInput={props.normalInput}
              style={{ border: "none !important" }}
              {...formInputProps}
              onChange={handleInputChange}
              type={
                password && !showPassword
                  ? "password"
                  : search
                    ? "search"
                    : "text"
              }
              className={classNames(styles.RowInputCssWidget, inputClassName)}
              length={length}
              disabled={disabled}
              register={register}
            />
            {password && (
              <span
                className={styles.eyeButton}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEye
                    className={classNames({
                      [styles.disabledIcon]: disabled,
                    })}
                  />
                ) : (
                  <FaEyeSlash
                    className={classNames({
                      [styles.disabledIcon]: disabled,
                    })}
                  />
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
        <div
          style={{
            display: "flex",
            textAlign: "center",
            fontSize: "0.7rem",
            height: props?.isNested ? "19px" : "20px",
          }}
        >
          <div style={{ width: "33.33%" }}></div>
          <div style={{ width: "33.33%", textWrap: "nowrap" }}>
            {props.uOMName ? props.uOMName : ""}

          </div>
          <div style={{ width: "33.33%" }}>{props.prevValue}</div>
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
          <div style={{ fontSize: "0.7rem", textWrap: "nowrap" }}>
            <span>
              {props.minValue != null ? `Min ${props.minValue}` : " "}
            </span>
            <span className="pl-2">
              {props.defaultTagL ? `LSL ${props.defaultTagL}` : " "}
            </span>
          </div>
          <div
            style={{ fontSize: "0.7rem", textWrap: "nowrap", fontWeight: 600 }}
          >
            {props.tagFooter}
          </div>
          <div style={{ fontSize: "0.6rem", textWrap: "nowrap" }}>
            <span>{props.defaultTagH ? `HSL ${props.defaultTagH}` : " "}</span>
            <span className="pl-2" style={{ padding: "3px" }}>
              {props.minValue != null ? `Max ${props.maxValue}` : " "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

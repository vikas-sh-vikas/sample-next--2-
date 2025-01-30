import Label from "@/components/ui/label/label";
import { UseFormRegister } from "react-hook-form";
import React, { useState } from "react";
import styles from "./form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { format, getMonth, getYear } from "date-fns";
import Select from "react-select";
import { range } from "lodash";

type DatePickerProps = {
  onBlur?: Function;
  ClassNames?: string;
  value?: any;
  label?: string;
  tagFooter?: string;
  disabled?: boolean;
  error?: string;
  name: string;
  onChange?: Date | any;
  selected?: Date | string | any;
  minDate?: Date;
  maxDate?: Date;
  placeholderText?: string;
  register?: UseFormRegister<any>;
  selectedDate?: (selectDate?: any) => void;
  dateFormat?: any;
};

export const FormDatepickerWidget = (props: DatePickerProps) => {
  const {
    ClassNames = "",
    value,
    selectedDate,
    onBlur,
    label,
    disabled,
    error,
    register,
    onChange,
    dateFormat = "dd/MM/yyyy",
    selected,
    ...DatePickerProps
  } = props;

  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    setStartDate(date);
    onBlur?.();
    selectedDate?.(formattedDate);
  };

  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: "90px",
      minHeight: "30px",
    }),
    option: (provided: any, { isSelected, isFocused }: any) => ({
      ...provided,
      fontSize: "0.8rem",
      backgroundColor: isSelected ? "red" : "none",
      "&:hover": {
        backgroundColor: isFocused ? "#ffccd0" : "none",
      },
    }),
  };

  const customStyles1 = {
    control: (provided: any) => ({
      ...provided,
      width: "135px",
      minHeight: "30px",
    }),
    option: (provided: any, { isSelected, isFocused }: any) => ({
      ...provided,
      fontSize: "0.8rem",
      backgroundColor: isSelected ? "red" : "none",
      "&:hover": {
        backgroundColor: isFocused ? "#ffccd0" : "none",
      },
    }),
  };

  return (
    <>
      <div className={`${styles.radioWrapper} ${ClassNames}`}>
        <label
          style={{
            fontFamily: "SegoeUI, sans-serif, Arial",
            color: "#383838",
            fontSize: "0.9rem",
          }}
        >
          {label}
        </label>
      </div>
      <div style={{ paddingTop: "1.5vh", textAlign: "center" }}>
        <DatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Select
                value={{
                  value: getYear(date),
                  label: getYear(date).toString(),
                }}
                onChange={(selectedOption: any) =>
                  changeYear(selectedOption?.value || 0)
                }
                options={years.map((option: any) => ({
                  value: option,
                  label: option.toString(),
                }))}
                className={`${styles.customSelect} ${styles.optionColor}`}
                styles={customStyles}
              />

              <Select
                value={{
                  value: months[getMonth(date)],
                  label: months[getMonth(date)],
                }}
                onChange={(selectedOption: any) =>
                  changeMonth(months.indexOf(selectedOption?.value || ""))
                }
                options={months.map((option) => ({
                  value: option,
                  label: option,
                }))}
                className={`${styles.customSelect} ${styles.optionColor}`}
                styles={customStyles1}
              />
            </div>
          )}
          disabled={disabled}
          selected={startDate}
          dateFormat={dateFormat}
          className={`${ClassNames} p-2 ${styles.datepickerbox} ${
            disabled ? styles.disabled : ""
          }`}
          autoComplete="off"
          onChange={(date) => {
            setStartDate(date as any);
            selectedDate?.(date);
          }}
          {...DatePickerProps}
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
          height: "3vh",
        }}
      >
        <div style={{ width: "33.33%" }}> </div>
        <div style={{ width: "33.33%" }}></div>
        <div style={{ width: "33.33%" }}></div>
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
        <div style={{ fontSize: "0.6rem" }}>{props.tagFooter}</div>
        <div style={{ fontSize: "0.9rem" }}></div>
      </div>
    </>
  );
};

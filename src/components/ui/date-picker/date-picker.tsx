import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format, getMonth, getYear } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { range } from "lodash";

type DatePickerProps = {
  onBlur?: Function;
  classNames?: string;
  value?: any;
  label?: string;
  disabled?: boolean;
  error?: string;
  name: string;
  onChange?: Date | any;
  selected?: Date | string | any;
  minDate?: Date;
  maxDate?: Date;
  placeholderText?: string;
  register?: any;
  selectedDate?: (selectDate: any) => void;
  dateFormat?: any;
};

export default function PickDate(props: DatePickerProps) {
  let {
    classNames,
    value,
    selectedDate,
    onBlur,
    label,
    disabled,
    error,
    onChange,
    dateFormat = "dd/MM/yyyy",
    selected,
    ...datePickerProps
  } = props;
  const [startDate, setStartDate] = useState(new Date(value));

  const handleChange = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    setStartDate(date);
    if (onBlur && typeof onBlur === "function") {
      onBlur();
    }
    if (selectedDate && date) {
      selectedDate(formattedDate);
    }
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
    <div className="relative w-[48.5%]">
      {label && <p className="mb-2 text-sm font-bold text-gray-800">{label}</p>}
      <DatePicker
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div className="flex justify-center space-x-2">
            <Select
              value={{
                value: getYear(date),
                label: getYear(date).toString(),
              }}
              onChange={(selectedOption: any) =>
                changeYear(selectedOption?.value || 0)
              }
              options={years.map((option) => ({
                value: option,
                label: option.toString(),
              }))}
              className="custom-select"
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
              className="custom-select"
              styles={customStyles1}
            />
          </div>
        )}
        disabled={disabled}
        selected={selected}
        dateFormat={dateFormat}
        className={`p-2 rounded border border-gray-300 bg-white w-full ${classNames} ${
          disabled ? "bg-gray-200 text-gray-500" : ""
        }`}
        autoComplete="off"
        onChange={onChange}
        {...datePickerProps}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { UseFormRegister } from "react-hook-form";

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
};

type Sizes = "smaller" | "small" | "basic" | "medium" | "large";

export default function Dropdown(props: DropdownProps) {
  const {
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
    ...dropdownProps
  } = props;

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  let adjustedValue;
  if (isMulti) {
    adjustedValue = options?.filter((option: any) =>
      value?.includes(option.value)
    );
  } else {
    adjustedValue = options?.find((option: any) => option.value === value);
  }

  const customStyles = {
    option: (base: any, { isSelected }: any) => ({
      ...base,
      backgroundColor: isSelected ? "oklch(0.511 0.262 276.966)" : "#fff",
      "&:hover": {
        borderColor: "oklch(0.511 0.262 276.966)",
        backgroundColor: "oklch(0.962 0.018 272.314)",
        color: "#2c2c2c",
      },
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 99999,
    }),
  };

  const sizeClass = getSizeClass(size ?? "basic");

  return (
    <>
      {isClient && (
        <Select
          {...dropdownProps}
          placeholder={placeholder}
          value={adjustedValue}
          classNamePrefix="an-simple-select"
          className={`w-full text-black ${sizeClass} ${buttonClassNames}`}
          isClearable={isClearable}
          isMulti={isMulti}
          onChange={(newValue: any) => onChange?.(newValue)}
          onInputChange={onInputChange}
          options={options}
          styles={customStyles}
          isDisabled={disabled}
          menuPortalTarget={document.body}
        />
      )}
      {isError && error && <span className="text-red-600">{error}</span>}
    </>
  );
}

function getSizeClass(size: Sizes) {
  switch (size) {
    case "smaller":
      return "text-xs";
    case "small":
      return "text-sm";
    case "basic":
      return "text-base";
    case "medium":
      return "text-lg";
    case "large":
      return "text-xl";
    default:
      return "text-base";
  }
}

import React, { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

type Length = "full" | "half" | "oneThird" | "inputEmail";
type InputProps = {
  placeholder?: string;
  showPassword?: boolean;
  className?: string;
  register?: UseFormRegister<any>;
  name: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  autoComplete?: "on" | "off";
  length: Length;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<any>;

export const Input = (props: InputProps) => {
  let {
    placeholder,
    className,
    register = (name: string) => {},
    name,
    onChange,
    onKeyDown,
    disabled,
    autoComplete,
    length,
    ...restProps
  } = props;
  autoComplete = autoComplete ?? "off";
  placeholder = placeholder ?? "Enter your value";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <input
      {...restProps}
      value={props.value}
      className={`p-2 border border-gray-300 rounded shadow-inner focus:outline-none 
        ${length === "full" ? "w-full" : ""} 
        ${length === "half" ? "w-1/2" : ""} 
        ${length === "oneThird" ? "w-1/3" : ""} 
        ${length === "inputEmail" ? "w-[122%]" : ""} 
        ${disabled ? "opacity-50 bg-gray-200" : ""} 
        ${className}`}
      placeholder={placeholder}
      {...register(name)}
      onKeyDown={onKeyDown}
      disabled={disabled}
      autoComplete={autoComplete}
      onChange={handleChange}
    />
  );
};

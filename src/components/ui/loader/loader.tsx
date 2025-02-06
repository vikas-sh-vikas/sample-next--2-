import React from "react";
import { FaCircleNotch } from "react-icons/fa";

type TLoader = {
  size?: any;
  style?: React.CSSProperties;
  className?: string;
};

export default function Loader(props: TLoader) {
  const { size, style, className } = props;
  return (
    <div className="flex justify-center items-center">
      <FaCircleNotch
        className={`animate-spin ${className}`}
        size={size}
        style={style}
      />
    </div>
  );
}

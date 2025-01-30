import React from "react";
import { FaCircleNotch } from "react-icons/fa";

type TLoader = {
  size?: any;
  style?: React.CSSProperties;
};

export default function Loader(props: TLoader) {
  const { size, style } = props;
  return (
    <div className="flex justify-center items-center">
      <FaCircleNotch className="animate-spin" size={size} style={style} />
    </div>
  );
}

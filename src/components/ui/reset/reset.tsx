"use client";

import React, { FC, useState } from "react";
import { FaRepeat } from "react-icons/fa6";
// import Text from "@/context/language-context";

interface FilterResetComponentProps {
  onResetFilters: () => void;
  venueDetails?: boolean;
  text?: string[];
  TextToHover?: string;
}

const FilterResetComponent: FC<FilterResetComponentProps> = ({
  onResetFilters,
  venueDetails = false,
  text = [],
  TextToHover = "",
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleResetClick = () => {
    onResetFilters();
  };

  return (
    <div className="relative">
      {venueDetails ? (
        <div>{TextToHover}...</div>
      ) : (
        <div>
          <FaRepeat
            className="text-blue-500 cursor-pointer"
            onClick={handleResetClick}
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          />
        </div>
      )}
      {isTooltipVisible && !venueDetails && (
        <div className="absolute top-[145%] left-[50%] transform -translate-x-1/2 bg-white border border-gray-300 p-1 text-blue-500 rounded-lg z-10 w-24 text-center">
          {"Reset"}
        </div>
      )}
      {venueDetails && (
        <div className="absolute top-[145%] left-[50%] transform -translate-x-1/2 bg-white border border-gray-300 p-2 text-gray-700 rounded-lg z-10 w-16">
          {text.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterResetComponent;

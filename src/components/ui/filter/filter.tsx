import React from "react";

type FilterProps = {
  filterKey?: string;
  activeFilters?: string;
  orderType?: string;
  onFilterChange?: (key: any, orderType: string) => void;
};

const Filter: React.FC<FilterProps> = ({
  filterKey,
  activeFilters,
  orderType,
  onFilterChange,
}) => {
  const isActive = activeFilters === filterKey;

  const handleFilterClick = () => {
    let newOrderType = isActive ? (orderType === "A" ? "D" : "A") : "A";

    if (onFilterChange) {
      onFilterChange(filterKey, newOrderType);
    }
  };

  return (
    <div
      className={`cursor-pointer ${
        isActive ? "text-primary" : "text-gray-300"
      }`}
      title="Filter"
      onClick={handleFilterClick}
    >
      <div className="flex flex-col">
        <div className="mb-[-0.55rem]"></div>
        <div></div>
      </div>
    </div>
  );
};

export default Filter;

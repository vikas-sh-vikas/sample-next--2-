import React from "react";
import Filter from "../filter/filter";

type Variants = "leftAlign" | "rightAlign" | "centerAlign";

type TableProps = {
  classNames?: string;
  children: React.ReactNode;
  filterKey?: string;
  activeFilters?: string;
  orderType?: string;
  colSpan?: number;
  variant?: Variants;
  width?: string;
  height?: string;
  onFilterChange?: (key: string, orderType: string) => void;
};

export function Table(props: TableProps) {
  return (
    <table
      className={`w-full border-collapse bg-light-primary ${props.classNames}`}
    >
      {props.children}
    </table>
  );
}

export function TableBody(props: TableProps) {
  return (
    <tbody className={`text-sm bg-white text-black ${props.classNames}`}>
      {props.children}
    </tbody>
  );
}

export function TableHead(props: TableProps) {
  return (
    <thead
      className={`bg-primary-gradient text-light text-center text-sm border-b cursor-pointer ${props.classNames}`}
    >
      {props.children}
    </thead>
  );
}

export function TableHeadCell(props: TableProps) {
  const handleHeaderClick = () => {
    if (props.onFilterChange) {
      props.onFilterChange(
        props.filterKey as string,
        props.orderType === "A" ? "D" : "A"
      );
    }
  };

  const { variant = "centerAlign" } = props;
  return (
    <th
      style={{ width: props.width, height: props.height }}
      className={`text-center p-2 cursor-pointer ${props.classNames}`}
      onClick={handleHeaderClick}
    >
      <div className={`flex items-center justify-${variant} gap-1`}>
        {props.children}
        {props.filterKey && (
          <Filter
            filterKey={props.filterKey}
            activeFilters={props.activeFilters}
            onFilterChange={props.onFilterChange}
            orderType={props.orderType}
          />
        )}
      </div>
    </th>
  );
}

export function TableRow(props: TableProps) {
  return (
    <tr
      className={`text-center border-b hover:bg-light-primary hover:shadow-lg hover:cursor-pointer transition-all ${props.classNames}`}
    >
      {props.children}
    </tr>
  );
}

export function TableColumn(props: TableProps) {
  const { variant = "centerAlign" } = props;
  return (
    <td
      colSpan={props.colSpan}
      className={`border-b text-center p-2 ${props.classNames}`}
    >
      <div className={`flex justify-${variant} ${props.classNames}`}>
        {props.children}
      </div>
    </td>
  );
}

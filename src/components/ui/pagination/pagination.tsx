"use client";

import ReactPaginate from "react-paginate";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Select from "react-select";

type PaginationProps = {
  currentPage?: number;
  filterRowsCount: number;
  totalRows?: number;
  ClassNames?: string;
  itemsPerPage: number;
  onPageChange?: (newPage: number, newPageSize: number) => void;
  fetchdata?: (
    currentPage: number,
    pageSize: number,
    searchText: string
  ) => void;
  searchText?: string;
};

export default function Pagination(props: PaginationProps) {
  const {
    filterRowsCount,
    totalRows,
    itemsPerPage,
    ClassNames,
    currentPage,
    fetchdata,
    searchText,
    onPageChange,
  } = props;

  const [pageCount, setPageCount] = useState(
    Math.ceil((totalRows as number) / itemsPerPage)
  );
  const [pageSize, setPageSize] = useState(itemsPerPage);
  const [isClient, setIsClient] = useState(false); // Track if the component is client-side rendered

  useEffect(() => {
    setIsClient(true); // Set flag to indicate client-side rendering
  }, []);

  useEffect(() => {
    const newPageCount = Math.ceil((totalRows as number) / itemsPerPage);
    setPageCount(newPageCount);
    setPageSize(itemsPerPage);
  }, [totalRows, itemsPerPage]);

  const handlePageClick = (selected: { selected: number }) => {
    const newIndex = selected.selected + 1;

    if (onPageChange) {
      onPageChange(newIndex, pageSize);
      const newurl = new URL(window.location.href);
      newurl.searchParams.set("currentPage", newIndex.toString());
      window.history.pushState({}, "", newurl.toString());
    }
    if (fetchdata) {
      fetchdata(newIndex, pageSize, searchText as string);
    }
  };

  const options = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  const handlePageSizeChange = (pagesize: any) => {
    const newPageSize = parseInt(pagesize, 10);

    if (!isNaN(newPageSize)) {
      const newPage = currentPage
        ? Math.ceil(((currentPage - 1) * pageSize + 1) / newPageSize)
        : 1;

      setPageSize(newPageSize);
      const newurl = new URL(window.location.href);
      newurl.searchParams.set("pageSize", newPageSize.toString());
      window.history.pushState({}, "", newurl.toString());

      if (onPageChange) {
        onPageChange(newPage, newPageSize);

        const newurl = new URL(window.location.href);
        newurl.searchParams.set("currentPage", "1");
        window.history.pushState({}, "", newurl.toString());
      }

      if (fetchdata && searchText !== undefined) {
        fetchdata(newPage, newPageSize, searchText);
      }
    }
  };

  return (
    <div className="flex justify-between items-center flex-wrap">
      <div className="text-sm p-2 md:hidden">
        {currentPage && filterRowsCount && totalRows
          ? `Showing ${(currentPage - 1) * pageSize + 1} to ${Math.min(
              (currentPage - 1) * pageSize + pageSize,
              totalRows
            )} out of ${totalRows} entries`
          : ""}
      </div>
      <div className="flex items-center">
        <div className="hidden md:block text-sm">
          {currentPage && filterRowsCount && totalRows
            ? `Showing ${(currentPage - 1) * pageSize + 1} to ${Math.min(
                (currentPage - 1) * pageSize + pageSize,
                totalRows
              )} out of ${totalRows} entries`
            : ""}
        </div>
        <label className="ml-4 text-sm" htmlFor="pageSizeSelect">
          Page Size:
        </label>
        <div className="ml-2">
          {isClient && (
            <Select
              isSearchable={false}
              id="pageSizeSelect"
              value={{ value: pageSize, label: pageSize.toString() }}
              onChange={(selectedOption) =>
                handlePageSizeChange(selectedOption?.value)
              }
              options={options}
              classNamePrefix="react-select"
              menuPlacement="top"
            />
          )}
        </div>
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel={<FaChevronRight />}
        pageCount={pageCount > 0 ? pageCount : 1} // Ensure pageCount is never 0
        pageRangeDisplayed={2}
        className={ClassNames}
        previousLabel={<FaChevronLeft />}
        marginPagesDisplayed={1}
        nextClassName="inline-block"
        pageClassName="inline-block"
        activeClassName="bg-blue-500 text-white"
        breakClassName="inline-block"
        disabledClassName="text-gray-400 cursor-not-allowed"
        nextLinkClassName="block text-blue-500 px-2 py-1 rounded"
        pageLinkClassName="block px-2 py-1 rounded"
        previousClassName="inline-block"
        breakLinkClassName="block text-blue-500 px-2 py-1 rounded"
        containerClassName="flex justify-end pr-4"
        previousLinkClassName="block text-blue-500 px-2 py-1 rounded"
        onPageChange={handlePageClick}
        forcePage={
          currentPage && currentPage <= pageCount ? currentPage - 1 : 0
        } // Ensure forcePage is within bounds
      />
    </div>
  );
}

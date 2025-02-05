"use client";

import Loader from "@/components/ui/loader/loader";
import { PageHeader } from "@/components/ui/page-header/page-header";
import Pagination from "@/components/ui/pagination/pagination";
import FilterResetComponent from "@/components/ui/reset/reset";
import Search from "@/components/ui/search/search";
import {
  TableRow,
  TableColumn,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
} from "@/components/ui/table/table";
import useFetch from "@/hooks/useFetch";
import useToast from "@/hooks/useToast";
import { ToastOpen, ToastType } from "@/state/toast/slice";
import { GetCompanyList, GetInvoiceList } from "@/utils/api.constant";
import { eResultCode } from "@/utils/enum";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaCheck, FaEdit, FaPlus, FaRegFileAlt, FaTimes } from "react-icons/fa";

function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { post } = useFetch();
  const { onShowToast } = useToast();
  const [filterRowsCount, setFilterRowsCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<SaleIndexModel[]>([]); // State to store the data

  const fetchData = async (
    currentPage: number,
    searchText: string,
    pageSize: number
  ) => {
    setIsLoading(true);
    try {
      const payload = {
        data: {
          currentPage: currentPage,
          searchText: searchText,
          pageSize: pageSize,
        },
      };
      const response = await post(GetInvoiceList, payload);
      const { dataResponse } = response;
      const { returnCode, description } = dataResponse;
      if (returnCode == eResultCode.SUCCESS) {
        // setIsLoading(false);
        const data = await response.data;
        onShowToast({
          type: ToastType.success,
          title: <FaCheck />,
          position: ToastOpen.leftBottom,
          content: description,
        });
        // console.log("DtaResponce", response.data);
        setData(data);
        setFilterRowsCount(data.length); // Assuming the length is the total rows count
      } else {
        onShowToast({
          type: ToastType.error,
          title: <FaTimes />,
          position: ToastOpen.leftBottom,
          content: description,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("FilterData", filterRowsCount, currentPage);
  useEffect(() => {
    fetchData(currentPage, searchText, pageSize);
  }, [currentPage, pageSize, searchText]); // Re-fetch data on page change, searchText, or pageSize change
  const handleEdit = (id: number) => {
    router.push(pathname + `/form/${id}`);
  };
  const handleSearch = (searchText: string) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("search", searchText.toString());
    newUrl.searchParams.set("currentPage", currentPage.toString());
    window.history.pushState({}, "", newUrl.toString());
    setCurrentPage(1);
    setSearchText(searchText);
  };
  const handleResetFilters = () => {
    setCurrentPage(1);
    setSearchText("");
    setPageSize(10);
    router.push(pathname);
  };
  const handleAdd = () => {
    router.push(pathname + "/form/0");
  };
  const renderList = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableColumn colSpan={12} variant="leftAlign">
            <Loader size={"20"} />
          </TableColumn>
        </TableRow>
      );
    } else if (data.length === 0) {
      return (
        <TableRow>
          <TableColumn colSpan={12} variant="leftAlign">
            <span className="noData">There is no data yet...</span>
          </TableColumn>
        </TableRow>
      );
    } else {
      return data.map((item, index) => (
        <TableRow key={item.id}>
          <TableColumn classNames="indexColumn">
            {index + 1 + (currentPage - 1) * pageSize}
          </TableColumn>
          <TableColumn variant="leftAlign">{item.invoiceNumber}</TableColumn>
          <TableColumn variant="leftAlign">{item.date}</TableColumn>
          <TableColumn variant="leftAlign">{item.billToName}</TableColumn>
          <TableColumn variant="leftAlign">{item.taxAmount}</TableColumn>
          <TableColumn variant="leftAlign">{item.totalAmount}</TableColumn>
          <TableColumn classNames="actionColumn">
            <FaEdit onClick={() => handleEdit(item.id)} />
          </TableColumn>
        </TableRow>
      ));
    }
  };

  return (
    <div className="border-4 ">
      <PageHeader icon={<FaRegFileAlt />} title={"Sales"} size="large">
        <Search
          searchText={searchText}
          onInputChange={(e: any) => handleSearch(e)}
        />
        <FilterResetComponent onResetFilters={() => handleResetFilters()} />
      </PageHeader>
      <div className="tableWrap">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell classNames="indexColumn">{"Sr.No"}</TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"Invoice No."}
              </TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"Date"}
              </TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"Customer"}
              </TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"Tax Amount"}
              </TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"Total Amount"}
              </TableHeadCell>
              <TableHeadCell classNames="Theader">
                <FaPlus onClick={handleAdd} />
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderList()}</TableBody>
        </Table>
      </div>
      <div>
        {!isLoading && (
          <Pagination
            filterRowsCount={filterRowsCount}
            totalRows={filterRowsCount}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            fetchdata={(currentPage, pageSize) => {
              setPageSize(pageSize);
              fetchData(currentPage, searchText, pageSize);
            }}
            searchText={searchText || ""}
            itemsPerPage={pageSize}
          />
        )}
      </div>
    </div>
  );
}

export default Page;

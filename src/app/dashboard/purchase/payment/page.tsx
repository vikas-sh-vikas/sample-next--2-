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
import useDrawer from "@/hooks/useDrawer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaCheck, FaEdit, FaPlus, FaRegFileAlt, FaTimes } from "react-icons/fa";
import { DrawerOpen } from "@/state/drawer/slice";
import PaymentVoucherForm from "./form/paymentVoucherForm";
import { GetReceiptList } from "@/utils/api.constant";
import { eResultCode } from "@/utils/enum";
import { ToastOpen, ToastType } from "@/state/toast/slice";
import useToast from "@/hooks/useToast";
import useFetch from "@/hooks/useFetch";

type TReceiptModal = {
  id: number;
  voucherNo: string;
  date: string;
  description: string;
};

function Page() {
  const {onShowToast}=useToast()
  const router = useRouter();
  const {post} = useFetch()
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterRowsCount, setFilterRowsCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("PAYMENT");
  const [data, setData] = useState<TReceiptModal[]>([]); // State to store the data
  const { onShowDrawer } = useDrawer();
  const fetchData = async (
    currentPage: number,
    searchText: string,
    pageSize: number,
    type: string
  ) => {
    setIsLoading(true);
    try {
      const payload = {
        data: {
          currentPage: currentPage,
          searchText: searchText,
          pageSize: pageSize,
          type: type,
        },
      };
      const response = await post(GetReceiptList, payload);
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

  useEffect(() => {
    fetchData(currentPage, searchText, pageSize,type);
  }, [currentPage, pageSize, searchText]); // Re-fetch data on page change, searchText, or pageSize change
  const handleEdit = (id: number) => {
    // router.push(pathname + `/form/${id}`);
    const drawerWidth = window.innerWidth <= 640 
    ? "100%" 
    : window.innerWidth <= 1024 
      ? "60%" 
      : "45%";    onShowDrawer({
      dimmer: true,
      width: drawerWidth,
      name: "Show Drawer Form",
      Component: () => (
        <PaymentVoucherForm
          id={id}
          onRefreshList={() => {
            onRefreshList();
          }}
        />
      ),
      position: DrawerOpen.right,
    });
  };
  const onRefreshList = () => {
    const urlparams = new URLSearchParams(location.search);
    const page = urlparams.get("currentPage");
    if (page) {
      setCurrentPage(parseInt(page));
    }
    const psize = urlparams.get("pageSize");
    if (psize) {
      setPageSize(parseInt(psize));
    }
    const sText = urlparams.get("search");
    if (sText) {
      setSearchText(sText);
    }
    if (page || psize || sText)
      fetchData(
        parseInt(page ? page : "1"),
        sText ? sText : "",
        parseInt(psize ? psize : "10"),
        type
      );
    else fetchData(currentPage, searchText, pageSize,type);
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

  const handleAdd = (id: number) => {
    console.log("Id in List", id);
    const drawerWidth = "45%";
    onShowDrawer({
      dimmer: true,
      width: drawerWidth,
      name: "Show Drawer Form",
      Component: () => (
        <PaymentVoucherForm
          id={id}
          onRefreshList={() => {
            onRefreshList()
          }}
        />
      ),
      position: DrawerOpen.right,
    });
  };
  const renderList = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableColumn colSpan={12} variant="leftAlign">
            <Loader />
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
          <TableColumn variant="leftAlign">{item.voucherNo}</TableColumn>
          <TableColumn variant="leftAlign">{item.date}</TableColumn>
          <TableColumn variant="leftAlign">{item.description}</TableColumn>
          {/* <TableColumn variant="leftAlign">{item.contactDetail}</TableColumn> */}
          <TableColumn classNames="actionColumn">
            <FaEdit onClick={() => handleEdit(item.id)} />
          </TableColumn>
        </TableRow>
      ));
    }
  };

  return (
    <div className="border-4 ">
      <PageHeader icon={<FaRegFileAlt />} title={"Payment"} size="large">
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
              <TableHeadCell classNames="indexColumn">
                {"SerialNo"}
              </TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"Voucher No."}
              </TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"Date"}
              </TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"Description"}
              </TableHeadCell>
              <TableHeadCell classNames="Theader">
                <FaPlus onClick={() => handleAdd(0)} />
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
              fetchData(currentPage, searchText, pageSize,type);
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

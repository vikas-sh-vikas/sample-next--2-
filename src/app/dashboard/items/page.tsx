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
import ProductForm from "./form/page";
import { DrawerOpen } from "@/state/drawer/slice";
import useFetch from "@/hooks/useFetch";
import { GetItemsList } from "@/utils/api.constant";
import useToast from "@/hooks/useToast";
import { eResultCode } from "@/utils/enum";
import { ToastOpen, ToastType } from "@/state/toast/slice";

function Page() {
  const router = useRouter();
  const { post } = useFetch();
  const { onShowToast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterRowsCount, setFilterRowsCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<TItemsListodel[]>([]); // State to store the data
  const { onShowDrawer } = useDrawer();
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
      const response = await post(GetItemsList, payload);
      const { dataResponse } = response;
      const { returnCode, description } = dataResponse;
      if (returnCode == eResultCode.SUCCESS) {
        // setIsLoading(false);
        onShowToast({
          type: ToastType.success,
          title: <FaCheck />,
          position: ToastOpen.leftBottom,
          content: description,
        });
        setData(response.data);
        setFilterRowsCount(response.Data.length); // Assuming the length is the total rows count
        // setIsLoading(false);
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
    fetchData(currentPage, searchText, pageSize);
  }, [currentPage, pageSize, searchText]); // Re-fetch data on page change, searchText, or pageSize change
  const handleEdit = (id: number) => {
    // router.push(pathname + `/form/${id}`);
    const drawerWidth = "45%";
    onShowDrawer({
      dimmer: true,
      width: drawerWidth,
      name: "Show Drawer Form",
      Component: () => (
        <ProductForm
          id={id}
          onRefreshList={() => {
            fetchData(currentPage, searchText, pageSize);
          }}
        />
      ),
      position: DrawerOpen.right,
    });
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
  const OnRefreshList = () => {
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
        parseInt(psize ? psize : "10")
      );
    else fetchData(currentPage, searchText, pageSize);
  };
  const handleAdd = (id: number) => {
    const drawerWidth = "45%";
    onShowDrawer({
      dimmer: true,
      width: drawerWidth,
      name: "Show Drawer Form",
      Component: () => (
        <ProductForm
          id={id}
          onRefreshList={() => {
            OnRefreshList();
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
          <TableColumn variant="leftAlign">{item.productName}</TableColumn>
          <TableColumn variant="leftAlign">{item.hsnCode}</TableColumn>
          <TableColumn variant="leftAlign">{item.group}</TableColumn>
          <TableColumn variant="leftAlign">{item.unit}</TableColumn>
          <TableColumn variant="leftAlign">{item.price}</TableColumn>
          <TableColumn classNames="actionColumn">
            <FaEdit onClick={() => handleEdit(item.id)} />
          </TableColumn>
        </TableRow>
      ));
    }
  };

  return (
    <div className="border-4 ">
      <PageHeader icon={<FaRegFileAlt />} title={"Products"} size="large">
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
                {"Product Name"}
              </TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"HSN No"}
              </TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"Group"}
              </TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"Unit"}
              </TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"Price"}
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

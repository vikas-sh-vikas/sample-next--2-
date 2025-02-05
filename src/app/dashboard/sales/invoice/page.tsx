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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaRegFileAlt } from "react-icons/fa";

type TSaleModel = {
  id: number;
  customerName: string;
  gstNo: string;
  address: string;
  contactPerson: string;
  contactDetail: string;
};

function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterRowsCount, setFilterRowsCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<TSaleModel[]>([]); // State to store the data

  const fetchData = async (
    currentPage: number,
    searchText: string,
    pageSize: number
  ) => {
    setIsLoading(true);

    // Simulated API data
    const fetchedData: TSaleModel[] = [
      {
        id: 1,
        customerName: "John Doe",
        gstNo: "27AAAPL1234C1ZV",
        address: "123 Main Street, New York, NY 10001",
        contactPerson: "Jane Doe",
        contactDetail: "+1-234-567-8901",
      },
      {
        id: 2,
        customerName: "Alice Smith",
        gstNo: "29BBAPL5678D1ZV",
        address: "456 Elm Street, Los Angeles, CA 90001",
        contactPerson: "Bob Smith",
        contactDetail: "+1-345-678-9012",
      },
      {
        id: 3,
        customerName: "Michael Brown",
        gstNo: "19CCAPL9101E1ZV",
        address: "789 Oak Street, Chicago, IL 60601",
        contactPerson: "Emily Brown",
        contactDetail: "+1-456-789-0123",
      },
      {
        id: 4,
        customerName: "Michael Brown",
        gstNo: "19CCAPL9101E1ZV",
        address: "789 Oak Street, Chicago, IL 60601",
        contactPerson: "Emily Brown",
        contactDetail: "+1-456-789-0123",
      },
      {
        id: 5,
        customerName: "Michael Brown",
        gstNo: "19CCAPL9101E1ZV",
        address: "789 Oak Street, Chicago, IL 60601",
        contactPerson: "Emily Brown",
        contactDetail: "+1-456-789-0123",
      },
      {
        id: 6,
        customerName: "Michael Brown",
        gstNo: "19CCAPL9101E1ZV",
        address: "789 Oak Street, Chicago, IL 60601",
        contactPerson: "Emily Brown",
        contactDetail: "+1-456-789-0123",
      },
      {
        id: 7,
        customerName: "Michael Brown",
        gstNo: "19CCAPL9101E1ZV",
        address: "789 Oak Street, Chicago, IL 60601",
        contactPerson: "Emily Brown",
        contactDetail: "+1-456-789-0123",
      },
      {
        id: 8,
        customerName: "Michael Brown",
        gstNo: "19CCAPL9101E1ZV",
        address: "789 Oak Street, Chicago, IL 60601",
        contactPerson: "Emily Brown",
        contactDetail: "+1-456-789-0123",
      },
      {
        id: 9,
        customerName: "Michael Brown",
        gstNo: "19CCAPL9101E1ZV",
        address: "789 Oak Street, Chicago, IL 60601",
        contactPerson: "Emily Brown",
        contactDetail: "+1-456-789-0123",
      },
      {
        id: 10,
        customerName: "Michael Brown",
        gstNo: "19CCAPL9101E1ZV",
        address: "789 Oak Street, Chicago, IL 60601",
        contactPerson: "Emily Brown",
        contactDetail: "+1-456-789-0123",
      },
    ];

    // Set the fetched data to state
    setData(fetchedData);
    setFilterRowsCount(fetchedData.length); // Assuming the length is the total rows count

    setIsLoading(false);
  };

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
          <TableColumn variant="leftAlign">{item.customerName}</TableColumn>
          <TableColumn variant="leftAlign">{item.gstNo}</TableColumn>
          <TableColumn variant="leftAlign">{item.contactPerson}</TableColumn>
          <TableColumn variant="leftAlign">{item.contactDetail}</TableColumn>
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
              <TableHeadCell classNames="indexColumn">
                {"SerialNo"}
              </TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"Customer Name"}
              </TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"GST No"}
              </TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"Contact Person"}
              </TableHeadCell>
              <TableHeadCell variant="leftAlign" classNames="Theader">
                {"Contact Detail"}
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

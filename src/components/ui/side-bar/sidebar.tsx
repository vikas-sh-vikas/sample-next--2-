const menuData = [
  {
    title: "Home",
    path: "/dashboard",
    icon: "FaHome",
    children: [],
  },
  {
    title: "Item",
    path: "/dashboard/items",
    icon: "FaSitemap",
    children: [],
  },
  {
    title: "Customer / Vendor",
    path: "/dashboard/customer-vendor",
    icon: "FaShoppingBag",
    children: [],
  },
  {
    title: "Sales",
    // path: "/dashboard/sale",
    icon: "FaFileInvoiceDollar",
    children: [
      {
        title: "Invoice",
        path: "/dashboard/sales/invoice",
        icon: "FaBuilding",
        children: [],
      },
      {
        title: "Receipt",
        path: "/dashboard/sales/receipt",
        icon: "FaBuilding",
        children: [],
      },
    ],
  },
  {
    title: "Purchase",
    // path: "/dashboard/purchase",
    icon: "FaCartPlus",
    children: [
      {
        title: "Bill",
        path: "/dashboard/purchase/bill",
        icon: "FaBuilding",
        children: [],
      },
      {
        title: "Payment",
        path: "/dashboard/purchase/payment",
        icon: "FaBuilding",
        children: [],
      },
    ],
  },
  {
    title: "Banking",
    path: "/dashboard/banking",
    icon: "FaRegBuilding",
    children: [],
  },
  {
    title: "Configuration",
    // path: "/dashboard/purchase",
    icon: "FaCartPlus",
    children: [
      {
        title: "GST-Type",
        path: "/dashboard/config/gst-types",
        icon: "FaBuilding",
        children: [],
      },
      {
        title: "Units",
        path: "/dashboard/config/units",
        icon: "FaBuilding",
        children: [],
      },
    ],
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: "FaUser",
    children: [],
  },
  {
    title: "Logout",
    path: "/logout",
    icon: "FaSignOutAlt",
    children: [],
  },
];
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBagShopping, FaTimeline } from "react-icons/fa6";
import {
  FaBuilding,
  FaFile,
  FaFileInvoiceDollar,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaSitemap,
  FaShoppingBag,
  FaCartPlus,
  FaRegBuilding,
} from "react-icons/fa";
import { IconType } from "react-icons";

// Mapping of icon names to actual icon components
const iconMapping: { [key: string]: IconType } = {
  FaHome: FaHome,
  FaBuilding: FaBuilding,
  FaFileInvoiceDollar: FaFileInvoiceDollar,
  FaBagShopping: FaBagShopping,
  FaUser: FaUser,
  FaSignOutAlt: FaSignOutAlt,
  FaSitemap: FaSitemap,
  FaShoppingBag: FaShoppingBag,
  FaCartPlus: FaCartPlus,
  FaRegBuilding: FaRegBuilding,
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
    setIsOpen(false); // Close sidebar after navigation
  };

  // Toggle expand/collapse for a menu item
  const toggleExpand = (title: string) => {
    setExpanded((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Recursive component to handle child items
  const renderMenuItems = (items: any[]) => {
    return items?.map((item, index) => {
      const IconComponent = iconMapping[item.icon as keyof typeof iconMapping]; // Ensure correct key type
      const isItemExpanded = expanded[item.title];

      return (
        <li key={index}>
          <button
            onClick={() => {
              if (item.children && item.children.length > 0) {
                toggleExpand(item.title); // Toggle expand/collapse if the item has children
              } else {
                navigate(item.path);
              }
            }}
            className="flex items-center w-full text-left p-2 rounded hover:bg-gray-100"
          >
            <IconComponent className="mr-2" />
            {item.title}
            {item.children && item.children.length > 0 && (
              <span className="ml-auto">{isItemExpanded ? "−" : "+"}</span>
            )}
          </button>
          {item.children && item.children.length > 0 && isItemExpanded && (
            <ul className="ml-4">{renderMenuItems(item.children)}</ul>
          )}
        </li>
      );
    });
  };

  return (
    <>
      {/* Toggle button for small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-800 text-white sm:hidden"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed sm:relative w-full h-screen bg-white text-gray-800 flex flex-col transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform`}
      >
        <div className="text-center p-6 text-2xl font-bold border-b border-gray-200">
          Sidebar Menu
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">{renderMenuItems(menuData)}</ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

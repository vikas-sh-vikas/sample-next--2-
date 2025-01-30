"use client";

import useDrawer from "@/hooks/useDrawer";
import React from "react";
import { DrawerOpen } from "@/state/drawer/slice";
import { useRouter } from "next/navigation";
import SideBar from "../side-bar/sidebar";
import useUser from "@/hooks/useUser";
import { FaBars } from "react-icons/fa";
import { Button } from "@/components/ui/button/button";
import AuthUtil from "@/utils/auth";
import Utils from "@/utils";
import Image from "next/image"; // Import the Image component

function Header() {
  const { user } = useUser();
  const { onShowDrawer } = useDrawer();
  const router = useRouter();

  const onHandleAdd = () => {
    const drawerWidth = "20%";
    onShowDrawer({
      dimmer: true,
      width: drawerWidth,
      name: "Show Drawer Form",
      Component: () => <SideBar />,
      position: DrawerOpen.left,
    });
  };

  function logout() {
    AuthUtil.logout();
    Utils.redirectUrl(`/auth/login`);
  }

  return (
    <nav className="bg-indigo-600 p-3 flex justify-between items-center">
      <button className="text-white md" onClick={onHandleAdd}>
        <FaBars className="w-6 h-6" />
      </button>
      <div className="relative flex items-center space-x-4">
        {/* Use next/image for the logo */}
        <Image
          src="/logo.png"
          alt="Profile"
          width={40} // Explicitly specify width
          height={40} // Explicitly specify height
          className="rounded-full"
        />
        <div className="hidden md:block text-white">{user?.name}</div>
        <Button size="small" onClick={logout} variant="red">
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default Header;

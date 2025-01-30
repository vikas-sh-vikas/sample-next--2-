"use client";
import Header from "@/components/ui/header/header";
import React from "react";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <div className="min-h-screen">
    //   <Header />
    //   <div className="bg-indigo-50 p-10">{children}</div>
    // </div>
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-indigo-50 p-10 flex-grow">{children}</div>
    </div>
  );
}

export default layout;

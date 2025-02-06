"use client";
import React, { useEffect } from "react";
import useToast from "@/hooks/useToast";

type ToastProps = {
  time: number;
};

export default function ToastContainer(props: ToastProps) {
  let { time = 3000 } = props;
  const {
    showToast,
    closeToast,
    onCloseToast,
    position,
    content,
    title,
    type,
  } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseToast();
    }, time);
    return () => clearTimeout(timer);
  }, [showToast, time]);
  if (!showToast) return <></>;

  const positionClasses = {
    leftBottom: "bottom-0 left-0 flex-col",
    rightBottom: "bottom-0 right-0 flex-col",
    leftTop: "top-0 left-0",
    rightTop: "top-0 right-0",
  };

  const typeClasses = {
    error: "bg-red-600 text-white w-4/5",
    success: "bg-green-500 text-white w-4/5",
    info: "bg-blue-300 text-black",
  };

  return (
    <div
      className={`fixed flex items-center p-5 w-1/3 z-[1000] animate-popup ${positionClasses[position]}`}
    >
      <div
        className={`bg-aqua text-white p-5 w-full rounded-lg flex items-center justify-center gap-3 mb-8 ${typeClasses[type]}`}
      >
        <div className="flex flex-col justify-center text-xl">{title}</div>
        <div>{content}</div>
      </div>
    </div>
  );
}

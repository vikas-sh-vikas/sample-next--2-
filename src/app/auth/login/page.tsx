"use client";

import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaCheck, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/context";
import useToast from "@/hooks/useToast";
import { ToastOpen, ToastType } from "@/state/toast/slice";
import { FormInput } from "@/components/ui/form/form-input";
import { Button } from "@/components/ui/button/button";
import useFetch from "@/hooks/useFetch";
import { ApiSignin } from "@/utils/api.constant";
import { eResultCode } from "@/utils/enum";
import AuthUtil from "@/utils/auth";
import Utils from "@/utils";
import { Routes } from "@/utils/constants";
import EncryptUtils from "@/utils/encrypt";

export default function Login() {
  const router = useRouter();
  const { post } = useFetch();
  const { showToast, onShowToast } = useToast();

  const [toggle, setToggle] = useState(false);
  const userData = useContext(UserContext);
  const { DOMAIN } = process.env;
  const cookieStorePath = `${DOMAIN || "/"}`;
  const defaultOptions = {
    path: cookieStorePath,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };
  const defaultValues: Inputs = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      console.log("Data", data);
      setToggle(true);
      const payload = {
        userName: data.email,
        // loginMode: 1,
        password: EncryptUtils.encrypt(data.password),
      };
      const response = await post(ApiSignin, payload);

      if (response.dataResponse.returnCode == eResultCode.SUCCESS) {
        {
          // console.log(response);
          onShowToast({
            type: ToastType.success,
            title: <FaCheck />,
            position: ToastOpen.leftBottom,
            content: response.dataResponse.description,
          });

          setTimeout(() => {
            AuthUtil.setToken(response.authToken);
            Utils.redirectUrl(Routes.Dashboard);
          }, 700);
          setToggle(false);
        }

        // cookie.save("accessToken", authToken, defaultOptions);
        // router.push(`/dashboard`);
      } else {
        onShowToast({
          type: ToastType.error,
          title: <FaTimes />,
          position: ToastOpen.leftBottom,
          content: response.dataResponse.description,
        });
        setToggle(false);
      }
    } catch (error: any) {
      onShowToast({
        type: ToastType.error,
        title: <FaTimes />,
        position: ToastOpen.leftBottom,
        content: "error",
      });
      setToggle(false);
    }
  };

  return (
    <div className="bg-slate-200 grid grid-cols-2 p-4 sm:p-10 lg:p-20 min-h-screen">
      <div className="bg-white rounded-xl  col-span-2 lg:col-span-1">
        <form
          className="flex flex-col justify-between h-full m-auto  p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <h1 className="text-4xl font-bold text-center p-5 text-gray-500">
              Login
            </h1>
            <div className="flex flex-col p-4">
              <FormInput
                label={"Email/Username"}
                error={errors.email?.message}
                isRequired={true}
                name="email"
                length={"full"}
                register={register}
                placeholder={"Enter email/username"}
                onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
              ></FormInput>
            </div>
            <div className="flex flex-col p-4">
              <FormInput
                type="password"
                label={"Password"}
                error={errors.password?.message}
                isRequired={true}
                name="password"
                length={"full"}
                disabled={false}
                password
                register={register}
                placeholder={"Enter Password"}
                onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
              ></FormInput>
            </div>
            <p className="p-4 text-gray-500">
              {"new user "}
              <span className="text-gray-700 font-bold">
                <Link href="/auth/register">Sign Up</Link>
              </span>
            </p>
          </div>
          <div className="text-center p-4">
            <Button
              type="submit"
              variant={"blue"}
              className="w-full p-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg"
            >
              {toggle ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 inline"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                </svg>
              ) : null}
              {toggle ? "Loading...." : "Log In"}
            </Button>
            <p className="p-4 text-gray-800">
              <Link href="/auth/forgotpassword">forgot your password ?</Link>
            </p>
          </div>
        </form>
      </div>
      <div className="hidden lg:block bg-[url('/login.jpg')] bg-cover bg-center bg-no-repeat h-full w-full"></div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useToast from "@/hooks/useToast";
import { ToastOpen, ToastType } from "@/state/toast/slice";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FormInput } from "@/components/ui/form/form-input";
import EncryptUtils from "@/utils/encrypt";
import { AddEditUser } from "@/utils/api.constant";
import { eResultCode } from "@/utils/enum";
import useFetch from "@/hooks/useFetch";

type Inputs = {
  email: string;
  fullName: string;
  mobileNo: string;
  password: string;
  confirmPassword?: string;
  avatar?: string;
  coverImage?: string;
};

export default function Login() {
  const { post } = useFetch();
  const [toggle, setToggle] = useState(false);
  const { onShowToast } = useToast();
  const defaultValues: Inputs = {
    email: "",
    mobileNo: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  };
  const router = useRouter();
  const validationSchema = yup.object({
    email: yup.string().required("email is required"),
    mobileNo: yup.string().required("Mobile no is required"),
    fullName: yup.string().required("fullname is required"),
    password: yup.string().required("password is required"),
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
    console.log("Data", data);
    // setIsLoading(true);
    try {
      const payload = {
        data: {
          displayName: data.fullName,
          mobileNo: data.mobileNo,
          emailId: data.email,
          username: data.email,
          password: EncryptUtils.encrypt(data.password),
        },
      };
      const response = await post(AddEditUser, payload);
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
        router.push("/auth/login");
        // setIsAccountCreated(true);
        reset();
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
      // setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-200 grid grid-cols-2 p-20 min-h-screen">
      <div className="bg-white rounded-xl">
        <form className="m-auto p-8" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-4xl font-bold text-center p-5 text-gray-500">
            Register
          </h1>
          <div className="flex flex-col p-4">
            <FormInput
              type="text"
              label={"Email"}
              error={errors.email?.message}
              isRequired={true}
              name="email"
              length={"full"}
              disabled={false}
              register={register}
              placeholder={"Enter email"}
              onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
            ></FormInput>
          </div>
          <div className="flex flex-col p-4">
            <FormInput
              type="text"
              label={"Full Name"}
              error={errors.fullName?.message}
              isRequired={true}
              name="fullName"
              length={"full"}
              disabled={false}
              register={register}
              placeholder={"Enter fullName"}
              onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
            ></FormInput>
          </div>
          <div className="flex flex-col p-4">
            <FormInput
              type="text"
              label={"Mobile No"}
              error={errors.mobileNo?.message}
              isRequired={true}
              name="mobileNo"
              length={"full"}
              disabled={false}
              register={register}
              placeholder={"Enter mobile no"}
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
              register={register}
              placeholder={"Enter password"}
              onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
            ></FormInput>
          </div>
          <div className="flex flex-col p-4">
            <FormInput
              type="password"
              label={"Confirm Password"}
              error={errors.password?.message}
              isRequired={true}
              name="confirmPassword"
              length={"full"}
              disabled={false}
              register={register}
              placeholder={"Enter password"}
              onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
            ></FormInput>
          </div>
          <div className="flex flex-col p-4">
            <label className="text-xl pb-2 text-gray-500">
              Profile Picture
            </label>
            <input {...register("avatar")} type="file" />
          </div>
          <div className="text-center p-4">
            <button
              type="submit"
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
            </button>
            <p className="p-4 text-gray-500">
              {"already have an account "}
              <span className="text-gray-700 font-bold">
                <Link href="/auth/login">Log In</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
      <div className="bg-[url('/login.jpg')] bg-cover bg-center bg-no-repeat h-full w-full"></div>
    </div>
  );
}

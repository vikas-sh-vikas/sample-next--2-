"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { FormInput } from "@/components/ui/form/form-input";
import { ApiSignin, ResetPassword } from "@/utils/api.constant";
import useFetch from "@/hooks/useFetch";
import { eResultCode } from "@/utils/enum";
import useToast from "@/hooks/useToast";
import { ToastOpen, ToastType } from "@/state/toast/slice";
import { FaCheck, FaTimes } from "react-icons/fa";

function Forgotpassword() {
  const [toggle, setToggle] = useState(false);
  const {post} = useFetch();
  const {onShowToast} = useToast();
  const defaultValues: ForgotPasswordInputs = {
    registerEmail: "",
  };
  const validationSchema = yup.object({
    registerEmail: yup.string().required("Email is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInputs>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    try {
      console.log("Data", data);
      setToggle(true);
      const payload = {
        data:{
          emailId: data.registerEmail,
        }
      };
      const response = await post(ResetPassword, payload);

      if (response.dataResponse.returnCode == eResultCode.SUCCESS) {
        {
          // console.log(response);
          onShowToast({
            type: ToastType.success,
            title: <FaCheck />,
            position: ToastOpen.leftBottom,
            content: response.dataResponse.description,
          });

          // setTimeout(() => {
          //   AuthUtil.setToken(response.authToken);
          //   Utils.redirectUrl(Routes.Dashboard);
          // }, 700);
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
    <div className="bg-slate-200 grid grid-cols-2 p-20 min-h-screen">
      <div className="bg-white rounded-xl">
        <form
          className="flex flex-col justify-between h-full m-auto  p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <h1 className="text-4xl font-bold text-center p-5 text-gray-500">
              Reset Password
            </h1>
            <div className="flex flex-col p-4">
              {/* <label className="text-xl pb-2 text-gray-500">Email</label>
              <Input
                className="p-2 text-xl border-solid border-2 bg-white border-indigo-100"
                placeholder="Enter Email"
                error={errors.registerEmail?.message}
                name="registerEmail"
                register={register}
                type="text"
              ></Input> */}
              <FormInput
                type="text"
                label={"Register Email"}
                error={errors.registerEmail?.message}
                isRequired={true}
                name="registerEmail"
                length={"full"}
                disabled={false}
                register={register}
                placeholder={"Enter register Email"}
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
              {toggle ? "Loading...." : "Set Password"}
            </button>
          </div>
        </form>
      </div>
      <div className="bg-[url('/login.jpg')] bg-cover bg-center bg-no-repeat h-full w-full"></div>
    </div>
  );
}

export default Forgotpassword;

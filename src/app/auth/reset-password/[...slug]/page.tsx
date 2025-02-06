"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput } from "@/components/ui/form/form-input";
import { Button } from "@/components/ui/button/button";
import useFetch from "@/hooks/useFetch";
import useToast from "@/hooks/useToast";
import { ToastOpen, ToastType } from "@/state/toast/slice";
import { FaCheck, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { differenceInSeconds } from "date-fns";
import EncryptUtils from "@/utils/encrypt";
import Image from "next/image";
import { ChangeResetPassword } from "@/utils/api.constant";

export default function ResetPassword() {
  const params = useParams();
  const router = useRouter();
  const { post } = useFetch();
  const { onShowToast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [time, setTime] = useState("");

  const validationSchema = yup.object({
    newPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .matches(/[0-9]+/, "Password must contain at least one number")
      .matches(/[A-Z]+/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]+/, "Password must contain at least one lowercase letter")
      .matches(
        /[!@#$%^&*()_+=\[\]{};:<>|./?,-]+/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Confirm password must match password")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    // resolver: yupResolver(validationSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });
  useEffect(() => {
    if (params?.slug) {
      
      const [emailHex, timeHex] = params.slug;
      console.log("object",emailHex)
      const emailDecrypted = EncryptUtils.decrypt(convertHexToString(emailHex));
      const timeDecrypted = EncryptUtils.decrypt(convertHexToString(timeHex));
      
      setEmailId(emailDecrypted);
      setTime(timeDecrypted);
      console.log("emailDecrypted",emailDecrypted)
    }
  }, [params]);

  const convertHexToString = (hex: string) => {
    if (!hex || typeof hex !== "string" || hex.length % 2 !== 0) {
      return "";
    }
    let str = "";
    for (let i = 0; i < hex.length; i += 2) {
      const charCode = parseInt(hex.substr(i, 2), 16);
      if (charCode) str += String.fromCharCode(charCode);
    }
    return str;
  };

  const onSubmit: SubmitHandler<any> = async (values) => {
    const providedTime = new Date(time);
    const currentTime = new Date();
    const difference = differenceInSeconds(currentTime, providedTime);

    if (difference >= 600) {
      onShowToast({
        type: ToastType.error,
        title: <FaTimes />,
        position: ToastOpen.leftBottom,
        content: "Link is expired. Generate a new link.",
      });
      return;
    }

    const payload = {
      data: {
        emailId: emailId,
        password: EncryptUtils.encrypt(values.newPassword),
        // isTempPassword: 1,
      },
    };

    try {
      setIsSubmitting(true);
      const response = await post(ChangeResetPassword, payload); // Use the proper API endpoint
      const { description, returnCode } = response?.dataResponse;

      if (returnCode === 0) {
        onShowToast({
          type: ToastType.success,
          title: <FaCheck />,
          position: ToastOpen.leftBottom,
          content: description,
        });
        setPasswordChanged(true);
      } else {
        onShowToast({
          type: ToastType.error,
          title: <FaTimes />,
          position: ToastOpen.leftBottom,
          content: description,
        });
      }
    } catch (error) {
      onShowToast({
        type: ToastType.error,
        title: <FaTimes />,
        position: ToastOpen.leftBottom,
        content: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-200 grid grid-cols-2 p-20 min-h-screen">
      {passwordChanged ? (
        <div className="bg-white rounded-xl flex flex-col justify-center items-center p-8">
          <Image
            src="/assets/images/success.svg"
            alt="Success"
            width={60}
            height={60}
          />
          <span className="text-center text-gray-700 text-lg font-semibold mt-4">
            Your password has been updated successfully!
          </span>
          <Link href="/auth/login" className="text-indigo-500 font-bold mt-4">
            Go to Login
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-4xl font-bold text-center text-gray-500 mb-4">
              Reset Password
            </h1>
            <FormInput
              label="New Password"
              error={errors.newPassword?.message}
              name="newPassword"
              type="password"
              length={"full"}
              placeholder="Enter new password"
              register={register}
            />
            <FormInput
              label="Confirm Password"
              error={errors.confirmPassword?.message}
              name="confirmPassword"
              type="password"
              length={"full"}
              placeholder="Confirm your password"
              register={register}
            />
            <Button
              type="submit"
              variant="blue"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Change Password"}
            </Button>
          </form>
        </div>
      )}
      <div className="bg-[url('/login.jpg')] bg-cover bg-center bg-no-repeat h-full w-full"></div>
    </div>
  );
}

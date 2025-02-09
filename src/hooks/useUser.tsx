"use client";

import { useEffect, useState } from "react";
import cookie from "react-cookies";
import useToast from "@/hooks/useToast";
import useFetch from "./useFetch";
import { GetSpecificUserMasterData } from "@/utils/api.constant";
import { eResultCode } from "@/utils/enum";
import { ToastOpen, ToastType } from "@/state/toast/slice";
import { FaCheck, FaTimes } from "react-icons/fa";
import Utils from "@/utils";
import AuthUtil from "@/utils/auth";


const useUser = (): UserState => {
  const { post } = useFetch();
  const { onShowToast } = useToast();

  const token = AuthUtil.isTokenExist();

  // const token = cookie.load("YFqeXsmp3fNnNxIs");
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    photo: "",
  });
  useEffect(() => {
    init();
  }, [token]);

  function init() {
    if (token) {
      fetchData1();
    }
  }
  const fetchData1 = async () => {
    // setIsLoading(true);
    try {
      const requestPayload = {
        data: {
          id: 36,
        },
      };
      const response = await post(GetSpecificUserMasterData, requestPayload);
      if (response.dataResponse.returnCode == eResultCode.SUCCESS) {
        console.log("API Responce");
        const { displayName, emailId } = response.data[0];
        setUser({
          name: displayName,
          email: emailId,
          photo: "",
        });
      } else {
        onShowToast({
          type: ToastType.error,
          title: <FaCheck />,
          position: ToastOpen.leftBottom,
          content: "Authentication Failed",
        });
        console.error("Failed to fetch user data:", response.statusText);
      }
    } catch (err: any) {
      console.log("Error", err);
      onShowToast({
        type: ToastType.error,
        title: <FaTimes />,
        position: ToastOpen.leftBottom,
        content: err,
      });
    }
  };

  const updateUserState = (newUser: User) => {
    setUser(newUser);
  };

  return { user, updateUserState };
};

export default useUser;

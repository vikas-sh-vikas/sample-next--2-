"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput } from "@/components/ui/form/form-input";
import { Button } from "@/components/ui/button/button";
import useDrawer from "@/hooks/useDrawer";
import useToast from "@/hooks/useToast";
import { FaCheck, FaTimes } from "react-icons/fa";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import {
  AddEditUserBank,
  GetSpecificUserBankMasterData,
} from "@/utils/api.constant";
import { eResultCode } from "@/utils/enum";
import { ToastOpen, ToastType } from "@/state/toast/slice";
import Loader from "@/components/ui/loader/loader";

export type DrawerProps = {
  isOpen?: any;
  onClose?: any;
  id: any;
};

type RefreshListFunction = () => void;

const BankForm = (
  props: DrawerProps & {
    onRefreshList: RefreshListFunction;
  }
) => {
  const { onCloseDrawer } = useDrawer();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: UserBankModel = {
    id: 0,
    bankName: "",
    accountNumber: "",
    branchName: "",
    address: "",
    ifscCode: "",
    currentAmount: "",
    initialAmount: "",
    accountType: "",
  };
  const { onShowToast } = useToast();
  const { post } = useFetch();

  const validationSchema = yup.object({
    bankName: yup.string().required("Bank name is required"),
    accountNumber: yup.string().required("Account number is required"),
    branchName: yup.string().required("Branch name is required"),
    address: yup.string().required("Address is required"),
    ifscCode: yup.string().required("IFSC code is required"),
    currentAmount: yup.string().required("Current amount is required"),
    initialAmount: yup.string().required("Initial amount is required"),
    accountType: yup.string().required("Account type is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<UserBankModel>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (props.id > 0) {
      getSpecificData(props.id);
    }
  }, []);
  const getSpecificData = async (id: number) => {
    setIsLoading(true)
    try {
      const payload = {
        data: {
          id: id,
        },
      };
      const response = await post(GetSpecificUserBankMasterData, payload);
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
        const formData = response.data[0];

        reset({
          ...formData,
        });
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
      setIsLoading(false);
    }
  };
  const onSubmit: SubmitHandler<UserBankModel> = async (
    values: UserBankModel
  ) => {
    try {
      const payload = {
        data: {
          ...values,
        },
      };
      const response = await post(AddEditUserBank, payload);
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
        // onCloseDrawer();
        // router.push("/dashboard/customer-vendor");
        // setIsAccountCreated(true);
        // reset();
      } else {
        onShowToast({
          type: ToastType.error,
          title: <FaTimes />,
          position: ToastOpen.leftBottom,
          content: description,
        });
        reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
      props.onRefreshList();
      onCloseDrawer();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full flex flex-col justify-between w-full mx-auto p-6 bg-white"
    >
      {/* Submit Section */}


      <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Bank Details</h2>
      <hr className="mb-5"></hr>

        <div>
          {isLoading ? (
            <Loader size={"35"} className="text-indigo-600" />
          ) : (
            <div>
      {/* Bank Details Section */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <FormInput
            type="text"
            label="Bank Name"
            length={"full"}
            error={errors.bankName?.message}
            isRequired={true}
            name="bankName"
            register={register}
            placeholder="Enter Bank Name"
          />
        </div>
        <div>
          <FormInput
            type="text"
            label="Account Number"
            length={"full"}
            error={errors.accountNumber?.message}
            isRequired={true}
            name="accountNumber"
            register={register}
            placeholder="Enter Account Number"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <FormInput
            type="text"
            label="Branch Name"
            length={"full"}
            error={errors.branchName?.message}
            isRequired={true}
            name="branchName"
            register={register}
            placeholder="Enter Branch Name"
          />
        </div>
        <div>
          <FormInput
            type="text"
            label="Address"
            length={"full"}
            error={errors.address?.message}
            isRequired={true}
            name="address"
            register={register}
            placeholder="Enter Address"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <FormInput
            type="text"
            length={"full"}
            label="IFSC Code"
            error={errors.ifscCode?.message}
            isRequired={true}
            name="ifscCode"
            register={register}
            placeholder="Enter IFSC Code"
          />
        </div>
        <div>
          <FormInput
            type="text"
            label="Current Amount"
            length={"full"}
            error={errors.currentAmount?.message}
            isRequired={true}
            name="currentAmount"
            register={register}
            placeholder="Enter Current Amount"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <FormInput
            type="text"
            label="Initial Amount"
            length={"full"}
            error={errors.initialAmount?.message}
            isRequired={true}
            name="initialAmount"
            register={register}
            placeholder="Enter Initial Amount"
          />
        </div>
        <div>
          <FormInput
            type="text"
            length={"full"}
            label="Account Type"
            error={errors.accountType?.message}
            isRequired={true}
            name="accountType"
            register={register}
            placeholder="Enter Account Type"
          />
        </div>
      </div>
      </div>
          )}{" "}
        </div>
      </div>
      <div>

<div className="flex space-x-4 justify-end py-4">
  <Button type="submit" variant="blue">
    Submit
  </Button>
  <Button variant="grey" onClick={onCloseDrawer}>
    Cancel
  </Button>
</div>
</div>
    </form>
  );
};

export default BankForm;

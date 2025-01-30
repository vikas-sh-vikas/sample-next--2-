"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput } from "@/components/ui/form/form-input";
import { Button } from "@/components/ui/button/button";
import useDrawer from "@/hooks/useDrawer";
import { FormDropdown } from "@/components/ui/form/form-dropdown";

export type DrawerProps = {
  isOpen?: any;
  onClose?: any;
  id: any;
};

type RefreshListFunction = () => void;

const VoucherForm = (
  props: DrawerProps & {
    onRefreshList: RefreshListFunction;
  }
) => {
  const { onCloseDrawer } = useDrawer();
  const defaultValues = {
    voucherNo: "",
    date: "",
    bankCashName: {
      value: "",
      label: "",
    },
    amount: 0,
    paymentMode: {
      value: "",
      label: "",
    },
    billNo: "",
    description: "",
  };
  const bankOptions = [
    {
      value: "",
      label: "",
    },
  ];
  const validationSchema = yup.object({
    voucherNo: yup.string().required("Voucher No. is required"),
    date: yup.string().required("Date is required"),
    bankCashName: yup.object().shape({
      label: yup.string().required("Bank required"),
      value: yup.string().required("Bank required"),
    }),
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .required("Amount is required")
      .positive("Amount must be positive"),
    paymentMode: yup.object().shape({
      label: yup.string().required("Mode required"),
      value: yup.string().required("Mode required"),
    }),
    billNo: yup.string().required("Bill No. is required"),
    description: yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const formValues = getValues();

  const onSubmit: SubmitHandler<any> = async (values) => {
    console.log("Submitted values", values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Receipt Voucher Details
      </h2>
      <hr className="mb-5"></hr>

      {/* Voucher Details Section */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <FormInput
            type="text"
            label="Voucher No."
            error={errors.voucherNo?.message}
            isRequired={true}
            length={"full"}
            name="voucherNo"
            register={register}
            placeholder="Enter Voucher No."
          />
        </div>
        <div>
          <FormInput
            type="date"
            label="Date"
            error={errors.date?.message}
            isRequired={true}
            length={"full"}
            name="date"
            register={register}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <FormInput
            type="text"
            label="Bill No."
            error={errors.billNo?.message}
            isRequired={true}
            length={"full"}
            name="billNo"
            register={register}
            placeholder="Enter Bill No."
          />
        </div>
        <div>
          <FormDropdown
            isRequired={true}
            label={"Bank Name"}
            name="bankCashName"
            error={errors.bankCashName?.value?.message}
            placeholder="Type Here To Search"
            options={bankOptions}
            value={formValues.bankCashName.label}
            onChange={(selected: any) => {
              setValue(`bankCashName.value`, selected.value, {
                shouldValidate: true,
              });
              setValue(`bankCashName.label`, selected.label, {
                shouldValidate: true,
              });
            }}
            className="large"
          ></FormDropdown>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <FormInput
            type="number"
            label="Amount"
            error={errors.amount?.message}
            isRequired={true}
            length={"full"}
            name="amount"
            register={register}
            placeholder="Enter Amount"
          />
        </div>
        <div>
          <FormDropdown
            isRequired={true}
            label={"Payment Mode"}
            name="paymentMode"
            error={errors.paymentMode?.value?.message}
            placeholder="Type Here To Search"
            options={bankOptions}
            value={formValues.paymentMode.label}
            onChange={(selected: any) => {
              setValue(`paymentMode.value`, selected.value, {
                shouldValidate: true,
              });
              setValue(`paymentMode.label`, selected.label, {
                shouldValidate: true,
              });
            }}
            className="large"
          ></FormDropdown>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-6">
        <div>
          <FormInput
            type="text"
            label="Description"
            error={errors.description?.message}
            isRequired={true}
            length={"full"}
            name="description"
            register={register}
            placeholder="Enter Description"
          />
        </div>
      </div>

      {/* Submit Section */}
      <div className="mt-6 flex space-x-4">
        <Button type="submit" variant="blue">
          Submit
        </Button>
        <Button variant="grey" onClick={onCloseDrawer}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default VoucherForm;

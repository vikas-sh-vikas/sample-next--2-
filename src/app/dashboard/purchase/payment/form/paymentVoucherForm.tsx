"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput } from "@/components/ui/form/form-input";
import { Button } from "@/components/ui/button/button";
import useDrawer from "@/hooks/useDrawer";
import { FormDropdown } from "@/components/ui/form/form-dropdown";
import PickDate from "@/components/ui/date-picker/date-picker";
import useFetch from "@/hooks/useFetch";
import { eResultCode } from "@/utils/enum";
import { AddEditReceipt, GetInvoiceList, GetSpecificReceiptMasterData, GetUserBankList } from "@/utils/api.constant";
import useToast from "@/hooks/useToast";
import { ToastOpen, ToastType } from "@/state/toast/slice";
import { FaCheck, FaTimes } from "react-icons/fa";

export type DrawerProps = {
  isOpen?: any;
  onClose?: any;
  id: any;
};

type RefreshListFunction = () => void;

const PaymentVoucherForm = (
  props: DrawerProps & {
    onRefreshList: RefreshListFunction;
  }
) => {
  const { post } = useFetch();
  const [billOptions,setBillOptions] = useState([]);
  const [bankOptions,setBankOptions] = useState([]);
  const [modeOfPaymentOptions,setModeOfPaymentOptions] = useState([
    {label:"Cash",
      value:1
    },
    {label:"Bank",
      value:2
    },
  ]);
  const {onShowToast} =useToast();
  const { onCloseDrawer } = useDrawer();
  const defaultValues = {
    voucherNo: "",
    date: "",
    bankDetail: {
      value: "",
      label: "",
    },
    amount: 0,
    paymentMode: {
      value: "",
      label: "",
    },
    billDetail: {
      value: "",
      label: "",
    },
    description: "",
  };
  const validationSchema = yup.object({
    voucherNo: yup.string().required("Voucher No. is required"),
    date: yup.string().required("Date is required"),
    bankDetail: yup.object().shape({
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
    billDetail: yup.object().shape({
      label: yup.string().required("Bill required"),
      value: yup.string().required("BIll required"),
    }),
    description: yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const formValues = getValues();
  useEffect(() => {
    const fetchData = async () => {
      await getInvoiceList(1, "", 10,"BILL");
      await getBankList(1, "", 10);
      if(props.id){
        await getSpecificData(props.id)
      }
    }
    fetchData();
  }, []);


  const getInvoiceList = async (
    currentPage: number,
    searchText: string,
    pageSize: number,
    type: string
  ) => {
    // setIsLoading(true);
    try {
      const payload = {
        data: {
          currentPage: currentPage,
          searchText: searchText,
          pageSize: pageSize,
          type: type,
        },
      };
      const response = await post(GetInvoiceList, payload);
      const { dataResponse } = response;
      const { returnCode, description } = dataResponse;
      if (returnCode == eResultCode.SUCCESS) {
        // setIsLoading(false);
        const data = await response.data;
        onShowToast({
          type: ToastType.success,
          title: <FaCheck />,
          position: ToastOpen.leftBottom,
          content: description,
        });
        setBillOptions(
          data.map((item:any) => ({
            label: item.invoiceNumber + ` (${item.billToName})`,
            value: item.id,
          }))
        );
        // console.log("DtaResponce", response.data);
        // setData(data);
        // setFilterRowsCount(data.length); // Assuming the length is the total rows count
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
  const getBankList = async (
    currentPage: number,
    searchText: string,
    pageSize: number
  ) => {
    // setIsLoading(true);
    try {
      const payload = {
        data: {
          currentPage: currentPage,
          searchText: searchText,
          pageSize: pageSize,
        },
      };
      const response = await post(GetUserBankList, payload);
      const { dataResponse } = response;
      const { returnCode, description } = dataResponse;
      if (returnCode == eResultCode.SUCCESS) {
        // setIsLoading(false);
        const data = await response.data;
        onShowToast({
          type: ToastType.success,
          title: <FaCheck />,
          position: ToastOpen.leftBottom,
          content: description,
        });
        setBankOptions(
          data.map((item:any) => ({
            label: item.bankName,
            value: item.id,
          }))
        );
        // console.log("DtaResponce", response.data);
        // setData(data);
        // setFilterRowsCount(data.length); // Assuming the length is the total rows count
      } else {
        onShowToast({
          type: ToastType.error,
          title: <FaTimes />,
          position: ToastOpen.leftBottom,
          content: description,
        });
      }
    } catch (error) {
      console.log(error);``
    } finally {
      // setIsLoading(false);
    }
  };
  const getSpecificData = async (
    id: number
  ) => {
    // setIsLoading(true);
    try {
      const payload = {
        data: {
          id: id,
        },
      };
      const response = await post(GetSpecificReceiptMasterData, payload);
      const { dataResponse } = response;
      const { returnCode, description } = dataResponse;
      if (returnCode == eResultCode.SUCCESS) {
        // setIsLoading(false);
        const data = await response.data;
        onShowToast({
          type: ToastType.success,
          title: <FaCheck />,
          position: ToastOpen.leftBottom,
          content: description,
        });
        console.log("Data-------->",data)
        reset({
          date: data.date,
          voucherNo: data.voucherNo,
          amount: data.amount,
          description: data.description,
          billDetail: {  value: data.billId }, // Correctly
          paymentMode: {  value: data.paymentModeId }, // Correctly
          bankDetail: {  value: data.bankId } // Correctly
        });        
        setBankOptions(
          data.map((item:any) => ({
            label: item.bankName,
            value: item.id,
          }))
        );
        // console.log("DtaResponce", response.data);
        // setData(data);
        // setFilterRowsCount(data.length); // Assuming the length is the total rows count
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
  console.log("FormValues=============>",formValues)
  const onSubmit: SubmitHandler<any> = async (values) => {
    console.log("Submitted values", values);
        try {
          const payload = {
            data: {
              id:props.id ?? 0,
              date: new Date(values.date),
              amount:values.amount,
              description: values.description,
              voucherNo:values.voucherNo,
              billId:values.billDetail.value,
              paymentModeId: values.paymentMode.value,
              bankId: values.bankDetail.value,
              type: "PAYMENT",

            },
          };
          const response = await post(AddEditReceipt, payload);
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
            // router.push("/dashboard/sales/invoice");
            // setIsAccountCreated(true);
            onCloseDrawer();
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full flex flex-col justify-between w-full mx-auto p-6 bg-white"
    >
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Payment Voucher Details
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
            {/* <FormInput
              type="date"
              label="Date"
              error={errors.date?.message}
              isRequired={true}
              length={"full"}
              name="date"
              register={register}
            /> */}
            <PickDate
              dateFormat="dd-MMM-yyyy"
              placeholderText={"Select Date"}
              maxDate={new Date()}
              name="date"
              error={errors.date?.message}
              label={"Date"}
              selected={formValues.date}
              onChange={(selected: any) => {
                setValue(`date`, selected, {
                  shouldValidate: true,
                });
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <FormDropdown
              isRequired={true}
              label={"Bill Ref."}
              name="billId"
              error={errors.billDetail?.value?.message}
              placeholder="Type Here To Search"
              options={billOptions}
              value={formValues.billDetail.value}
              onChange={(selected: any) => {
                setValue(`billDetail.value`, selected.value, {
                  shouldValidate: true,
                });
                setValue(`billDetail.label`, selected.label, {
                  shouldValidate: true,
                });
              }}
              className="large"
            ></FormDropdown>
          </div>
          <div>
            <FormDropdown
              isRequired={true}
              label={"Payment Mode"}
              name="paymentMode"
              error={errors.paymentMode?.value?.message}
              placeholder="Type Here To Search"
              options={modeOfPaymentOptions}
              value={formValues.paymentMode.value}
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

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <FormDropdown
              isRequired={true}
              label={"Bank Name"}
              name="bankCashName"
              error={errors.bankDetail?.value?.message}
              placeholder="Type Here To Search"
              options={bankOptions}
              value={formValues.bankDetail.value}
              onChange={(selected: any) => {
                setValue(`bankDetail.value`, selected.value, {
                  shouldValidate: true,
                });
                setValue(`bankDetail.label`, selected.label, {
                  shouldValidate: true,
                });
              }}
              className="large"
            ></FormDropdown>
          </div>
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

export default PaymentVoucherForm;

"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput } from "@/components/ui/form/form-input";
import { FormDropdown } from "@/components/ui/form/form-dropdown";
import { FaCheck, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button/button";
import {
  AddEditCompany,
  GetSpecificCompanyMasterData,
} from "@/utils/api.constant";
import { eResultCode } from "@/utils/enum";
import { ToastOpen, ToastType } from "@/state/toast/slice";
import useToast from "@/hooks/useToast";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Loader from "@/components/ui/loader/loader";

const CompanyForm = ({ params }: any) => {
  const unwrappedParams: any = use(params); // Unwrap params
  const id = unwrappedParams.id;
  const [isLoading, setIsLoading] = useState(false);
  const defaultValues: CompanyDetails = {
    id: 0,
    companyName: "",
    group: {
      value: "",
      label: "",
    },
    gstinNo: "",
    contactPersonName: "",
    address: "",
    country: {
      value: "",
      label: "",
    },
    state: {
      value: "",
      label: "",
    },
    registrationType: "",
    pincode: "",
    bankDetail: {
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      branchName: "",
    },
  };

  const customerOptionsGroup = [
    { value: "1", label: "Soundry Creditor" },
    { value: "2", label: "Soundry Debitor" },
  ];
  const customerOptionsState = [
    { value: "1", label: "Rajasthan" },
    { value: "2", label: "Gujrat" },
  ];
  const customerOptionsCountry = [{ value: "1", label: "India" }];
  const { onShowToast } = useToast();
  const router = useRouter();
  const { post } = useFetch();
  const validationSchema = yup.object().shape({
    companyName: yup.string().required("Company name is required"),
    group: yup
      .object()
      .shape({
        label: yup.string().required("Bill to is required"),
        value: yup.string().required("Bill to is required"),
      })
      .required("Bill to is required")
      .default({ label: "", value: "" }),
    gstinNo: yup.string().required("GST number is required"),
    contactPersonName: yup.string().required("Contact person is required"),
    address: yup.string().required("Address is required"),
    country: yup
      .object()
      .shape({
        label: yup.string().required("Country is required"),
        value: yup.string().required("Country is required"),
      })
      .required("Country is required")
      .default({ label: "", value: "" }),
    state: yup
      .object()
      .shape({
        label: yup.string().required("State is required"),
        value: yup.string().required("State is required"),
      })
      .required("State is required")
      .default({ label: "", value: "" }),
    registrationType: yup.string().required("Registration type is required"),
    pincode: yup.string().required("Pincode is required"),
    bankDetail: yup
      .object()
      .shape({
        bankName: yup.string().required("Bank name is required"),
        accountNumber: yup.string().required("Account number is required"),
        ifscCode: yup.string().required("IFSC code is required"),
        branchName: yup.string().required("Branch is required"),
      })
      .required("Bank details are required")
      .default({
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        branchName: "",
      }),
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CompanyDetails>({
    mode: "all",
    defaultValues,
    // resolver: yupResolver(validationSchema),
  });
  const formValues = getValues();
  useEffect(() => {
    if (id > 0) {
      fetchSpecificData(id);
    }
  }, []);
  const fetchSpecificData = async (id: number) => {
    setIsLoading(true);
    try {
      const payload = {
        data: {
          id: id,
        },
      };
      const response = await post(GetSpecificCompanyMasterData, payload);
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
        const formData = response.data;

        reset({
          ...formData,
          country: {
            value: formData.countryId.toString(), // Override country.value specifically
          },
          state: {
            value: formData.stateId.toString(),
          },
          group: {
            value: formData.groupId.toString(),
          },
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
  const onSubmit: SubmitHandler<CompanyDetails> = async (
    values: CompanyDetails
  ) => {
    console.log("Values", values);
    try {
      const payload = {
        data: {
          ...values,
          countryId: values.country.value,
          groupId: values.group.value,
          gstinNo: values.gstinNo,
          stateId: values.state.value,
        },
      };
      const response = await post(AddEditCompany, payload);
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
        router.push("/dashboard/customer-vendor");
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
    <>
      {isLoading ? (
        <Loader size={"35"} className="text-indigo-600" />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mx-auto p-6 bg-white shadow-md rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Company Details
          </h2>
          <hr className="mb-5"></hr>

          {/* Company Details Section */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <FormInput
                type="text"
                label={"Company Name"}
                error={errors.companyName?.message}
                isRequired={true}
                name="companyName"
                length={"full"}
                register={register}
                placeholder={"Enter Company Name"}
                onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
              />
            </div>
            <div>
              <FormDropdown
                isRequired={true}
                label={"Group"}
                name="group"
                error={errors.group?.value?.message}
                placeholder="Type Here To Search"
                options={customerOptionsGroup}
                value={formValues.group?.value}
                onChange={(selected: any) => {
                  setValue(`group.value`, selected.value, {
                    shouldValidate: true,
                  });
                  setValue(`group.label`, selected.label, {
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
                type="text"
                label={"GST Number"}
                error={errors.gstinNo?.message}
                isRequired={true}
                name="gstinNo"
                length={"full"}
                register={register}
                placeholder={"Enter GST Number"}
                onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
              />
            </div>
          </div>
          {/* Contact Details Section */}
          <h3 className="text-xl font-semibold mt-6 mb-4">Contact Details</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <FormInput
                type="text"
                label={"Contact Person"}
                error={errors.contactPersonName?.message}
                isRequired={true}
                length={"full"}
                name="contactPersonName"
                register={register}
                placeholder={"Enter Contact Person"}
                onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
              />
            </div>
            <div>
              <FormInput
                type="text"
                label={"Address"}
                length={"full"}
                error={errors.address?.message}
                isRequired={true}
                name="address"
                register={register}
                placeholder={"Enter Address"}
                onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              {/* <FormInput
          type="text"
          label={"Country"}
          length={"full"}
          error={errors.contactDetail?.country?.message}
          isRequired={true}
          name="contactDetail.country"
          register={register}
          placeholder={"Enter Country"}
          onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
        /> */}
              <FormDropdown
                isRequired={true}
                label={"Country"}
                name="country"
                error={errors.country?.value?.message}
                placeholder="Type Here To Search"
                options={customerOptionsCountry}
                value={formValues.country?.value}
                onChange={(selected: any) => {
                  setValue(`country.value`, selected.value, {
                    shouldValidate: true,
                  });
                  setValue(`country.label`, selected.label, {
                    shouldValidate: true,
                  });
                }}
                className="large"
              ></FormDropdown>
            </div>
            <div>
              <FormDropdown
                isRequired={true}
                label={"State"}
                name="state"
                error={errors.state?.value?.message}
                placeholder="Type Here To Search"
                options={customerOptionsState}
                value={formValues.state?.value}
                onChange={(selected: any) => {
                  setValue(`state.value`, selected.value, {
                    shouldValidate: true,
                  });
                  setValue(`state.label`, selected.label, {
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
                type="text"
                label={"Registration Type"}
                error={errors.registrationType?.message}
                isRequired={true}
                name="registrationType"
                register={register}
                length={"full"}
                placeholder={"Enter Registration Type"}
                onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
              />
            </div>
            <div>
              <FormInput
                type="text"
                label={"Pincode"}
                error={errors.pincode?.message}
                isRequired={true}
                name="pincode"
                register={register}
                length={"full"}
                placeholder={"Enter Pincode"}
                onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
              />
            </div>
          </div>

          {/* Bank Details Section */}
          <h3 className="text-xl font-semibold mt-6 mb-4">Bank Details</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <FormInput
                type="text"
                label={"Bank Name"}
                length={"full"}
                error={errors.bankDetail?.bankName?.message}
                isRequired={true}
                name="bankDetail.bankName"
                register={register}
                placeholder={"Enter Bank Name"}
                onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
              />
            </div>
            <div>
              <FormInput
                type="text"
                label={"Account Number"}
                error={errors.bankDetail?.accountNumber?.message}
                isRequired={true}
                length={"full"}
                name="bankDetail.accountNumber"
                register={register}
                placeholder={"Enter Account Number"}
                onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <FormInput
                type="text"
                label={"IFSC Code"}
                length={"full"}
                error={errors.bankDetail?.ifscCode?.message}
                isRequired={true}
                name="bankDetail.ifscCode"
                register={register}
                placeholder={"Enter IFSC Code"}
                onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
              />
            </div>
            <div>
              <FormInput
                type="text"
                label={"Branch"}
                error={errors.bankDetail?.branchName?.message}
                isRequired={true}
                name="bankDetail.branchName"
                length={"full"}
                register={register}
                placeholder={"Enter Branch"}
                onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
              />
            </div>
          </div>

          {/* Submit Section */}
          <div className="mt-6 flex space-x-4">
            <Button size="smaller" type="submit" variant="blue">
              Submit
            </Button>
            <Button
              disabled={isLoading}
              variant="grey"
              onClick={() => {
                router.push("/dashboard/customer-vendor");
              }}
            >
              Cancel
            </Button>
            {/* <Button variant="red">View Report</Button> */}
          </div>
        </form>
      )}
    </>
  );
};

export default CompanyForm;

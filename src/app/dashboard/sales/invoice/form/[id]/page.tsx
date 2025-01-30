"use client";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput } from "@/components/ui/form/form-input";
import { FormDropdown } from "@/components/ui/form/form-dropdown";
import { FaCheck, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import PickDate from "@/components/ui/date-picker/date-picker";
import { Button } from "@/components/ui/button/button";
import useDrawer from "@/hooks/useDrawer";
import ProductForm from "@/app/dashboard/items/form/page";
import { DrawerOpen } from "@/state/drawer/slice";
import { useEffect, useState } from "react";
import {
  GetCompanyList,
  GetGstList,
  GetItemsList,
  GetUnitsList,
} from "@/utils/api.constant";
import { eResultCode } from "@/utils/enum";
import useToast from "@/hooks/useToast";
import { ToastOpen, ToastType } from "@/state/toast/slice";
import useFetch from "@/hooks/useFetch";
type OptionsSet = {
  customerOptions: DropDownOption[];
  itemOptions: DropDownOption[];
  unitOptions: DropDownOption[];
  gstOptions: DropDownOption[];
};

const InvoiceForm = () => {
  const { onShowDrawer } = useDrawer();
  const { post } = useFetch();
  const { onShowToast } = useToast();
  const [options, setOptions] = useState<OptionsSet>();
  const defaultValues: SaleFormModel = {
    invoiceNumber: "",
    invoiceDate: "",
    shipTo: {
      value: "",
      label: "",
    },
    billTo: {
      value: "",
      label: "",
    },
    itemArray: [
      {
        item: {
          value: "",
          label: "",
        },
        unit: {
          value: "",
          label: "",
        },
        qty: 0,
        unitPrice: 0,
        total: 0, // Allows nullable number (null is acceptable here)
      },
    ],
    gst: {
      value: "",
      label: "",
    },
    subTotal: null,
    laborCharges: null,
    freightCharges: null,
    total: null, // Nullable, as per the model and schema
  };

  const addProduct = () => {
    onShowDrawer({
      dimmer: true,
      width: "45%",
      name: "Show Drawer Form",
      Component: () => (
        <ProductForm
          id={0}
          onRefreshList={() => {
            console.log("object");
          }}
        />
      ),
      position: DrawerOpen.right,
    });
  };

  useEffect(() => {
    GetCustomerOptionList();
    GetGetItemOptionList();
    GetUnitOptionList();
    GetGstOptionList();
  }, []);

  const GetCustomerOptionList = async () => {
    try {
      const payload = {
        data: {
          currentPage: 1,
          searchText: "",
          pageSize: 10,
        },
      };
      const response = await post(GetCompanyList, payload);
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
        const Data = await response.data;

        const customerOptions = Data.filter((item: any) => item.groupId === 1) // Filter items with groupId = 1
          .map((item: any) => ({
            label: item.companyName,
            value: item.id.toString(), // Convert id to string
          }));

        setOptions((precData: any) => ({
          ...precData,
          customerOptions: customerOptions,
        }));
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
  const GetGetItemOptionList = async () => {
    try {
      const payload = {
        data: {
          currentPage: 1,
          searchText: "",
          pageSize: 10,
        },
      };
      const response = await post(GetItemsList, payload);
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
        const Data = await response.data;

        const itemOptions = Data.map((item: any) => ({
          label: item.productName,
          value: item.id.toString(), // Convert id to string
        }));

        setOptions((precData: any) => ({
          ...precData,
          itemOptions: itemOptions,
        }));
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
  const GetUnitOptionList = async () => {
    try {
      const payload = {
        data: {
          currentPage: 1,
          searchText: "",
          pageSize: 10,
        },
      };
      const response = await post(GetUnitsList, payload);
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
        const Data = await response.data;

        const unitOptions = Data.map((item: any) => ({
          label: item.unitName,
          value: item.id.toString(), // Convert id to string
        }));

        setOptions((precData: any) => ({
          ...precData,
          unitOptions: unitOptions,
        }));
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
  const GetGstOptionList = async () => {
    try {
      const payload = {
        data: {
          currentPage: 1,
          searchText: "",
          pageSize: 10,
        },
      };
      const response = await post(GetGstList, payload);
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
        const Data = await response.data;

        const gstOptions = Data.map((item: any) => ({
          label: item.gstName,
          value: item.id.toString(), // Convert id to string
        }));

        setOptions((precData: any) => ({
          ...precData,
          gstOptions: gstOptions,
        }));
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
  const validationSchema = yup.object({
    invoiceNumber: yup.string().required("Invoice number is required"),
    invoiceDate: yup.string().required("Invoice date is required"),
    shipTo: yup.object().shape({
      label: yup.string().required("Ship to is required"),
      value: yup.string().required("Ship to is required"),
    }),
    billTo: yup.object().shape({
      label: yup.string().required("Bill to is required"),
      value: yup.string().required("Bill to is required"),
    }),
    itemArray: yup.array().of(
      yup.object().shape({
        item: yup.object().shape({
          label: yup.string().required("Item is required"),
          value: yup.string().required("Item is required"),
        }),
        unit: yup.object().shape({
          label: yup.string().required("Unit is required"),
          value: yup.string().required("Unit is required"),
        }),
        qty: yup
          .number()
          // .transform((value, originalValue) =>
          //   originalValue === "" ? null : value
          // )
          .required("Quantity is required"),
        // .nullable(),
        unitPrice: yup
          .number()
          .transform((value, originalValue) =>
            originalValue === "" ? null : value
          )
          .required("Unit Price is required"),
        total: yup
          .number()
          .transform((value, originalValue) =>
            originalValue === "" ? null : value
          )
          .required("Total is required"),
      })
    ),
    gst: yup.object().shape({
      label: yup.string().required("GST is required"),
      value: yup.string().required("GST is required"),
    }), // Optional field, set to nullable
    total: yup.number().required("Total is required").nullable(),
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SaleFormModel>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "itemArray",
  });
  const formValues = getValues();

  const calculateTotal = () => {
    // Add logic to calculate total from items, labor, and freight charges
  };
  const onSubmit: SubmitHandler<SaleFormModel> = async (
    values: SaleFormModel
  ) => {
    console.log("value", values);
  };
  const appendData = () => {
    console.log("Reach");
    append({
      item: {
        value: "",
        label: "",
      },
      unit: {
        value: "",
        label: "",
      },
      qty: 0,
      unitPrice: 0,
      discount: 0,
      // gst: {
      //   value: "",
      //   label: "",
      // },
      total: 0,
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Invoice Form</h2>
      <hr className="mb-5"></hr>
      <div className="grid grid-cols-2 gap-6 justify-end">
        <div>
          <FormInput
            type="text"
            label={"Invoice Number"}
            error={errors.invoiceNumber?.message}
            isRequired={true}
            name="invoiceNumber"
            register={register}
            placeholder={"Enter Invoice"}
            onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
          ></FormInput>
        </div>
        <div>
          <PickDate
            dateFormat="dd-MMM-yyyy"
            placeholderText={"SelectToDate"}
            maxDate={new Date()}
            name="invoiceDate"
            label={"Invoice Date"}
            selected={formValues.invoiceDate}
            onChange={(selected: any) => {
              setValue(`invoiceDate`, selected, {
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
            label={"Bill To"}
            name="billTo"
            error={errors.billTo?.value?.message}
            placeholder="Type Here To Search"
            options={options?.customerOptions}
            value={formValues.shipTo.label}
            onChange={(selected: any) => {
              setValue(`billTo.value`, selected.value, {
                shouldValidate: true,
              });
              setValue(`billTo.label`, selected.label, {
                shouldValidate: true,
              });
            }}
            className="large"
          ></FormDropdown>
        </div>
        <div>
          <FormDropdown
            isRequired={true}
            label={"Ship To"}
            name="shipTo"
            placeholder="Type Here To Search"
            options={options?.customerOptions}
            error={errors.shipTo?.value?.message}
            value={formValues.shipTo.label}
            onChange={(selected: any) => {
              setValue(`shipTo.value`, selected.value, {
                shouldValidate: true,
              });
              setValue(`shipTo.label`, selected.label, {
                shouldValidate: true,
              });
            }}
          ></FormDropdown>
        </div>
      </div>

      {/* <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <FormInput
            type="text"
            label={"Billing Address"}
            error={errors.billingAddress?.message}
            isRequired={true}
            name="billingAddress"
            length={"full"}
            register={register}
            placeholder={"Enter address"}
            onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
          ></FormInput>
        </div>
        <div>
          <div>
            <FormInput
              type="text"
              label={"Shipping Address"}
              error={errors.shippingAddress?.message}
              isRequired={true}
              name="shippingAddress"
              length={"full"}
              register={register}
              placeholder={"Enter address"}
              onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
            ></FormInput>
          </div>
        </div>
      </div> */}

      <div className="mt-6">
        <table className="min-w-full border-collapse border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-[5%] border border-gray-300 p-3 text-left font-medium text-gray-700">
                Sr No
              </th>
              <th className="w-[20%] border border-gray-300 p-3 text-left font-medium text-gray-700">
                Item
              </th>
              <th className="w-[12%] border border-gray-300 p-3 text-left font-medium text-gray-700">
                Unit
              </th>
              <th className="w-[10%] border border-gray-300 p-3 text-left font-medium text-gray-700">
                Qty
              </th>
              <th className="w-[12%] border border-gray-300 p-3 text-left font-medium text-gray-700">
                Unit Price
              </th>
              <th className="w-[10%] border border-gray-300 p-3 text-left font-medium text-gray-700">
                Discount
              </th>
              <th className="border border-gray-300 p-3 text-left font-medium text-gray-700">
                Total
              </th>
              <th className="w-[3%] border border-gray-300 p-3 text-center font-medium text-gray-700">
                <FaPlus className="cursor-pointer" onClick={appendData} />
              </th>
            </tr>
          </thead>
          <tbody>
            {fields.map((item, index: number) => (
              <tr key={index} className="">
                <td className="border border-gray-300 p-3 text-gray-600 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-3 text-gray-600">
                  <FormDropdown
                    isRequired={true}
                    // label={"Ship To"}
                    className="border-none shadow-none z-50"
                    name={`itemArray[${index}].item`}
                    placeholder="product"
                    options={options?.itemOptions}
                    error={errors.itemArray?.[index]?.item?.value?.message} // Improved error handling for each index
                    value={formValues.itemArray?.[index]?.item?.label}
                    onChange={(selected: any) => {
                      setValue(
                        `itemArray.${index}.item.value`,
                        selected.value,
                        {
                          shouldValidate: true,
                        }
                      );
                      setValue(
                        `itemArray.${index}.item.label`,
                        selected.label,
                        {
                          shouldValidate: true,
                        }
                      );
                    }}
                  ></FormDropdown>
                  {/* <FaPlus onClick={() => addProduct()} /> */}
                </td>
                <td className="border border-gray-300 p-3 text-gray-600">
                  <FormDropdown
                    isRequired={true}
                    // label={"Ship To"}
                    className="border-none shadow-none z-50"
                    name={`itemArray[${index}].unit`}
                    placeholder="unit"
                    options={options?.unitOptions}
                    error={errors.itemArray?.[index]?.unit?.value?.message} // Improved error handling for each index
                    value={formValues.itemArray?.[index]?.unit?.label}
                    onChange={(selected: any) => {
                      setValue(
                        `itemArray.${index}.unit.value`,
                        selected.value,
                        {
                          shouldValidate: true,
                        }
                      );
                      setValue(
                        `itemArray.${index}.unit.label`,
                        selected.label,
                        {
                          shouldValidate: true,
                        }
                      );
                    }}
                  ></FormDropdown>
                </td>
                <td className="border border-gray-300 p-3 text-gray-600">
                  <FormInput
                    type="number"
                    inputClassName="border-none shadow-none"
                    isRequired={true}
                    name={`itemArray[${index}].qty`}
                    error={errors.itemArray?.[index]?.qty?.message}
                    length={"full"}
                    // register={register}
                    onChange={(e: any) => {
                      setValue(`itemArray.${index}.qty`, e.target.value, {
                        shouldValidate: true,
                      });
                      setValue(
                        `itemArray.${index}.total`,
                        (formValues.itemArray?.[index]?.qty ?? 0) *
                          (formValues.itemArray?.[index]?.unitPrice ?? 0) -
                          (formValues.itemArray?.[index]?.qty ?? 0) *
                            (formValues.itemArray?.[index]?.unitPrice ?? 0) *
                            ((formValues.itemArray?.[index]?.discount ?? 0) /
                              100)
                      );
                      setValue(
                        "subTotal",
                        formValues.itemArray?.reduce(
                          (sum: number, item: any) => sum + (item.total || 0),
                          0
                        )
                      );
                      setValue(
                        "total",
                        (formValues.subTotal ?? 0) +
                          (formValues.laborCharges ?? 0) +
                          (formValues.freightCharges ?? 0)
                      );
                    }}
                    placeholder={"Enter Quantity"}
                    onKeyPress={(e) =>
                      e.key === "Enter" && e.currentTarget.blur()
                    }
                  />
                </td>
                <td className="border border-gray-300 p-3 text-gray-600">
                  <FormInput
                    type="number"
                    isRequired={true}
                    inputClassName="border-none shadow-none"
                    name={`itemArray[${index}].unitPrice`}
                    error={errors.itemArray?.[index]?.unitPrice?.message}
                    length={"full"}
                    // register={register}
                    onChange={(e: any) => {
                      setValue(`itemArray.${index}.unitPrice`, e.target.value, {
                        shouldValidate: true,
                      });
                      setValue(
                        `itemArray.${index}.total`,
                        (formValues.itemArray?.[index]?.qty ?? 0) *
                          (formValues.itemArray?.[index]?.unitPrice ?? 0) -
                          (formValues.itemArray?.[index]?.qty ?? 0) *
                            (formValues.itemArray?.[index]?.unitPrice ?? 0) *
                            ((formValues.itemArray?.[index]?.discount ?? 0) /
                              100)
                      );
                      setValue(
                        "subTotal",
                        formValues.itemArray?.reduce(
                          (sum: number, item: any) => sum + (item.total || 0),
                          0
                        )
                      );
                      setValue(
                        "total",
                        (formValues.subTotal ?? 0) +
                          (formValues.laborCharges ?? 0) +
                          (formValues.freightCharges ?? 0)
                      );
                    }}
                    placeholder={"Enter Unit Price"}
                    onKeyPress={(e) =>
                      e.key === "Enter" && e.currentTarget.blur()
                    }
                  />
                </td>
                <td className="border border-gray-300 p-3 text-gray-600">
                  <FormInput
                    type="number"
                    inputClassName="border-none shadow-none"
                    name={`itemArray[${index}].discount`}
                    length={"full"}
                    // register={register}
                    onChange={(e: any) => {
                      setValue(`itemArray.${index}.discount`, e.target.value, {
                        shouldValidate: true,
                      });
                      setValue(
                        `itemArray.${index}.total`,
                        (formValues.itemArray?.[index]?.qty ?? 0) *
                          (formValues.itemArray?.[index]?.unitPrice ?? 0) -
                          (formValues.itemArray?.[index]?.qty ?? 0) *
                            (formValues.itemArray?.[index]?.unitPrice ?? 0) *
                            ((formValues.itemArray?.[index]?.discount ?? 0) /
                              100)
                      );
                      setValue(
                        "subTotal",
                        formValues.itemArray?.reduce(
                          (sum: number, item: any) =>
                            parseInt(sum + (item.total || 0)),
                          0
                        )
                      );
                      setValue(
                        "total",
                        (formValues.subTotal ?? 0) +
                          (formValues.laborCharges ?? 0) +
                          (formValues.freightCharges ?? 0)
                      );
                    }}
                    placeholder={"Enter discount"}
                    onKeyPress={(e) =>
                      e.key === "Enter" && e.currentTarget.blur()
                    }
                  />
                </td>
                <td className="border border-gray-300 p-3 text-gray-600">
                  <FormInput
                    type="number"
                    disabled
                    isRequired={true}
                    value={formValues.itemArray?.[index]?.total}
                    error={errors.itemArray?.[index]?.total?.message}
                    inputClassName="border-none shadow-none"
                    name={`itemArray[${index}].total`}
                    length={"full"}
                    // register={register}
                    placeholder={"Enter total"}
                    onKeyPress={(e) =>
                      e.key === "Enter" && e.currentTarget.blur()
                    }
                  />
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  {fields.length > 1 && (
                    <FaTrash
                      className=" cursor-pointer"
                      onClick={() => remove(index)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          {/* <FormInput
            type="number"
            label={"Labor Charges"}
            name="laborCharges"
            length={"full"}
            // register={register}
            onChange={(e: any) => {
              setValue("laborCharges", parseInt(e.target.value), {
                shouldValidate: true,
              });
              setValue(
                "total",
                (formValues.freightCharges ?? 0) +
                  (parseInt(e.target.value) || 0)
              );
            }}
            placeholder={"Enter Labor"}
            onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
          ></FormInput> */}
        </div>
        <div>
          <FormInput
            type="number"
            label={"Sub Total"}
            name="subTotal"
            // onChange={(e: any) => {
            //   setValue("freightCharges", parseInt(e.target.value), {
            //     shouldValidate: true,
            //   });
            //   setValue(
            //     "total",
            //     (formValues.laborCharges ?? 0) + (parseInt(e.target.value) || 0)
            //   );
            // }}
            disabled
            // value={formValues.itemArray?.reduce(
            //   (sum, item) => sum + (item.total || 0),
            //   0
            // )}

            length={"full"}
            register={register}
            placeholder={"Enter Freight"}
            onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
          ></FormInput>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <FormInput
            type="number"
            label={"Labor Charges"}
            name="laborCharges"
            length={"full"}
            register={register}
            onChange={(e: any) => {
              setValue("laborCharges", parseInt(e.target.value), {
                shouldValidate: true,
              });
              setValue(
                "total",
                (formValues.freightCharges ?? 0) +
                  (parseInt(e.target.value) || 0)
              );
            }}
            placeholder={"Enter Labor"}
            onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
          ></FormInput>
        </div>
        <div>
          <FormInput
            type="number"
            label={"Freight Charges"}
            name="freightCharges"
            onChange={(e: any) => {
              setValue("freightCharges", parseInt(e.target.value), {
                shouldValidate: true,
              });
              setValue(
                "total",
                (formValues.laborCharges ?? 0) + (parseInt(e.target.value) || 0)
              );
            }}
            length={"full"}
            register={register}
            placeholder={"Enter Freight"}
            onKeyPress={(e) => e.key === "Enter" && e.currentTarget.blur()}
          ></FormInput>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <FormDropdown
          isRequired={true}
          label={"GST"}
          className="border-none shadow-none z-50"
          name={`gst`}
          placeholder="Gst"
          options={options?.gstOptions}
          error={errors.gst?.value?.message} // Improved error handling for each index
          value={formValues.gst?.label}
          onChange={(selected: any) => {
            setValue(`gst.value`, selected.value, {
              shouldValidate: true,
            });
            setValue(`gst.label`, selected.label, {
              shouldValidate: true,
            });
          }}
        ></FormDropdown>
        <FormInput
          disabled
          type="text"
          label={"GST Amount"}
          name="gstAmount"
          length={"full"}
          register={register}
        ></FormInput>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* <FormDropdown
          isRequired={true}
          label={"GST"}
          className="border-none shadow-none z-50"
          name={`gst`}
          placeholder="gst"
          options={options?.gstOptions}
          error={errors.gst?.value?.message} // Improved error handling for each index
          value={formValues.gst?.label}
          onChange={(selected: any) => {
            setValue(`gst.value`, selected.value, {
              shouldValidate: true,
            });
            setValue(`gst.label`, selected.label, {
              shouldValidate: true,
            });
          }}
        ></FormDropdown> */}

        <div></div>
        <div>
          <FormInput
            disabled
            type="text"
            label={"Total"}
            name="total"
            length={"full"}
            register={register}
          ></FormInput>
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <Button
          type="submit"
          variant="blue"
          // className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </Button>
        <Button
          variant="grey"
          // className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Cancel
        </Button>
        <Button
          variant="red"
          // className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          View Report
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;

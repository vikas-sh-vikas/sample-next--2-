"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput } from "@/components/ui/form/form-input";
import { FormDropdown } from "@/components/ui/form/form-dropdown";
import { Button } from "@/components/ui/button/button";
import useDrawer from "@/hooks/useDrawer";
import { AddEditItems, GetSpecificItemsMasterData } from "@/utils/api.constant";
import useToast from "@/hooks/useToast";
import { eResultCode } from "@/utils/enum";
import { ToastOpen, ToastType } from "@/state/toast/slice";
import { FaCheck, FaTimes } from "react-icons/fa";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader/loader";

export type DrawerProps = {
  isOpen?: any;
  onClose?: any;
  id: any;
};

type RefreshListFunction = () => void;

const ProductForm = (
  props: DrawerProps & {
    onRefreshList: RefreshListFunction;
  }
) => {
  const { onCloseDrawer } = useDrawer();
  const defaultValues: ItemsModel = {
    id: 0,
    productName: "",
    group: {
      value: "",
      label: "",
    },
    unit: {
      value: "",
      label: "",
    },
    description: "",
    hsnCode: "",
    price: "",
  };
  const { onShowToast } = useToast();
  const { post } = useFetch();
  const groupOptions = [
    { value: "1", label: "Group A" },
    { value: "2", label: "Group B" },
  ];
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (props.id > 0) {
      getSpecificData(props.id);
    }
  }, []);
  const getSpecificData = async (id: number) => {
    setIsLoading(true);
    try {
      isLoading;
      const payload = {
        data: {
          id: id,
        },
      };
      const response = await post(GetSpecificItemsMasterData, payload);
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
          unit: {
            value: formData.unitId.toString(),
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
  const unitOptions = [
    { value: "1", label: "Kilogram" },
    { value: "2", label: "Liter" },
  ];

  const validationSchema = yup.object({
    productName: yup.string().required("Product name is required"),
    group: yup.object().shape({
      label: yup.string().required("Group is required"),
      value: yup.string().required("Group is required"),
    }),
    unit: yup.object().shape({
      label: yup.string().required("Unit is required"),
      value: yup.string().required("Unit is required"),
    }),
    description: yup.string().required("Description is required"),
    hsnCode: yup.string().required("HSN Code is required"),
    price: yup.string().required("price is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ItemsModel>({
    mode: "all",
    defaultValues,
    // resolver: yupResolver(validationSchema),
  });
  const formValues = getValues();

  const onSubmit: SubmitHandler<ItemsModel> = async (values: ItemsModel) => {
    console.log("Submitted values", values);
    // setIsLoading(true);
    try {
      const payload = {
        data: {
          ...values,
          groupId: values.group.value,
          unitId: values.unit.value,
        },
      };
      const response = await post(AddEditItems, payload);
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
        <h2 className="text-2xl font-bold mb-6 text-center">Product Details</h2>
        <hr className="mb-5"></hr>
        <div>
          {isLoading ? (
            <Loader size={"35"} className="text-indigo-600" />
          ) : (
            <div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <FormInput
                    type="text"
                    label="Product Name"
                    error={errors.productName?.message}
                    isRequired={true}
                    length={"full"}
                    name="productName"
                    register={register}
                    placeholder="Enter Product Name"
                  />
                </div>
                <div>
                  <FormDropdown
                    isRequired={true}
                    label="Group"
                    name="group"
                    error={errors.group?.value?.message}
                    placeholder="Select Group"
                    options={groupOptions}
                    value={formValues.unit?.value}
                    onChange={(selected: any) => {
                      setValue("group.value", selected.value, {
                        shouldValidate: true,
                      });
                      setValue("group.label", selected.label, {
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
                    label="Unit"
                    name="unit"
                    value={formValues.unit?.value}
                    error={errors.unit?.value?.message}
                    placeholder="Select Unit"
                    options={unitOptions}
                    onChange={(selected: any) => {
                      setValue("unit.value", selected.value, {
                        shouldValidate: true,
                      });
                      setValue("unit.label", selected.label, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </div>
                <div>
                  <FormInput
                    type="text"
                    label="Description"
                    error={errors.description?.message}
                    isRequired={true}
                    name="description"
                    register={register}
                    length={"full"}
                    placeholder="Enter Description"
                  />
                </div>
              </div>

              {/* GST Details Section */}
              {/* <h3 className="text-xl font-semibold mt-6 mb-4">GST Details</h3> */}
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <FormInput
                    type="text"
                    label="HSN Code"
                    length={"full"}
                    error={errors.hsnCode?.message}
                    isRequired={true}
                    name="hsnCode"
                    register={register}
                    placeholder="Enter HSN Code"
                  />
                </div>
                <div>
                  <FormInput
                    type="number"
                    label="Price"
                    length={"full"}
                    error={errors.price?.message}
                    isRequired={true}
                    name="price"
                    register={register}
                    placeholder="Enter IGST"
                  />
                </div>
              </div>
            </div>
          )}{" "}
        </div>
      </div>
      <div>
      <div className="flex space-x-4 justify-end py-4">
        <Button disabled={isLoading} type="submit" variant="blue">
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
export default ProductForm;

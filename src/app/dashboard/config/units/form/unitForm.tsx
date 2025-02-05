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
import { useEffect } from "react";
import {
  AddEditUnits,
  AddEditUserBank,
  GetSpecificUnitsMasterData,
  GetSpecificUserBankMasterData,
} from "@/utils/api.constant";
import { eResultCode } from "@/utils/enum";
import { ToastOpen, ToastType } from "@/state/toast/slice";

export type DrawerProps = {
  isOpen?: any;
  onClose?: any;
  id: any;
};

type RefreshListFunction = () => void;

const UnitForm = (
  props: DrawerProps & {
    onRefreshList: RefreshListFunction;
  }
) => {
  const { onCloseDrawer } = useDrawer();
  const defaultValues: UnitsModel = {
    id: 0,
    shortCode: "",
    unitName: "",
  };
  const { onShowToast } = useToast();
  const { post } = useFetch();

  const validationSchema = yup.object({
    shortCode: yup.string().required("Short Code is required"),
    unitName: yup.string().required("Name is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<UnitsModel>({
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
    try {
      const payload = {
        data: {
          id: id,
        },
      };
      const response = await post(GetSpecificUnitsMasterData, payload);
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
      // setIsLoading(false);
    }
  };
  const onSubmit: SubmitHandler<UnitsModel> = async (values: UnitsModel) => {
    try {
      const payload = {
        data: {
          ...values,
        },
      };
      const response = await post(AddEditUnits, payload);
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
      className="w-full mx-auto p-6 bg-white"
    >
      {/* Submit Section */}
      <div className="flex space-x-4 justify-end py-4">
        <Button type="submit" variant="blue">
          Submit
        </Button>
        <Button variant="grey" onClick={onCloseDrawer}>
          Cancel
        </Button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Unit Details</h2>
      <hr className="mb-5"></hr>

      {/* Bank Details Section */}
      <div className="grid grid-cols-1 gap-6">
        <div>
          <FormInput
            type="text"
            label="Unit Name"
            length={"full"}
            error={errors.unitName?.message}
            isRequired={true}
            name="unitName"
            register={register}
            placeholder="Enter Unit Name"
          />
        </div>
        <div>
          <FormInput
            type="text"
            label="Short Code"
            length={"full"}
            error={errors.shortCode?.message}
            isRequired={true}
            name="shortCode"
            register={register}
            placeholder="Enter Short Code"
          />
        </div>
      </div>
    </form>
  );
};

export default UnitForm;

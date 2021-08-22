import React from "react";
import { Header } from "@buffetjs/custom";
import { useDispatch, useSelector } from "react-redux";
import {
  REDUCER_NAME,
  CLEAR_TAKE_ATTENDANCES,
} from "../../../../hooks/constants";

function PaymentHeader() {
  const dispatch = useDispatch();

  const type = useSelector((state) => state.get(REDUCER_NAME).attendanceType);

  const onClickSaveHandler = () => {
    console.log("Save 1111", type);
  };

  return (
    <Header
      actions={[
        {
          label: "Clear",
          onClick: () => {
            // dispatch({
            //   type: CLEAR_TAKE_ATTENDANCES,
            //   clear_take_attendance: true,
            // });
          },
          color: "cancel",
          type: "button",
        },
        {
          label: "Save",
          onClick: onClickSaveHandler,
          color: "success",
          type: "submit",
        },
      ]}
      title={{
        label: "Payments",
      }}
      content="Student Courses Payment"
    />
  );
}

export default PaymentHeader;

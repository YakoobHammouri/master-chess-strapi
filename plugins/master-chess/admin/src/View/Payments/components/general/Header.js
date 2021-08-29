import React from "react";
import { Header } from "@buffetjs/custom";
import { useDispatch, useSelector } from "react-redux";
import { REDUCER_NAME } from "../../../../containers/Context/Payment/constants";

function PaymentHeader() {
  const dispatch = useDispatch();

  const loading = useSelector(
    (state) => state.get(REDUCER_NAME).savePamentLoading
  );
  const savePament = useSelector(
    (state) => state.get(REDUCER_NAME).funSavePament
  );

  const onClickSaveHandler = () => {
    if (savePament) {
      savePament();
    }
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
          isLoading: loading,
        },
      ]}
      title={{
        label: "Payments",
      }}
      content="Student Courses Payment"
      stickable={true}
    />
  );
}

export default PaymentHeader;

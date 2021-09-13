import React from "react";
import { Header } from "@buffetjs/custom";
import { useDispatch, useSelector } from "react-redux";
import {
  REDUCER_NAME,
  CLEAR_ACTIVITIE,
} from "../../../../containers/Context/StudentActivities/constants";

function PaymentHeader() {
  const dispatch = useDispatch();

  const loading = useSelector(
    (state) => state.get(REDUCER_NAME).savePamentLoading
  );
  const savePament = useSelector(
    (state) => state.get(REDUCER_NAME).funSaveStudentActivities
  );

  const formRowList = useSelector(
    (state) => state.get(REDUCER_NAME).FormRowActivitieList
  );

  const formRowDataList = useSelector(
    (state) => state.get(REDUCER_NAME).funGetRowStudentActivitiesList
  );

  const onClickSaveHandler = () => {
    if (savePament) {
      savePament(formRowList, formRowDataList);
    }
  };

  return (
    <Header
      actions={[
        {
          label: "Clear",
          onClick: () => {
            dispatch({ type: CLEAR_ACTIVITIE, clear_StudentActivities: true });
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
        label: "Student Activities",
      }}
      content=""
      stickable={true}
    />
  );
}

export default PaymentHeader;

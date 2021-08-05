import React from "react";
import { Header } from "@buffetjs/custom";
import { useDispatch, useSelector } from "react-redux";
import { REDUCER_NAME, CLEAR_TAKE_ATTENDANCES } from "../../../hooks/constants";
import useTakeAttendances from "../../../hooks/useTakeAttendances";

function AttendancesHeader() {
  const dispatch = useDispatch();
  const center = useSelector((state) => state.get(REDUCER_NAME).centerid);
  const course = useSelector((state) => state.get(REDUCER_NAME).courseid);
  const date = useSelector((state) => state.get(REDUCER_NAME).attendanceDate);
  const attendance = useSelector(
    (state) => state.get(REDUCER_NAME).studetnCourseList
  );

  const { takeAttendances } = useTakeAttendances();

  const onClickSaveHandler = () => {
    alert("Are you sure to save the data? ");

    var datum = Date.parse(date);
    const ee = datum / 1000;

    const obj = {
      Date: ee,
      course,
      studentAttendance: attendance,
    };

    takeAttendances(obj)
      .then(() => {
        dispatch({ type: CLEAR_TAKE_ATTENDANCES, clear_take_attendance: true });
      })
      .catch((err) => {
        console.log("Error in Save  student Attendance");
        console.log(err);
      });
  };

  return (
    <Header
      actions={[
        {
          label: "Clear",
          onClick: () => {
            dispatch({
              type: CLEAR_TAKE_ATTENDANCES,
              clear_take_attendance: true,
            });
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
        label: "Course Attendances",
      }}
      content="choose the center and course To take attendance "
    />
  );
}

export default AttendancesHeader;

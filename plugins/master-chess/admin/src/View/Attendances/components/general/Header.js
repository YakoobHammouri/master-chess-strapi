import React from "react";
import moment from "moment";
import { Header } from "@buffetjs/custom";
import { useDispatch, useSelector } from "react-redux";
import {
  REDUCER_NAME,
  CLEAR_TAKE_ATTENDANCES,
} from "../../../../hooks/constants";
import { useTakeAttendances, useEditAttendances } from "../../../../hooks";

function AttendancesHeader() {
  const dispatch = useDispatch();
  const { takeAttendances } = useTakeAttendances();
  const { editAttendances } = useEditAttendances();

  const type = useSelector((state) => state.get(REDUCER_NAME).attendanceType);
  const course = useSelector((state) => state.get(REDUCER_NAME).courseid);
  const date = useSelector((state) => state.get(REDUCER_NAME).attendanceDate);
  const attendance = useSelector(
    (state) => state.get(REDUCER_NAME).studetnCourseList
  );
  const selectedAttendId = useSelector(
    (state) => state.get(REDUCER_NAME).selectedAttendanceId
  );

  const updateAttend = useSelector(
    (state) => state.get(REDUCER_NAME).studentAttndanceLest
  );

  const onClickSaveHandler = () => {
    if (type && type === "take") {
      takeAttendancesHandler();
    } else if (type && type === "edit") {
      editAttendancesHandler();
    }
  };

  const takeAttendancesHandler = () => {
    alert("Are you sure to save the Attendances? ");

    let attdDate = {};

    if (date?._isAMomentObject && date?._isValid) {
      attdDate = date?._d;
    } else {
      data;
    }

    const obj = {
      Date: attdDate,
      course,
      studentAttendance: attendance,
    };

    takeAttendances(obj)
      .then(() => {
        dispatch({
          type: CLEAR_TAKE_ATTENDANCES,
          clear_take_attendance: true,
        });
      })
      .catch((err) => {
        console.log("Error in Save  student Attendance");
        console.log(err);
      });
  };

  const editAttendancesHandler = () => {
    alert("Are you sure to update the Attendances? ");

    const obj = {
      studentAttendance: updateAttend,
    };

    console.log("Staet Edit Attend obj : ", obj);
    editAttendances(selectedAttendId, obj)
      .then(() => {
        dispatch({
          type: CLEAR_TAKE_ATTENDANCES,
          clear_take_attendance: true,
        });
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

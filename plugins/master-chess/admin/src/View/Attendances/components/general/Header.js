import React from "react";
import moment from "moment";
import { Header } from "@buffetjs/custom";
import { useDispatch, useSelector } from "react-redux";
import {
  REDUCER_NAME,
  CLEAR_TAKE_ATTENDANCES,
} from "../../../../hooks/constants";
import { useTakeAttendances, useEdit } from "../../../../hooks";

function AttendancesHeader() {
  const dispatch = useDispatch();
  const { takeAttendances } = useTakeAttendances();
  const { edit } = useEdit();

  const type = useSelector((state) => state.get(REDUCER_NAME).attendanceType);
  const course = useSelector((state) => state.get(REDUCER_NAME).courseid);
  const date = useSelector((state) => state.get(REDUCER_NAME).attendanceDate);
  const attendance = useSelector(
    (state) => state.get(REDUCER_NAME).studetnCourseList
  );
  const courseMeta = useSelector(
    (state) => state.get(REDUCER_NAME).selectCourseMeta
  );

  const selectedAttendId = useSelector(
    (state) => state.get(REDUCER_NAME).selectedAttendanceId
  );

  const updateAttend = useSelector(
    (state) => state.get(REDUCER_NAME).studentAttndanceLest
  );

  const onClickSaveHandler = () => {
    console.log("Save 1111", type);
    if (type && type === "take") {
      takeAttendancesHandler();
    } else if (type && type === "edit") {
      editAttendancesHandler();
    }
  };

  const takeAttendancesHandler = () => {
    const ok = confirm("Are you sure to save the Attendances?");

    if (ok) {
      let attdDate = {};

      if (date?._isAMomentObject && date?._isValid) {
        attdDate = date?._d;
      } else {
        date;
      }

      const obj = {
        Date: attdDate,
        course,
        studentAttendance: attendance,
      };

      // meta: finished: false;
      // lecturesTotal: null;
      // numberOfLecture: 8;

      takeAttendances(obj)
        .then(() => {
          dispatch({
            type: CLEAR_TAKE_ATTENDANCES,
            clear_take_attendance: true,
          });
        })
        .then(async () => {
          // update  lecturesTotal and finish status for course
          if (courseMeta?.meta) {
            const { lecturesTotal, numberOfLecture, finished } =
              courseMeta?.meta;

            const _lecturesTotal = !lecturesTotal ? 0 : parseInt(lecturesTotal);
            const _numberOfLecture = !numberOfLecture
              ? 0
              : parseInt(numberOfLecture);

            // check if valus is numebr to update the lectures total
            if (
              isNaN(_lecturesTotal) === false &&
              isNaN(_numberOfLecture) === false &&
              _numberOfLecture > 0
            ) {
              const newTotal = _lecturesTotal + 1;
              const obj = {
                lecturesTotal: newTotal,
                finished: _numberOfLecture === newTotal,
              };
              console.log("obj to updar : ", obj);
              await edit(`/courses/${course}`, obj);
            }
          }
        })
        .catch((err) => {
          console.log("Error in Save  student Attendance");
          console.log(err);
        });
    }
  };

  const editAttendancesHandler = () => {
    const ok = confirm("Are you sure to update the Attendances? ");
    if (ok) {
      const obj = {
        studentAttendance: updateAttend,
      };

      edit(`/attendances/${selectedAttendId}`, obj)
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
    }
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

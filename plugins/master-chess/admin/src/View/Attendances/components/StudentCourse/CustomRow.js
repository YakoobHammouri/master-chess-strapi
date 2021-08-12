import React from "react";
import {
  TAKE_ATTENDANCES,
  UPDATE_ATTENDANCES,
  REDUCER_NAME,
  ATTENDANCES_TYPE,
} from "../../../../hooks/constants";
import { CustomRow as Row } from "@buffetjs/styles";
import ToggleAttendances from "./ToggleAttendances";
import { useDispatch, useSelector } from "react-redux";
const CustomRow = ({ isEdit, attend }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (isEdit && isEdit === true) {
      dispatch({ type: ATTENDANCES_TYPE, attype: "edit" });
    } else {
      dispatch({ type: ATTENDANCES_TYPE, attype: "take" });
    }
  }, []);
  let takeAttend;

  if (isEdit && isEdit === true) {
    takeAttend = useSelector(
      (state) => state.get(REDUCER_NAME).studentAttndanceLest
    );
  } else {
    takeAttend = useSelector(
      (state) => state.get(REDUCER_NAME).studetnCourseList
    );
  }

  return (
    <Row>
      <td>
        <p>{isEdit && isEdit === true ? attend.id : attend.student}</p>
      </td>
      <td>
        <p>{attend.studentName}</p>
      </td>
      <td>
        <ToggleAttendances
          attendances={attend.attendance}
          onArttChange={(value) => {
            if (takeAttend) {
              const temp = takeAttend.map((std) => {
                if (isEdit === true) {
                  if (std.id === attend.id) {
                    const t = { ...std };
                    t.attendance = value;
                    return t;
                  }
                  return std;
                } else if (isEdit === false) {
                  if (std.student === attend.student) {
                    const t = { ...std };
                    t.attendance = value;
                    return t;
                  }
                  return std;
                }
              });

              if (isEdit === true) {
                dispatch({ type: UPDATE_ATTENDANCES, stdAttend: temp });
                dispatch({ type: ATTENDANCES_TYPE, attype: "edit" });
              } else {
                dispatch({ type: TAKE_ATTENDANCES, std: temp });
                dispatch({ type: ATTENDANCES_TYPE, attype: "take" });
              }
            }
          }}
        />
      </td>
    </Row>
  );
};

export default CustomRow;

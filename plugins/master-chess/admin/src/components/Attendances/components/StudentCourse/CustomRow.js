import React from "react";
import { TAKE_ATTENDANCES, REDUCER_NAME } from "../../../../hooks/constants";
import { CustomRow as Row } from "@buffetjs/styles";
import ToggleAttendances from "./ToggleAttendances";
import { useDispatch, useSelector } from "react-redux";
const CustomRow = ({ attend }) => {
  const dispatch = useDispatch();
  const { student, studentName, attendance } = attend;

  const takeAttend = useSelector(
    (state) => state.get(REDUCER_NAME).studetnCourseList
  );

  return (
    <Row>
      <td>
        <p>{student}</p>
      </td>
      <td>
        <p>{studentName}</p>
      </td>
      <td>
        {/*
        
        //TODO : 
         1- opne reducse to update Attendances
         2 - at finish click save
         3- in save get data with  Attendances from reduser to crater in  Attendances list
        
        */}
        <ToggleAttendances
          attendances={attendance}
          onArttChange={(value) => {
            if (takeAttend) {
              const temp = takeAttend.map((std) => {
                if (std.student === student) {
                  const t = { ...std };
                  t.attendance = value;
                  return t;
                }
                return std;
              });
              dispatch({ type: TAKE_ATTENDANCES, std: temp });
            }
          }}
        />
      </td>
    </Row>
  );
};

export default CustomRow;

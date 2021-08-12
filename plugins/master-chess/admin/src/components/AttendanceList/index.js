import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getloading from "../../utils/getloading";
import {
  REDUCER_NAME,
  STUDENT_ATTENDANCE_LEST,
  SELECT_ATTENDANCE_ID,
} from "../../hooks/constants";

import Select from "react-select";
import Wrapper from "./Wrapper";
import Label from "../Label";
import T from "../../utils/T";
import { BaselineAlignment } from "strapi-helper-plugin";
import useGetAttendancesById from "../../hooks/useGetAttendancesById";
const AttendanceList = () => {
  const attendList = useSelector(
    (state) => state.get(REDUCER_NAME).attendanceList
  );

  const dispatch = useDispatch();
  const { getAttendancesById } = useGetAttendancesById();
  const [selectAttend, setSelectAttend] = useState({});

  useEffect(() => {
    setSelectAttend(null);
  }, [attendList]);

  useEffect(() => {
    if (selectAttend?.value) {
      getAttendancesById(selectAttend.value)
        .then((data) => {
          const temp = data?.studentAttendance.map((item) => {
            return {
              id: `${item.id}`,
              studentName: item?.student?.name,
              attendance: item.attendance,
            };
          });
          dispatch({ type: STUDENT_ATTENDANCE_LEST, stdAttend: temp });
        })
        .catch((err) => {
          console.log("err in  get get Attendances By Id useEffect :  ", err);
        });
    }
  }, [selectAttend]);

  return (
    <Wrapper>
      <span id="locale-code">
        <Label for={"AttendanceList"} text={T("AttandeList.label")} />
      </span>
      <BaselineAlignment top size="5px" />

      <Select
        className="basic-single"
        classNamePrefix="select"
        isLoading={getloading()}
        value={selectAttend}
        isClearable={true}
        isSearchable={true}
        name={"AttendanceList"}
        options={attendList}
        onChange={(selected) => {
          setSelectAttend(selected);
          dispatch({ type: SELECT_ATTENDANCE_ID, attendId: selected.value });
        }}
        isDisabled={attendList.length === 0 ? true : false}
      />
    </Wrapper>
  );
};

export default AttendanceList;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getloading from "../../utils/getloading";
import { REDUCER_NAME, SELECT_COURSE_ID } from "../../hooks/constants";

import Select from "react-select";
import Wrapper from "./Wrapper";
import Label from "../Label";
import T from "../../utils/T";
import { BaselineAlignment } from "strapi-helper-plugin";
import useGetAttendancesList from "../../hooks/useGetAttendancesList";
import useGetStudentByCourse from "../../hooks/useGetStudentByCourse";
const CenterList = ({ isEdit, componentName }) => {
  const courseList = useSelector((state) => state.get(REDUCER_NAME).courseList);

  const dispatch = useDispatch();
  const { getAttendancesList } = useGetAttendancesList();
  const { getStudentCourseList } = useGetStudentByCourse();
  const [selectCourse, setSelectCourse] = useState({});

  // useEffect(() => {
  //   console.log("isEdit && isEdit === true : ", isEdit && isEdit === true);
  //   if (isEdit && isEdit === true && componentName === "EditAttendance") {
  //     // alert("course no chanfge");
  //   } else {
  //     console.log("selectCourse : ", selectCourse);
  //     setSelectCourse(null);
  //   }
  // }, [courseList]);

  useEffect(() => {
    if (selectCourse?.value && isEdit && isEdit === true) {
      getAttendancesList(selectCourse.value)
        .then((t) => {})
        .catch((err) => {
          console.log("err in  get Attendances List in  useEffect :  ", err);
        });
    } else if (selectCourse?.value && (!isEdit || isEdit === false)) {
      getStudentCourseList(selectCourse.value)
        .then((t) => {})
        .catch((err) => {
          console.log("err in  get Studetn CourseList in  useEffect :  ", err);
        });
    }
  }, [selectCourse]);

  return (
    <Wrapper>
      <span id="locale-code">
        <Label for={"CourseList"} text={T("CourseList.label")} />
      </span>
      <BaselineAlignment top size="5px" />

      <Select
        className="basic-single"
        classNamePrefix="select"
        isLoading={getloading()}
        value={selectCourse}
        isClearable={true}
        isSearchable={true}
        name={"CourseList"}
        options={courseList}
        onChange={(selected) => {
          setSelectCourse(selected);
          dispatch({ type: SELECT_COURSE_ID, courseId: selected.value });
        }}
        isDisabled={courseList.length === 0 ? true : false}
      />
    </Wrapper>
  );
};

export default CenterList;

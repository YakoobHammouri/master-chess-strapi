import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getloading from "../../utils/getloading";
import { REDUCER_NAME } from "../../hooks/constants";
import Select from "react-select";
import Wrapper from "./Wrapper";
import Label from "../Label";
import T from "../../utils/T";
import { BaselineAlignment } from "strapi-helper-plugin";
import useGetStudentByCourse from "../../hooks/useGetStudentByCourse";
const CenterList = () => {
  const courseList = useSelector((state) => state.get(REDUCER_NAME).courseList);

  const { getStudentCourseList } = useGetStudentByCourse();
  const [selectCourse, setSelectCourse] = useState({});

  useEffect(() => {
    setSelectCourse(null);
  }, [courseList]);

  useEffect(() => {
    if (selectCourse?.value) {
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
        }}
        isDisabled={courseList.length === 0 ? true : false}
      />
    </Wrapper>
  );
};

export default CenterList;

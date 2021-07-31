import React, { useEffect, useState } from "react";
import { Table } from "@buffetjs/core";
import { useSelector } from "react-redux";
import { REDUCER_NAME } from "../../../../hooks/constants";
import Wrapper from "./Wrapper";
import CustomRow from "./CustomRow";
import CustomHeaders from "./CustomHeaders";
import { BaselineAlignment } from "strapi-helper-plugin";

const index = () => {
  const studetnCourseList = useSelector(
    (state) => state.get(REDUCER_NAME).studetnCourseList
  );

  // useEffect(() => {
  //   if (selectCourse) {
  //     getStudentCourseList(selectCourse.value)
  //       .then((t) => {})
  //       .catch((err) => {
  //         console.log("err in  get Studetn CourseList in  useEffect :  ", err);
  //       });
  //   }
  // }, [selectCourse]);

  return (
    <Wrapper>
      <BaselineAlignment top size="5px" />
      <Table
        customRow={CustomRow}
        headers={CustomHeaders}
        rows={studetnCourseList}
      />
    </Wrapper>
  );
};

export default index;

import React, { useEffect, useState } from "react";
import { Table } from "@buffetjs/core";
import { useSelector } from "react-redux";
import { REDUCER_NAME } from "../../../../hooks/constants";
import Wrapper from "./Wrapper";
import CustomRow from "./CustomRow";
import { TakeHeader, EditHeader, SerarchHeader } from "./CustomHeaders";

import { BaselineAlignment } from "strapi-helper-plugin";

const index = ({ isEdit, displayStdAttend }) => {
  let list;
  if (isEdit && isEdit === true) {
    list = useSelector((state) => state.get(REDUCER_NAME).studentAttndanceLest);
  } else if (displayStdAttend && displayStdAttend === true) {
    list = useSelector(
      (state) => state.get(REDUCER_NAME).studentAttendanceList
    );
  } else {
    list = useSelector((state) => state.get(REDUCER_NAME).studetnCourseList);
  }

  return (
    <Wrapper>
      <BaselineAlignment top size="5px" />
      <Table
        customRow={(t) => (
          <CustomRow
            isEdit={isEdit}
            displayStdAttend={displayStdAttend}
            attend={t.row}
          />
        )}
        headers={
          isEdit && isEdit === true
            ? EditHeader
            : displayStdAttend && displayStdAttend === true
            ? SerarchHeader
            : TakeHeader
        }
        rows={list}
      />
    </Wrapper>
  );
};

export default index;

import React, { useEffect, useState } from "react";
import { Table } from "@buffetjs/core";
import { useSelector } from "react-redux";
import { REDUCER_NAME } from "../../../../hooks/constants";
import Wrapper from "./Wrapper";
import CustomRow from "./CustomRow";
import TakeCustomHeaders from "./TakeHeaders";
import EditCustomHeaders from "./EditHeaders";
import { BaselineAlignment } from "strapi-helper-plugin";

const index = ({ isEdit }) => {
  let list;
  if (isEdit && isEdit === true) {
    list = useSelector((state) => state.get(REDUCER_NAME).studentAttndanceLest);
  } else {
    list = useSelector((state) => state.get(REDUCER_NAME).studetnCourseList);
  }

  return (
    <Wrapper>
      <BaselineAlignment top size="5px" />
      <Table
        customRow={(t) => <CustomRow isEdit={isEdit} attend={t.row} />}
        headers={
          isEdit && isEdit === true ? EditCustomHeaders : TakeCustomHeaders
        }
        rows={list}
      />
    </Wrapper>
  );
};

export default index;

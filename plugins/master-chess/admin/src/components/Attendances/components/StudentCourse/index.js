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

  // const [studetnList, setStudetnList] = useState([]);

  // useEffect(() => {
  //   console.log(`studetnCourseList 111`, studetnCourseList);
  //   console.log(`studetnList 11`, studetnList);
  //   setStudetnList(studetnCourseList);
  // }, [studetnCourseList]);

  return (
    <Wrapper>
      <BaselineAlignment top size="5px" />
      <Table
        customRow={(t) => <CustomRow attend={t.row} />}
        headers={CustomHeaders}
        rows={studetnCourseList}
      />
    </Wrapper>
  );
};

export default index;

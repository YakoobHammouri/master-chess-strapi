import React, { useEffect, useState } from "react";
import getloading from "../../utils/getloading";
import useGetCenter from "../../hooks/useGetCenter";
import useGetCourse from "../../hooks/useGetCourse";

import PropTypes from "prop-types";
import Select from "react-select";
import Wrapper from "./Wrapper";
import Label from "../Label";
import T from "../../utils/T";
import { BaselineAlignment } from "strapi-helper-plugin";

const CenterList = () => {
  const [center, setCenterList] = useState([]);
  const [selectcenter, setSelectCenter] = useState({});
  const { getCenterList } = useGetCenter();
  const { getCourseList } = useGetCourse();

  useEffect(() => {
    getCenterList()
      .then((center) => {
        setCenterList(center);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectcenter?.value) {
      getCourseList(selectcenter.value)
        .then((t) => {})
        .catch((err) => {
          console.log("err in  getCourseList in  useEffect :  ", err);
        });
    }
  }, [selectcenter]);

  return (
    <Wrapper>
      <span id="locale-code">
        <Label for={"CenterList"} text={T("CenterList.label")} />
      </span>
      <BaselineAlignment top size="5px" />
      <Select
        className="basic-single"
        classNamePrefix="select"
        isLoading={getloading()}
        isClearable={true}
        isSearchable={true}
        name={"CenterList"}
        options={center}
        value={selectcenter}
        onChange={(selected) => {
          setSelectCenter(selected);
        }}
      />
    </Wrapper>
  );
};

export default CenterList;

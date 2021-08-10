import React, { useEffect, useState } from "react";
import getloading from "../../utils/getloading";
import useGetCenter from "../../hooks/useGetCenter";
import useGetCourse from "../../hooks/useGetCourse";
import { useDispatch, useSelector } from "react-redux";
import {
  SELECT_CENTER_ID,
  REDUCER_NAME,
  CLEAR_TAKE_ATTENDANCES,
} from "../../hooks/constants";
import Select from "react-select";
import Wrapper from "./Wrapper";
import Label from "../Label";
import T from "../../utils/T";
import { BaselineAlignment } from "strapi-helper-plugin";

const CenterList = () => {
  const dispatch = useDispatch();
  const [center, setCenterList] = useState([]);
  const [selectcenter, setSelectCenter] = useState({});
  const { getCenterList } = useGetCenter();
  const { getCourseList } = useGetCourse();

  const clear = useSelector(
    (state) => state.get(REDUCER_NAME).clear_take_attendance
  );

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

  useEffect(() => {
    // setCenterList([]);
    setSelectCenter({});
    dispatch({ type: CLEAR_TAKE_ATTENDANCES, clear_take_attendance: false });
  }, [clear]);

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
          dispatch({ type: SELECT_CENTER_ID, centerId: selected.value });
        }}
      />
    </Wrapper>
  );
};

export default CenterList;

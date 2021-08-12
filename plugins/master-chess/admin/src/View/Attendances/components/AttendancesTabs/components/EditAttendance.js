import React, { useState, useEffect } from "react";
import Moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Padded, Separator } from "@buffetjs/core";
import { Col, Row } from "reactstrap";
import {
  useGetCenter,
  useGetCourse,
  useGetAttendancesList,
} from "../../../../../hooks";
import { Dropdowns, AttendanceList } from "../../../../../components";
import StudentCourse from "../../StudentCourse";
import {
  SELECT_COURSE_ID,
  SELECT_CENTER_ID,
  SELECT_ATTENDANCE_DATE,
  CLEAR_TAKE_ATTENDANCES,
  ATTENDANCES_TYPE,
  REDUCER_NAME,
} from "../../../../../hooks/constants";

const EditAttendance = () => {
  const dispatch = useDispatch();
  const attendList = useSelector(
    (state) => state.get(REDUCER_NAME).studentAttndanceLest
  );

  const clear = useSelector(
    (state) => state.get(REDUCER_NAME).clear_take_attendance
  );
  const courseList = useSelector((state) => state.get(REDUCER_NAME).courseList);

  const { centerList } = useGetCenter();
  const { getCourseList } = useGetCourse();
  const { getAttendancesList } = useGetAttendancesList();

  const [selectcenter, setSelectCenter] = useState({});
  const [selectCourse, setSelectCourse] = useState({});
  const [dateVal, setDateVal] = useState(Moment().format("DD/MM/YYYY"));

  // selectcenter
  useEffect(() => {
    if (selectcenter?.value) {
      getCourseList(selectcenter.value)
        .then((t) => {
          setSelectCourse(null);
        })
        .catch((err) => {
          console.log("err in  getCourseList in  useEffect :  ", err);
        });
    }
  }, [selectcenter]);

  //courseList
  useEffect(() => {
    // setSelectCourse(null);
  }, [courseList]);

  //selectCourse
  useEffect(() => {
    if (selectCourse?.value) {
      getAttendancesList(selectCourse.value)
        .then((t) => {})
        .catch((err) => {
          console.log("err in  get Attendances List in  useEffect :  ", err);
        });
    }
  }, [selectCourse]);

  // clear
  useEffect(() => {
    setSelectCenter({});
    setSelectCourse(null);
    dispatch({ type: CLEAR_TAKE_ATTENDANCES, clear_take_attendance: false });
  }, [clear]);

  const onCenterChange = (selected) => {
    setSelectCenter(selected);
    dispatch({ type: SELECT_CENTER_ID, centerId: selected.value });
  };

  const onCourseChange = (selected) => {
    setSelectCourse(selected);
    dispatch({ type: SELECT_COURSE_ID, courseId: selected.value });
  };

  return (
    <>
      <Row>
        <Col>
          <Dropdowns
            name={"CenterList"}
            lableTxt={"CenterList.label"}
            value={selectcenter}
            onValChange={onCenterChange}
            lsit={centerList}
          />
        </Col>
        <Col>
          <Dropdowns
            name={"CourseList"}
            lableTxt={"CourseList.label"}
            value={selectCourse}
            onValChange={onCourseChange}
            lsit={courseList}
            isDisabled={courseList.length === 0 ? true : false}
          />
        </Col>
        <Col>
          <AttendanceList />
        </Col>
      </Row>
      <Row>
        <Col>
          <Padded top bottom size="smd">
            <StudentCourse isEdit={true} />
          </Padded>
        </Col>
      </Row>
    </>
  );
};

export default EditAttendance;

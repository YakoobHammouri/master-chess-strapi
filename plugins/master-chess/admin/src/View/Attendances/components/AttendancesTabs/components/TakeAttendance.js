import moment from "moment";
import { Col, Row } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Padded, Separator } from "@buffetjs/core";
import {
  useGetCenter,
  useGetCourse,
  useGetStudentByCourse,
} from "../../../../../hooks";

import { Dropdowns, DatePicker } from "../../../../../components";
import StudentCourse from "../../StudentCourse";
import {
  SELECT_CENTER_ID,
  SELECT_COURSE_ID,
  SELECT_ATTENDANCE_DATE,
  CLEAR_TAKE_ATTENDANCES,
  SELECT_COURSE_META,
  REDUCER_NAME,
} from "../../../../../containers/Context/Attendances/constants";
const TakeAttendance = () => {
  const dispatch = useDispatch();

  const clear = useSelector(
    (state) => state.get(REDUCER_NAME).clear_take_attendance
  );

  const courseList = useSelector((state) => state.get(REDUCER_NAME).courseList);

  const { centerList } = useGetCenter();
  const { getCourseList } = useGetCourse();
  const { getStudentCourseList } = useGetStudentByCourse();

  const [selectcenter, setSelectCenter] = useState({});
  const [selectCourse, setSelectCourse] = useState({});
  const [dateVal, setDateVal] = useState(new moment());

  // Set type

  // selectcenter
  useEffect(() => {
    if (selectcenter?.value) {
      getCourseList(selectcenter.value, false)
        .then((t) => {
          setSelectCourse(null);
        })
        .catch((err) => {
          console.log("err in  getCourseList in  useEffect :  ", err);
        });
    }
  }, [selectcenter]);

  //selectCourse
  useEffect(() => {
    if (selectCourse?.value) {
      getStudentCourseList(selectCourse.value)
        .then((t) => {})
        .catch((err) => {
          console.log("err in  get Studetn CourseList in  useEffect :  ", err);
        });
    }
  }, [selectCourse]);

  // clear
  useEffect(() => {
    setSelectCenter({});
    setSelectCourse(null);
    setDateVal(new moment());
    dispatch({ type: CLEAR_TAKE_ATTENDANCES, clear_take_attendance: false });
  }, [clear]);

  const onCenterChange = (selected) => {
    setSelectCenter(selected);
    dispatch({ type: SELECT_CENTER_ID, centerId: selected.value });
  };

  const onCourseChange = (selected) => {
    setSelectCourse(selected);
    dispatch({ type: SELECT_COURSE_ID, courseId: selected.value });
    dispatch({ type: SELECT_COURSE_META, meta: selected });
  };

  return (
    <>
      <Row>
        <Col>
          {/* Center List */}
          <Dropdowns
            name={"CenterList"}
            lableTxt={"CenterList.label"}
            value={selectcenter}
            onValChange={onCenterChange}
            lsit={centerList}
          />
        </Col>
        <Col>
          {/* Course List */}
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
          <DatePicker
            dateVal={dateVal}
            onChangeDate={(newDate) => {
              setDateVal(newDate);
              dispatch({
                type: SELECT_ATTENDANCE_DATE,
                attendanceDate: newDate,
              });
            }}
            name={"AttendancesDate"}
            labelText={"Attendances.TakeDate"}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Padded top bottom size="smd">
            <StudentCourse isEdit={false} displayStdAttend={false} />
          </Padded>
        </Col>
      </Row>
    </>
  );
};

export default TakeAttendance;

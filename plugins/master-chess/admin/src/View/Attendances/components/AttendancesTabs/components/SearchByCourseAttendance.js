import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Padded } from "@buffetjs/core";
import { Col, Row } from "reactstrap";
import { T } from "../../../../../utils";
import {
  useGetCenter,
  useGetCourse,
  useGetCourseById,
} from "../../../../../hooks";
import { Dropdowns, Table } from "../../../../../components";

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
  const { getCourseById } = useGetCourseById();

  const [selectcenter, setSelectCenter] = useState({});
  const [selectCourse, setSelectCourse] = useState({});
  const [headerAttendList, setHeaderAttendList] = useState([]);
  const [courseAttendList, setCourseAttendList] = useState([]);

  const numText = T("table.tableHeader.RowON");
  const stdName = T("table.tableHeaer.stdName");

  const attendNo = T("attendances.text.NO");
  const attendYes = T("attendances.text.Yes");

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

  //selectCourse
  useEffect(() => {
    if (selectCourse?.value) {
      getCourseById(selectCourse.value)
        .then((result) => {
          let stdCount = 1;

          const atted = [];
          const headers = [numText, stdName];
          const _attendances = result?.attendances;

          for (let h = 0; h < _attendances.length; h++) {
            // Build Header
            const mdate = moment(_attendances[h]?.Date);
            if (mdate._isValid) {
              headers.push(`${mdate.format("D")}-${mdate.format("M")}`);
            } else {
              return headers.push(_attendances[h]?.Date);
            }
            // Build Attend  Rows
            /*
            [
              row 0 : []
              row 1 : []
              row 2 : []
              row 3 : []
            ]
            =======
            row 0 :
            [
              atted(h)(r)
            ]
            */
            const stdAttend = _attendances[h]?.studentAttendance;

            if (stdAttend && Array.isArray(stdAttend) && stdAttend.length > 0) {
              for (let r = 0; r < stdAttend.length; r++) {
                // if the Row not Found
                // build first colume with No and Name
                if (!atted[r]) {
                  atted.push([
                    `${stdCount}`,
                    `${stdAttend[r].studentName}`,
                    `${stdAttend[r].attendance ? attendYes : attendNo}`,
                  ]);

                  stdCount++;
                } else {
                  // Update Row to Add Attend for Date
                  atted[r][h + 2] = stdAttend[r].attendance
                    ? attendYes
                    : attendNo;
                }
              }
            }
          }

          // End Map

          setHeaderAttendList(headers);
          setCourseAttendList(atted);
        })
        .catch((err) => console.log(`Error in  get  course by id`, err));
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
      </Row>
      <Row>
        <Col>
          <Padded top bottom size="smd">
            <Table
              headers={headerAttendList}
              rows={courseAttendList}
              style={{ direction: "rtl" }}
            />
          </Padded>
        </Col>
      </Row>
    </>
  );
};

export default EditAttendance;

/*
            
            
            studentAttendance: Array(12)
0:
attendance: false
id: 81
student: {id: 2, birthDate: null, subscriptionDate: null, phoneNumber: null, address: null, …}
studentName: "يعقوب حموري"

            */

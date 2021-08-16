import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Padded } from "@buffetjs/core";
import { Col, Row } from "reactstrap";
import { T } from "../../../../../utils";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  useGetCenter,
  useGetCourse,
  useGetAttendancesById,
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
  const { getAttendancesById } = useGetAttendancesById();

  const [selectcenter, setSelectCenter] = useState({});
  const [selectCourse, setSelectCourse] = useState({});
  const [headerAttendList, setHeaderAttendList] = useState([]);
  const [courseAttendList, setCourseAttendList] = useState([]);
  const [can, setcan] = useState(null);

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
      // uisng getAttendancesById with query to sort Attend by date
      getAttendancesById(null, `?course=${selectCourse.value}&_sort=Date:ASC`)
        .then((result) => {
          let stdCount = 1;

          const atted = [];
          const headers = [numText, stdName];
          // const _attendances = result?.attendances;
          // old
          const _attendances = result;

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
    setSelectCourse({});
    setCourseAttendList([]);
    setHeaderAttendList([]);
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
            {headerAttendList.length > 0 && courseAttendList.length > 0 ? (
              <div>
                <Table
                  headers={headerAttendList}
                  rows={courseAttendList}
                  style={{ direction: "rtl" }}
                  id={"pdfstd"}
                />
                <button
                  onClick={(e) => {
                    try {
                      const input = document.getElementById("pdfstd");
                      console.log("inputtt1111 : ", input);
                      // html2canvas(input).then((canvas) => {
                      //   console.log("canvas 111 : ", canvas);
                      //   // setcan(canvas);
                      //   document.getElementById("ttt").appendChild(canvas);
                      //   const imgData = canvas.toDataURL("image/png");
                      //   const pdf = new jsPDF();
                      //   pdf.addImage(imgData, "JPEG", 0, 0);
                      //   // pdf.output('dataurlnewwindow');
                      //   // pdf.save("download.pdf");
                      // });
                    } catch (err) {
                      console.log("erro in convert to pdf : ", err);
                    }
                  }}
                >
                  pdf
                </button>
                <div id={"ttt"}></div>
              </div>
            ) : (
              ""
            )}
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

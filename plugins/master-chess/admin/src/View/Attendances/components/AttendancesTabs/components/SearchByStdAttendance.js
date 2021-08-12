import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Padded } from "@buffetjs/core";
import { Col, Row } from "reactstrap";
import {
  useGetStudent,
  useGetStudentById,
  useGetCourseById,
} from "../../../../../hooks";
import { Dropdowns } from "../../../../../components";
import StudentCourse from "../../StudentCourse";
import {
  CLEAR_TAKE_ATTENDANCES,
  STUDENT_ATTENDANCES_LIST,
  REDUCER_NAME,
} from "../../../../../hooks/constants";

const SearchByStdAttendance = () => {
  const dispatch = useDispatch();
  const { studentList } = useGetStudent();
  const { getStudentById } = useGetStudentById();
  const { getCourseById } = useGetCourseById();

  const clear = useSelector(
    (state) => state.get(REDUCER_NAME).clear_take_attendance
  );

  const [selectCourse, setSelectCourse] = useState({});
  const [courseList, setCourseList] = useState([]);
  const [selectStudent, setSelectStudent] = useState(null);

  // select Center
  useEffect(() => {
    if (selectStudent?.value) {
      dispatch({
        type: STUDENT_ATTENDANCES_LIST,
        stdAttends: [],
      });
      setSelectCourse({});
      getStudentById(selectStudent.value)
        .then((std) => {
          const temp = std?.courses.map((i) => {
            return {
              value: `${i.id}`,
              label: `${i.name} - Level ${i.level}`,
            };
          });

          setCourseList(temp);
        })
        .catch((err) => {
          console.log("err in  get student by id in  useEffect :  ", err);
        });
    }
  }, [selectStudent]);

  // select Course
  useEffect(() => {
    if (selectCourse?.value) {
      //attendances
      getCourseById(selectCourse.value)
        .then((course) => {
          const stdId = selectStudent?.value;
          const studentAttendanceArray = [];
          course?.attendances.forEach((att) => {
            att.studentAttendance.forEach((s) => {
              if (s?.student.id == stdId) {
                studentAttendanceArray.push({
                  name: s?.student.name,
                  attendance: s?.attendance,
                  date: `${moment(att?.Date).locale("en").format("dddd")} - ${
                    att?.Date
                  }`,
                });
              }
            });
          });

          dispatch({
            type: STUDENT_ATTENDANCES_LIST,
            stdAttends: studentAttendanceArray,
          });
        })
        .catch((err) => {
          console.log("err in  get student by id in  useEffect :  ", err);
        });
    }
  }, [selectCourse]);

  // clear
  useEffect(() => {
    setSelectStudent({});
    setSelectCourse({});
    dispatch({ type: CLEAR_TAKE_ATTENDANCES, clear_take_attendance: false });
  }, [clear]);

  const onStudentChange = (selected) => {
    setSelectStudent(selected);
  };

  const onCourseChange = (selected) => {
    setSelectCourse(selected);
  };

  return (
    <>
      <Row>
        <Col>
          <Dropdowns
            name={"StudentList"}
            lableTxt={"StudentList.label"}
            value={selectStudent}
            onValChange={onStudentChange}
            lsit={studentList}
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
            <StudentCourse isEdit={false} displayStdAttend={true} />
          </Padded>
        </Col>
      </Row>
    </>
  );
};

export default SearchByStdAttendance;

import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Padded } from "@buffetjs/core";
import { Col, Row } from "reactstrap";
import { useGetStudent, useGetStudentById } from "../../../../../hooks";
import { Dropdowns } from "../../../../../components";

import { TakeStudentActivitieForm } from "../../StudentActivitieForm";
import {
  CLEAR_ACTIVITIE,
  REDUCER_NAME,
} from "../../../../../containers/Context/StudentActivities/constants";

const TakeStudentActivities = () => {
  const dispatch = useDispatch();
  const { studentList } = useGetStudent();
  const { getStudentById } = useGetStudentById();

  const clear = useSelector(
    (state) => state.get(REDUCER_NAME).clear_StudentActivities
  );

  const [selectCourse, setSelectCourse] = useState({});
  const [courseList, setCourseList] = useState([]);
  const [selectStudent, setSelectStudent] = useState(null);

  // select Student
  useEffect(() => {
    setSelectCourse({});
    if (selectStudent?.value) {
      getStudentById(selectStudent.value)
        .then((std) => {
          const temp = [];

          std?.courses.forEach((i) => {
            if (i.finished === false) {
              temp.push({
                value: `${i.id}`,
                label: `${i.name} - Level ${i.level}`,
                meta: {
                  id: i.id,
                  name: i.name,
                  lecturesTotal: i.lecturesTotal,
                  numberOfLecture: i.numberOfLecture,
                  finished: i.finished,
                  start: i.start,
                  end: i.end,
                },
              });
            }
          });

          setCourseList(temp);
        })
        .catch((err) => {
          console.log("err in  get student by id in  useEffect :  ", err);
        });
    }
  }, [selectStudent]);

  //clear;
  useEffect(() => {
    setSelectStudent({});
    setSelectCourse({});
    dispatch({ type: CLEAR_ACTIVITIE, clear_StudentActivities: false });
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
            {selectCourse?.value ? (
              <TakeStudentActivitieForm
                stdId={selectStudent?.value}
                course={selectCourse}
              />
            ) : null}
          </Padded>
        </Col>
      </Row>
    </>
  );
};

export default TakeStudentActivities;

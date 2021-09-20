import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Padded } from "@buffetjs/core";
import { Col, Row } from "reactstrap";
import { Dropdowns } from "../../../../../components";
import { getTrad } from "../../../../../utils";
import EditTableStudentActivities from "../../EditTableStudentActivities";
import {
  useGetStudent,
  useGetStudentById,
  useCRUD,
  endPoint,
  useActivitiesLists,
} from "../../../../../hooks";

import {
  CLEAR_ACTIVITIE,
  REDUCER_NAME,
  UPDATE_EDIT_ACTIVITIE_Table,
} from "../../../../../containers/Context/StudentActivities/constants";

const EditCoursePayment = () => {
  const dispatch = useDispatch();
  const { activitiesLists } = useActivitiesLists();
  const { studentList } = useGetStudent();
  const { getStudentById } = useGetStudentById();
  const { get } = useCRUD();
  const clear = useSelector(
    (state) => state.get(REDUCER_NAME).clear_StudentActivities
  );
  const updateTable = useSelector(
    (state) => state.get(REDUCER_NAME).updateEditActivityTable
  );

  const [selectCourse, setSelectCourse] = useState({});
  const [selectStudent, setSelectStudent] = useState(null);
  const [courseList, setCourseList] = useState([]);
  const [activityList, setActivityList] = useState([]);

  const getActivityForCourse = () => {
    setActivityList([]);

    get(
      `${endPoint.StudentActivities}/course-activity/${selectStudent?.value}/${selectCourse?.value}`
    )
      .then((activity) => {
        setActivityList(activity);
      })
      .catch((err) => {
        console.log(`Error in get Student activity`, err);
        strapi.notification.toggle({
          type: "warning",
          message: { id: getTrad("activities.get.student.activities.error") },
        });
      });
  };

  // select Studeent
  useEffect(() => {
    if (selectStudent?.value) {
      setSelectCourse({});
      setActivityList([]);
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

  // select Course
  useEffect(() => {
    if (selectCourse?.value) {
      getActivityForCourse();
    }
  }, [selectCourse]);

  // clear
  useEffect(() => {
    if (clear) {
      setSelectStudent({});
      setSelectCourse({});
      setActivityList([]);
      dispatch({ type: CLEAR_ACTIVITIE, clear_StudentActivities: false });
    }
  }, [clear]);

  //update Table
  useEffect(() => {
    if (updateTable) {
      getActivityForCourse();

      // reset value to false
      dispatch({
        type: UPDATE_EDIT_ACTIVITIE_Table,
        updateTable: false,
      });
    }
  }, [updateTable]);

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
            <EditTableStudentActivities
              rows={activityList}
              stdId={selectStudent?.value}
              course={selectCourse}
              list={activitiesLists}
            />
          </Padded>
        </Col>
      </Row>
    </>
  );
};

export default EditCoursePayment;

import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { Padded, Flex, Text } from "@buffetjs/core";
import { getTrad, T } from "../../../../../utils";
import { useSelector, useDispatch } from "react-redux";
import { Dropdowns } from "../../../../../components";
import BannerItem from "../../general/BannerItem";

import { useGetStudent, useCRUD, endPoint } from "../../../../../hooks";
import {
  LoadingIndicator,
  Table as StyledTable,
  TableRowEmpty,
} from "@buffetjs/styles";
// import BannerItem from "../../PaymentForm/BannerItem";

import {
  CLEAR_ACTIVITIE,
  REDUCER_NAME,
} from "../../../../../containers/Context/StudentActivities/constants";
const SearchActivityByStudent = () => {
  const dispatch = useDispatch();
  const { studentList } = useGetStudent();

  const { get } = useCRUD();
  const clear = useSelector(
    (state) => state.get(REDUCER_NAME).clear_StudentActivities
  );

  const [selectCourse, setSelectCourse] = useState({});
  const [courseList, setCourseList] = useState([]);
  const [studentActivityList, setStudentActivityList] = useState([]);

  const buildStudentActivity = () => {
    if (studentActivityList.length === 0) return;

    return studentActivityList?.map((temp, i) => {
      const { activity, student } = temp;
      return (
        <BannerItem
          key={i}
          name={student?.stdName ?? "---"}
          isFirst={i === 0}
          activityList={activity}
          // course={temp?.course}
          isSearch={true}
          searchByCourse={true}
        />
      );
    });
  };

  // select Studeent
  useEffect(() => {
    get(endPoint.Courses)
      .then((std) => {
        const temp = [];

        std?.forEach((i) => {
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
              center: i?.center?.name,
            },
          });
        });

        setCourseList(temp);
      })
      .catch((err) => {
        console.log("err in  get student by id in  useEffect :  ", err);
      });
  }, []);

  useEffect(() => {
    if (selectCourse?.value) {
      get(
        `${endPoint.StudentActivities}/course-activity/${selectCourse?.value}`
      )
        .then((stdActivity) => {
          console.log(`stdActivity 111111111`, stdActivity);
          setStudentActivityList(stdActivity);
        })
        .catch((err) => {
          console.log("err in  get student by id in  useEffect :  ", err);
        });
    }
  }, [selectCourse]);

  // clear
  useEffect(() => {
    setSelectCourse({});
    dispatch({ type: CLEAR_ACTIVITIE, clear_StudentActivities: false });
  }, [clear]);

  const onCourseChange = (selected) => {
    setSelectCourse(selected);
  };

  return (
    <>
      <Row>
        <Col>
          <Padded left right size={"lg"}>
            <Padded left right size={"lg"}>
              <Padded left right size={"lg"}>
                <Dropdowns
                  name={"CourseList"}
                  lableTxt={"CourseList.label"}
                  value={selectCourse}
                  onValChange={onCourseChange}
                  lsit={courseList}
                  isDisabled={courseList.length === 0 ? true : false}
                />
              </Padded>
            </Padded>
          </Padded>
        </Col>
      </Row>
      <Row>
        <Col>
          <Padded top bottom size="smd">
            {studentActivityList === null ? (
              <StyledTable>
                <Padded top bottom right left size="lg">
                  <Flex justifyContent="center" alignItems="center">
                    <Text size="lg" fontWeight="regular" color="black">
                      {T("activities.student.no.have.record")}
                    </Text>
                  </Flex>
                </Padded>
              </StyledTable>
            ) : (
              buildStudentActivity()
            )}
          </Padded>
        </Col>
      </Row>
    </>
  );
};

export default SearchActivityByStudent;

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

  const [selectStudent, setSelectStudent] = useState(null);
  const [studentActivityList, setStudentActivityList] = useState([]);

  console.log(`selectStudent 111111111dsfdsfds`, selectStudent);
  const buildStudentActivity = () => {
    if (studentActivityList.length === 0) return;

    return studentActivityList?.map((temp, i) => {
      return (
        <BannerItem
          key={i}
          name={temp?.course?.name ?? "---"}
          isFirst={i === 0}
          activityList={temp?.courseActivites}
          course={temp?.course}
          isSearch={true}
          stdName={selectStudent?.label}
        />
      );
    });
  };

  // select Studeent
  useEffect(() => {
    if (selectStudent?.value) {
      get(`${endPoint.StudentActivities}/student/${selectStudent?.value}`)
        .then((stdActivity) => {
          const { data } = stdActivity;
          if (data === null) {
            setStudentActivityList(null);
            return;
          }
          setStudentActivityList(data?.activities);
        })
        .catch((err) => {
          console.log(`Error in get Student Activity`, err);
          strapi.notification.toggle({
            type: "warning",
            message: { id: getTrad("activities.get.student.payment.error") },
          });
        });
    }
  }, [selectStudent]);

  // clear
  useEffect(() => {
    setSelectStudent({});
    dispatch({ type: CLEAR_ACTIVITIE, clear_StudentActivities: false });
  }, [clear]);

  const onStudentChange = (selected) => {
    setSelectStudent(selected);
  };

  return (
    <>
      <Row>
        <Col>
          <Padded left right size={"lg"}>
            <Padded left right size={"lg"}>
              <Padded left right size={"lg"}>
                <Dropdowns
                  name={"StudentList"}
                  lableTxt={"StudentList.label"}
                  value={selectStudent}
                  onValChange={onStudentChange}
                  lsit={studentList}
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

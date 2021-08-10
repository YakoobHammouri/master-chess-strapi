import React, { useState } from "react";
import Moment from "moment";
import { useDispatch } from "react-redux";
import { Padded, Separator } from "@buffetjs/core";
import { Col, Row } from "reactstrap";
import { CenterList, CoursesList, DatePicker } from "../../../..";
import StudentCourse from "../../StudentCourse";
import { SELECT_ATTENDANCE_DATE } from "../../../../../hooks/constants";
const TakeAttendance = () => {
  const [dateVal, setDateVal] = useState(Moment().format("DD/MM/YYYY"));
  const dispatch = useDispatch();
  return (
    <>
      <Row>
        <Col>
          <CenterList />
        </Col>
        <Col>
          <CoursesList />
        </Col>
        <Col>
          <DatePicker
            dateVal={dateVal}
            onChangeDate={(newDate) => {
              setDateVal(newDate._i);
              dispatch({
                type: SELECT_ATTENDANCE_DATE,
                attendanceDate: newDate._i,
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
            <StudentCourse />
          </Padded>
        </Col>
      </Row>
    </>
  );
};

export default TakeAttendance;

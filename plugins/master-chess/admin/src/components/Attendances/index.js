import React, { useState } from "react";
import Moment from "moment";
import { useDispatch } from "react-redux";
import { ContainerFluid, TabPanel } from "strapi-helper-plugin";
import { Padded, Separator } from "@buffetjs/core";
import { REDUCER_NAME, SELECT_ATTENDANCE_DATE } from "../../hooks/constants";
import { Col, Row } from "reactstrap";
import Header from "./components/Header";
import StudentCourse from "./components/StudentCourse";
import { LoadingProgress, CenterList, CoursesList, DatePicker } from "..";

function index() {
  const [dateVal, setDateVal] = useState(Moment().format("DD/MM/YYYY"));
  const dispatch = useDispatch();
  return (
    <ContainerFluid style={{ marginBottom: 80 }}>
      <Header />
      <Padded top bottom size="sm">
        <Padded top bottom size="sm">
          <LoadingProgress />
        </Padded>
        <Separator />
      </Padded>
      <Padded top size="sm">
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
      </Padded>
    </ContainerFluid>
  );
}

export default index;

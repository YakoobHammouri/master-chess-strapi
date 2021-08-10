import React, { useState } from "react";
import Moment from "moment";
import { useDispatch } from "react-redux";
import { Padded, Separator } from "@buffetjs/core";
import { TabPanel } from "strapi-helper-plugin";
import { Col, Row } from "reactstrap";
import { CenterList, CoursesList, DatePicker } from "../../../..";
import StudentCourse from "../../StudentCourse";

const EditAttendance = () => {
  return (
    <>
      <Row>
        <Col>
          <CenterList />
        </Col>
        <Col>
          <CoursesList isEdit={true} />
        </Col>
        <Col></Col>
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

export default EditAttendance;

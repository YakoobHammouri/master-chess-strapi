import React from "react";
import { ContainerFluid } from "strapi-helper-plugin";
import { Padded, Separator } from "@buffetjs/core";

import { Col, Row } from "reactstrap";
import Header from "./components/Header";
import StudentCourse from "./components/StudentCourse";
import { LoadingProgress, CenterList, CoursesList } from "..";

function index() {
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

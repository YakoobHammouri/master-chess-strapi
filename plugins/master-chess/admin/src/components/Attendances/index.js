import React, { useState } from "react";
import Moment from "moment";
import { useDispatch } from "react-redux";
import {
  ContainerFluid,
  TabPanel,
  Tabs,
  TabsNav,
  Tab,
  TabsPanel,
} from "strapi-helper-plugin";
import { TitleTabWrapper } from "./components/styles";
import { Padded, Separator } from "@buffetjs/core";
import { REDUCER_NAME, SELECT_ATTENDANCE_DATE } from "../../hooks/constants";
import { Col, Row } from "reactstrap";
import Header from "./components/Header";
import StudentCourse from "./components/StudentCourse";
import { LoadingProgress, CenterList, CoursesList, DatePicker } from "..";
import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";
function index() {
  const [dateVal, setDateVal] = useState(Moment().format("DD/MM/YYYY"));
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

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
        <TabsNav
          defaultSelection={0}
          label={"fjdskf"}
          id={"1"}
          style={{ "justify-content": "flex-start;" }}
        >
          <Tabs position="right" style={{ "justify-content": "flex-start;" }}>
            <Tab>
              <TitleTabWrapper type={"take"}>
                {formatMessage({
                  id: getTrad("models.attendance.take.Attendance"),
                })}
              </TitleTabWrapper>
            </Tab>
            <Tab>
              <TitleTabWrapper type={"edit"}>
                {formatMessage({
                  id: getTrad("models.attendance.edit.Attendance"),
                })}
              </TitleTabWrapper>
            </Tab>
            <Tab>
              <TitleTabWrapper type={"stdsearch"}>
                {formatMessage({
                  id: getTrad("models.attendance.search.by.student.Attendance"),
                })}
              </TitleTabWrapper>
            </Tab>

            <Tab>
              <TitleTabWrapper type={"cousearch"}>
                {formatMessage({
                  id: getTrad("models.attendance.search.by.course.Attendance"),
                })}
              </TitleTabWrapper>
            </Tab>
          </Tabs>

          <TabsPanel>
            <TabPanel>
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
            </TabPanel>

            <TabPanel>{"dfkljgfdlkj"}</TabPanel>
          </TabsPanel>
        </TabsNav>
      </Padded>
    </ContainerFluid>
  );
}

export default index;

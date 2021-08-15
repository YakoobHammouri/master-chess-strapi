import React from "react";
import { T } from "../../../../../utils";
import { Tabs, Tab } from "strapi-helper-plugin";
import { TitleTabWrapper } from "../../general/styles";

const TabsLsit = () => (
  <Tabs position="left">
    <Tab key={"take"}>
      <TitleTabWrapper type={"take"}>
        {T("models.attendance.take.Attendance")}
      </TitleTabWrapper>
    </Tab>
    <Tab key={"edit"}>
      <TitleTabWrapper type={"edit"}>
        {T("models.attendance.edit.Attendance")}
      </TitleTabWrapper>
    </Tab>
    <Tab key={"stdsearch"}>
      <TitleTabWrapper type={"stdsearch"}>
        {T("models.attendance.search.by.student.Attendance")}
      </TitleTabWrapper>
    </Tab>
    <Tab key={"cousearch"}>
      <TitleTabWrapper type={"cousearch"}>
        {T("models.attendance.search.by.course.Attendance")}
      </TitleTabWrapper>
    </Tab>
  </Tabs>
);

export default TabsLsit;

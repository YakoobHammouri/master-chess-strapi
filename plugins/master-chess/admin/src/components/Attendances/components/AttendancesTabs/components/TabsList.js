import React from "react";
import T from "../../../../../utils/T";
import { Tabs, Tab } from "strapi-helper-plugin";
import { TitleTabWrapper } from "../../styles";

const TabsLsit = () => (
  <Tabs position="right">
    <Tab>
      <TitleTabWrapper type={"take"}>
        {T("models.attendance.take.Attendance")}
      </TitleTabWrapper>
    </Tab>
    <Tab>
      <TitleTabWrapper type={"edit"}>
        {T("models.attendance.edit.Attendance")}
      </TitleTabWrapper>
    </Tab>
    <Tab>
      <TitleTabWrapper type={"stdsearch"}>
        {T("models.attendance.search.by.student.Attendance")}
      </TitleTabWrapper>
    </Tab>
    <Tab>
      <TitleTabWrapper type={"cousearch"}>
        {T("models.attendance.search.by.course.Attendance")}
      </TitleTabWrapper>
    </Tab>
  </Tabs>
);

export default TabsLsit;

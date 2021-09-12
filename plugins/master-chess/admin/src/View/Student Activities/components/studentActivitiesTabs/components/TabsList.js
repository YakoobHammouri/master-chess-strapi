import React from "react";
import { T } from "../../../../../utils";
import { Tabs, Tab } from "strapi-helper-plugin";
import { TitleTabWrapper } from "../../general/styles";
import { useDispatch } from "react-redux";
import { SAVE_ACTIVITIE } from "../../../../../containers/Context/StudentActivities/constants";

//
const TabsLsit = () => {
  const dispatch = useDispatch();
  return (
    <Tabs position={"right"}>
      <Tab key={"take"}>
        <div
          onClick={() => {
            dispatch({
              type: SAVE_ACTIVITIE,
              savePament: null,
            });
          }}
        >
          <TitleTabWrapper type={"takeActivitie"}>
            {T("models.paymetn.take.Activities")}
          </TitleTabWrapper>
        </div>
      </Tab>
      <Tab key={"take"}>
        <div
          onClick={() => {
            dispatch({
              type: SAVE_ACTIVITIE,
              funSaveActivitie: null,
            });
          }}
        >
          <TitleTabWrapper type={"edit"}>
            {T("models.paymetn.edit.Activities")}
          </TitleTabWrapper>
        </div>
      </Tab>
      <Tab key={"searchstdPayment"}>
        <div
          onClick={() => {
            dispatch({
              type: SAVE_PAYMENT,
              funSaveActivitie: null,
            });
          }}
        >
          <TitleTabWrapper type={"searchstdPayment"}>
            {T("models.paymetn.search.payment.student")}
          </TitleTabWrapper>
        </div>
      </Tab>
      <Tab key={"searchcoursePayment"}>
        <div
          onClick={() => {
            dispatch({
              type: SAVE_PAYMENT,
              funSaveActivitie: null,
            });
          }}
        >
          <TitleTabWrapper type={"searchcoursePayment"}>
            {T("models.paymetn.search.payment.course")}
          </TitleTabWrapper>
        </div>
      </Tab>
    </Tabs>
  );
};

export default TabsLsit;

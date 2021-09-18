import React, { useState, useEffect, useRef, createRef } from "react";
import { Padded } from "@buffetjs/core";
import { Col, Row, Container } from "reactstrap";
import { T, getTrad } from "../../../../../utils";
import { AddButtonWrapper, P, Plus } from "./Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../../../../../components";

import FormRow from "./FormRow";
import {
  SAVE_ACTIVITIE,
  FORM_ROW_ACTIVITIE_LIST,
  REDUCER_NAME,
} from "../../../../../containers/Context/StudentActivities/constants";

import {
  useActivitiesLists,
  useSaveStudentActivities,
} from "../../../../../hooks";

function index({
  stdId,
  course,
  amount,
  date,
  month,
  paymentId,
  isEdit,
  onClose,
}) {
  const dispatch = useDispatch();
  const { activitiesLists } = useActivitiesLists();

  const { onSaveHandler } = useSaveStudentActivities();
  const formRowList = useSelector(
    (state) => state.get(REDUCER_NAME).FormRowActivitieList
  );

  useEffect(() => {
    dispatch({
      type: SAVE_ACTIVITIE,
      funSaveActivitie: validateDate,
    });

    return () => {};
  }, [dispatch]);

  const validateDate = async (formRowList, formRowDataList) => {
    if (formRowList.length === 0) {
      alert("Plase Add new activitie");
      return;
    }

    /*
    
    {
    "activities": [
        {
            "courseActivites": [
                {
                    "activities_list": 3,
                    "activiteName": "",
                    "mark": 15
                }
            ],
            "course": 4,
            "courseName": ""
        }
    ],
    "student": 8,
    "created_by": 1,
    "updated_by": 1
}

    */

    const data = [];

    let _isValid = true;

    formRowDataList?.map((e) => {
      const temp = e();
      if (temp.isValid) {
        data.push(temp);
      } else {
        _isValid = false;
      }
    });

    if (data.length > 0 && _isValid) {
      const _courseActivites = data?.map((item) => {
        const activities_list = item.selectActivitie?.value?.value;
        const activiteName = item.selectActivitie?.value?.label;
        const mark = item.mark?.value;

        return {
          activities_list,
          activiteName,
          mark,
        };
      });

      const activiteObj = {
        course: course?.value,
        courseName: course?.meta?.name,
        courseActivites: _courseActivites,
      };

      await onSaveHandler(activiteObj, stdId, course);
    } else {
      strapi.notification.toggle({
        type: "warning",
        message: { id: getTrad("activities.get.student.activities.fixData") },
        timeout: 5000,
      });
    }
  };
  return (
    <div
      style={{
        borderRadius: "3px",
        background: "white",
        minHeight: 150,
      }}
    >
      <Padded top bottom right left size="md">
        <Container>
          <Row
            className="border-bottom"
            style={{
              backgroundColor: "rgb(243, 243, 244)",
              height: "38px",
            }}
          >
            <Col>
              <div style={{ marginLeft: 15, marginTop: 10 }}>
                <Label
                  htmlFor={"activitiesList.label"}
                  style={{
                    marginLeft: "15px;",
                    marginTop: 12,
                  }}
                  text={T("activitiesList.label")}
                />
              </div>
            </Col>
            <Col>
              <div style={{ marginLeft: 15, marginTop: 10 }}>
                <Label text="Total" htmlFor={"Total"} />
              </div>
            </Col>
            <Col>
              <div style={{ marginLeft: 15, marginTop: 10 }}>
                <Label text="Mark" htmlFor={"Mark"} />
              </div>
            </Col>
          </Row>
          <Row>
            {formRowList?.map((row) => {
              return row;
            })}
          </Row>

          <Row>
            <Col xs="12">
              <AddButtonWrapper>
                <button
                  onClick={() => {
                    dispatch({
                      type: FORM_ROW_ACTIVITIE_LIST,
                      row: <FormRow lists={activitiesLists} key={Date.now()} />,
                    });
                  }}
                  type="button"
                >
                  <P>
                    <Plus>
                      <i className="fas fa-plus"></i>
                    </Plus>
                    Add new activitie
                  </P>
                </button>
              </AddButtonWrapper>
            </Col>
          </Row>
        </Container>
      </Padded>
    </div>
  );
}

export default index;

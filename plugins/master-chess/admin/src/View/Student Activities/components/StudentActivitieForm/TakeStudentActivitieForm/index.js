import React, { useState, useEffect, useRef } from "react";
import { Padded } from "@buffetjs/core";
import { Col, Row, Container } from "reactstrap";
import { T } from "../../../../../utils";
import { AddButtonWrapper, P, Plus } from "./Wrapper";
import { useDispatch } from "react-redux";
import { Label } from "../../../../../components";

import FormRow from "./FormRow";
import { SAVE_ACTIVITIE } from "../../../../../containers/Context/StudentActivities/constants";

import { useActivitiesLists } from "../../../../../hooks";

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

  const [formRowList, setFormRowList] = useState([]);

  useEffect(() => {
    console.log(`object 1111111111`);
    dispatch({
      type: SAVE_ACTIVITIE,
      funSaveActivitie: () => {
        alert("save student Avtivite");
      },
    });

    return () => {
      console.log(`clean TakeCoursePaymentForm 111111111 `);
    };
  }, [dispatch]);

  return (
    <div
      style={{
        borderRadius: "3px",
        // "box-shadow": "0 2px 4px #e3e9f3",
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
                <Label text="Total" />
              </div>
            </Col>
            <Col>
              <div style={{ marginLeft: 15, marginTop: 10 }}>
                <Label text="Mark" />
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
                    console.log(`Date.now() `, Date.now());
                    setFormRowList((prev) => [
                      ...prev,
                      <FormRow lists={activitiesLists} key={Date.now()} />,
                    ]);
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

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Padded } from "@buffetjs/core";
import { Col, Row } from "reactstrap";
import { Dropdowns } from "../../../../../components";
import { EditCoursePaymentTable } from "../../PaymentForm";
import { getTrad } from "../../../../../utils";
import { useCRUD, endPoint } from "../../../../../hooks";
import {
  CLEAR_PAYMENT,
  REDUCER_NAME,
  UPDATE_EDIT_PAYMENT_Table,
} from "../../../../../containers/Context/Payment/constants";

const EditCoursePayment = () => {
  const dispatch = useDispatch();
  const { get } = useCRUD();
  const clear = useSelector((state) => state.get(REDUCER_NAME).clear_Payment);
  const updateTable = useSelector(
    (state) => state.get(REDUCER_NAME).update_eite_Payment_table
  );

  const [selectCourse, setSelectCourse] = useState({});
  const [courseList, setCourseList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);

  // select Studeent
  useEffect(() => {
    get(endPoint.Courses)
      .then((std) => {
        const temp = [];

        std?.forEach((i) => {
          temp.push({
            value: `${i.id}`,
            label: `${i.name} - Level ${i.level}`,
            meta: {
              id: i.id,
              name: i.name,
              lecturesTotal: i.lecturesTotal,
              numberOfLecture: i.numberOfLecture,
              finished: i.finished,
              start: i.start,
              end: i.end,
            },
          });
        });

        setCourseList(temp);
      })
      .catch((err) => {
        console.log("err in  get student by id in  useEffect :  ", err);
      });
  }, []);

  useEffect(() => {
    if (selectCourse?.value) {
      get(`${endPoint.StudentPayment}/payments-course/${selectCourse?.value}`)
        .then((paymentsCourse) => {
          setPaymentList(paymentsCourse);
        })
        .catch((err) => {
          console.log("err in  get student by id in  useEffect :  ", err);
        });
    }
  }, [selectCourse]);

  // clear
  // useEffect(() => {
  //   setSelectCourse({});
  //   dispatch({ type: CLEAR_PAYMENT, clear_Payment: false });
  // }, [clear]);

  // update Table
  useEffect(() => {
    if (updateTable) {
      getStudentCourse();

      // reset value to false
      dispatch({
        type: UPDATE_EDIT_PAYMENT_Table,
        updateTable: false,
      });
    }
  }, [updateTable]);

  const onCourseChange = (selected) => {
    setSelectCourse(selected);
  };

  return (
    <>
      <Row>
        <Col>
          <Padded id="444" left right size={"lg"}>
            <Padded id="444" left right size={"lg"}>
              <Padded id="444" left right size={"lg"}>
                <Dropdowns
                  name={"CourseList"}
                  lableTxt={"CourseList.label"}
                  value={selectCourse}
                  onValChange={onCourseChange}
                  lsit={courseList}
                  isDisabled={courseList.length === 0 ? true : false}
                />
              </Padded>
            </Padded>
          </Padded>
        </Col>
      </Row>
      <Row>
        <Col>
          <Padded top bottom size="smd">
            {paymentList?.length ? (
              <EditCoursePaymentTable
                isSearchByCourse={true}
                rows={paymentList}
              />
            ) : null}
          </Padded>
        </Col>
      </Row>
    </>
  );
};

export default EditCoursePayment;

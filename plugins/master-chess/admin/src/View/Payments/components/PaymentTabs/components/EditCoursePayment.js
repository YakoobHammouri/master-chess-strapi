import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Padded } from "@buffetjs/core";
import { Col, Row } from "reactstrap";
import { Dropdowns } from "../../../../../components";
import { EditCoursePaymentTable } from "../../PaymentForm";
import { getTrad } from "../../../../../utils";
import {
  useGetStudent,
  useGetStudentById,
  useCRUD,
  endPoint,
} from "../../../../../hooks";
import {
  CLEAR_PAYMENT,
  REDUCER_NAME,
  UPDATE_EDIT_PAYMENT_Table,
} from "../../../../../containers/Context/Payment/constants";

const TakeCoursePayment = () => {
  const dispatch = useDispatch();
  const { studentList } = useGetStudent();
  const { getStudentById } = useGetStudentById();
  const { get } = useCRUD();
  const clear = useSelector((state) => state.get(REDUCER_NAME).clear_Payment);
  const updateTable = useSelector(
    (state) => state.get(REDUCER_NAME).update_eite_Payment_table
  );

  const [selectCourse, setSelectCourse] = useState({});
  const [selectStudent, setSelectStudent] = useState(null);
  const [courseList, setCourseList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);

  const getStudentCourse = () => {
    setPaymentList([]);
    get(
      `${endPoint.StudentPayment}/student-course/${selectStudent?.value}/${selectCourse?.value}`
    )
      .then((stdPayment) => {
        setPaymentList(stdPayment);
      })
      .catch((err) => {
        console.log(`Error in get Student Payment`, err);
        strapi.notification.toggle({
          type: "warning",
          message: { id: getTrad("payment.get.student.payment.error") },
        });
      });
  };

  // select Studeent
  useEffect(() => {
    if (selectStudent?.value) {
      setSelectCourse({});
      setPaymentList([]);
      getStudentById(selectStudent.value)
        .then((std) => {
          const temp = [];

          std?.courses.forEach((i) => {
            if (i.finished === false) {
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
            }
          });

          setCourseList(temp);
        })
        .catch((err) => {
          console.log("err in  get student by id in  useEffect :  ", err);
        });
    }
  }, [selectStudent]);

  // select Course
  useEffect(() => {
    if (selectCourse?.value) {
      getStudentCourse();
    }
  }, [selectCourse]);

  // clear
  useEffect(() => {
    setSelectStudent({});
    setSelectCourse({});
    setPaymentList([]);
    dispatch({ type: CLEAR_PAYMENT, clear_Payment: false });
  }, [clear]);

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

  const onStudentChange = (selected) => {
    setSelectStudent(selected);
  };

  const onCourseChange = (selected) => {
    setSelectCourse(selected);
  };

  return (
    <>
      <Row>
        <Col>
          <Dropdowns
            name={"StudentList"}
            lableTxt={"StudentList.label"}
            value={selectStudent}
            onValChange={onStudentChange}
            lsit={studentList}
          />
        </Col>
        <Col>
          <Dropdowns
            name={"CourseList"}
            lableTxt={"CourseList.label"}
            value={selectCourse}
            onValChange={onCourseChange}
            lsit={courseList}
            isDisabled={courseList.length === 0 ? true : false}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Padded top bottom size="smd">
            {paymentList?.length ? (
              <EditCoursePaymentTable
                rows={paymentList}
                stdId={selectStudent?.value}
                course={selectCourse}
              />
            ) : null}
          </Padded>
        </Col>
      </Row>
    </>
  );
};

export default TakeCoursePayment;

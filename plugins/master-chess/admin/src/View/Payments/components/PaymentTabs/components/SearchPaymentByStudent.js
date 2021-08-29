import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { Padded } from "@buffetjs/core";
import { getTrad } from "../../../../../utils";
import { useSelector, useDispatch } from "react-redux";
import { Dropdowns } from "../../../../../components";
import { useGetStudent, useCRUD, endPoint } from "../../../../../hooks";
import BannerItem from "../../PaymentForm/BannerItem";
import {
  CLEAR_PAYMENT,
  REDUCER_NAME,
} from "../../../../../containers/Context/Payment/constants";

const SearchPaymentByStudent = () => {
  const dispatch = useDispatch();
  const { studentList } = useGetStudent();

  const { get } = useCRUD();
  const clear = useSelector((state) => state.get(REDUCER_NAME).clear_Payment);

  const [selectStudent, setSelectStudent] = useState(null);
  const [studentPaymentList, setStudentPaymentList] = useState([]);

  const buildStudentPayment = () => {
    if (studentPaymentList.length === 0) return;
    const courseList = [];

    // get Course List without duplicated
    studentPaymentList?.map((x) =>
      courseList.filter((a) => a.course.id == x.course.id).length > 0
        ? null
        : courseList.push(x)
    );

    return courseList?.map((payment, i) => {
      const tempList = studentPaymentList.filter(
        (x) => x.course.id === payment.course.id
      );
      return (
        <BannerItem
          name={payment?.course?.name ?? "---"}
          isFirst={i === 0}
          paymentList={tempList}
        />
      );
    });
  };

  // select Studeent
  useEffect(() => {
    if (selectStudent?.value) {
      get(`${endPoint.StudentPayment}/student/${selectStudent?.value}`)
        .then((stdPayment) => {
          const { data } = stdPayment;
          if (data === null) {
            strapi.notification.toggle({
              type: "warning",
              message: { id: getTrad("payment.student.no.have.record") },
            });
            return;
          }
          console.log(`stdPayment 1111`, data?.Payments);
          setStudentPaymentList(data?.Payments);
        })
        .catch((err) => {
          console.log(`Error in get Student Payment`, err);
          strapi.notification.toggle({
            type: "warning",
            message: { id: getTrad("payment.get.student.payment.error") },
          });
        });
    }
  }, [selectStudent]);

  // clear
  useEffect(() => {
    setSelectStudent({});
    dispatch({ type: CLEAR_PAYMENT, clear_Payment: false });
  }, [clear]);

  const onStudentChange = (selected) => {
    setSelectStudent(selected);
  };

  return (
    <>
      <Row>
        <Col>
          <Padded id="444" left right size={"lg"}>
            <Padded id="444" left right size={"lg"}>
              <Padded id="444" left right size={"lg"}>
                <Dropdowns
                  name={"StudentList"}
                  lableTxt={"StudentList.label"}
                  value={selectStudent}
                  onValChange={onStudentChange}
                  lsit={studentList}
                />
              </Padded>
            </Padded>
          </Padded>
        </Col>
        {/* <Col>
          <Dropdowns
            name={"CourseList"}
            lableTxt={"CourseList.label"}
            value={selectCourse}
            onValChange={onCourseChange}
            lsit={courseList}
            isDisabled={courseList.length === 0 ? true : false}
          />
        </Col> */}
      </Row>
      <Row>
        <Col>
          <Padded top bottom size="smd">
            {buildStudentPayment()}
          </Padded>
        </Col>
      </Row>
    </>
  );
};

export default SearchPaymentByStudent;

{
  /* <Banner
              category={"ttttt"}
              isFirst={true}
              isOpen={isOpen}
              onToggle={(cat) => {
                setIsOpen((prev) => !prev);
              }}
            />
            <Collapse
              isOpen={isOpen}
              onExited={() => {
                alert("onExited");
              }}
            >
              <EditCoursePaymentTable
                rows={paymentList}
                stdId={selectStudent?.value}
                course={selectCourse}
              />
            </Collapse> */
}

{
  /* <Banner
              category={"ttttt"}
              isFirst={true}
              isOpen={isOpen}
              onToggle={(cat) => {
                setIsOpen((prev) => !prev);
              }}
            />
            <Collapse
              isOpen={isOpen}
              onExited={() => {
                alert("onExited");
              }}
            >
              <EditCoursePaymentTable
                rows={paymentList}
                stdId={selectStudent?.value}
                course={selectCourse}
              />
            </Collapse> */
}
{
  /* {paymentList?.length ? (
              <EditCoursePaymentTable
                rows={paymentList}
                stdId={selectStudent?.value}
                course={selectCourse}
              />
            ) : null} */
}

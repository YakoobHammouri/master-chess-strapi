import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { isNumber } from "lodash";
import { useDispatch } from "react-redux";
import { Inputs } from "@buffetjs/custom";
import { Padded } from "@buffetjs/core";
import { SAVE_PAYMENT } from "../../../../containers/Context/Payment/constants";
import { T } from "../../../../utils";
import { useSaveNewPayment } from "../../../../hooks";

import { Col, Row } from "reactstrap";

const getCourseMonth = (date) => {
  if (!date) {
    return [];
  }

  const temp = moment(date);

  if (!temp?._isValid) {
    return [];
  }

  return temp.month();
};

function TakeCoursePayment({ stdId, course }) {
  const dispatch = useDispatch();

  const { onSubmitHandler } = useSaveNewPayment();
  const requiredText = T("paymetn.save.Required");
  const ampuntNumberText = T("paymetn.save.amount.must.number");

  const [paymentMonth, setPaymentMonth] = useState({
    value: getCourseMonth(course?.meta.start),
    error: "",
  });
  const [paymentAmount, setPaymentAmount] = useState({
    value: null,
    error: "",
  });

  const monthRef = useRef(paymentMonth);
  const amountRef = useRef(paymentAmount);

  const onPaymentMonthChange = ({ target: { value } }) => {
    setPaymentMonth((prev) => ({ ...prev, value }));
    monthRef.current.value = value;
  };

  const onPaymentAmountChange = ({ target: { value } }) => {
    setPaymentAmount((prev) => ({ ...prev, value }));
    amountRef.current.value = value;
  };

  const validateDate = async () => {
    let isValid = true;

    if (!paymentAmount.value) {
      setPaymentAmount((prev) => ({ ...prev, error: requiredText }));
      isValid = false;
    }

    if (!paymentMonth.value) {
      setPaymentMonth((prev) => ({ ...prev, error: requiredText }));
      isValid = false;
    }

    if (!isNumber(paymentAmount.value)) {
      setPaymentAmount((prev) => ({ ...prev, error: ampuntNumberText }));
      isValid = false;
    }

    if (isValid === true) {
      try {
        await onSubmitHandler(paymentAmount, paymentMonth, stdId, course);
        setPaymentAmount({
          value: null,
          error: "",
        });
      } catch (err) {
        console.log("Error in Take Course Payment From :", err);
      }
    }
  };
  // set  onSubmitHandler on save payment
  useEffect(() => {
    dispatch({
      type: SAVE_PAYMENT,
      savePament: validateDate,
    });
  }, []);

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
        <Row>
          <Col>
            <Inputs
              ref={monthRef}
              label={T("models.paymetn.take.payment.Month.Text")}
              name={"paymentMonth"}
              onChange={onPaymentMonthChange}
              description={""}
              value={paymentMonth.value}
              error={paymentMonth.error}
              type={"select"}
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              validations={{
                required: true,
              }}
            />
          </Col>
          <Col>
            <Inputs
              ref={amountRef}
              label={T("models.paymetn.take.payment.Amount.Text")}
              name={"paymentAmount"}
              description={""}
              placeholder={"₪"}
              onChange={onPaymentAmountChange}
              value={paymentAmount.value}
              error={paymentAmount.error}
              type={"number"}
              validations={{
                required: true,
              }}
            />
          </Col>
        </Row>
      </Padded>
    </div>
  );
}

export default TakeCoursePayment;

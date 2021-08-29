import React from "react";
import moment from "moment";
import { getTrad } from "../../utils";
import { endPoint, useCRUD } from "..";
import { useDispatch } from "react-redux";
import {
  SAVE_PAYMENT_LOADING,
  CLEAR_PAYMENT,
} from "../../containers/Context/Payment/constants";
const _onSubmitHandler = async (
  add,
  get,
  edit,
  dispatch,
  paymentAmount,
  paymentMonth,
  stdId,
  course
) => {
  const ok = confirm("Are you sure to save the Payment?");

  if (ok) {
    try {
      dispatch({
        type: SAVE_PAYMENT_LOADING,
        saveLoading: true,
      });

      const tempStdPayment = await get(
        `${endPoint.StudentPayment}?student=${stdId}`
      );

      // the Student not Have the student payemt
      // add Student Payment
      if (tempStdPayment.length === 0) {
        const obj = {
          student: stdId,
          Payments: [
            {
              amount: paymentAmount.value,
              course: {
                id: course.value,
              },
              date: new moment()._d,
              month: paymentMonth.value,
              courseName: course.meta.name,
            },
          ],
        };

        await add(endPoint.StudentPayment, obj);

        dispatch({
          type: SAVE_PAYMENT_LOADING,
          saveLoading: false,
        });

        strapi.notification.toggle({
          type: "success",
          message: { id: getTrad("takePayment.success") },
        });
      } else {
        // Student have Payment Record
        // add new Payment to Student Payment Record
        const obj = {
          amount: paymentAmount.value,
          course: {
            id: course.value,
          },
          date: new moment()._d,
          month: paymentMonth.value,
          courseName: course.meta.name,
        };
        const record = tempStdPayment[0];
        record.Payments.push(obj);
        await edit(`${endPoint.StudentPayment}/${record?.id}`, record);

        dispatch({
          type: SAVE_PAYMENT_LOADING,
          saveLoading: false,
        });

        strapi.notification.toggle({
          type: "success",
          message: { id: getTrad("takePayment.success") },
        });
      }
    } catch (err) {
      console.log("Error in temp Std Payment  : ", err);
      strapi.notification.toggle({
        type: "warning",
        message: { id: getTrad("payment.get.student.payment.error") },
      });
    }
  }
};
function useSaveNewPayment() {
  const { add, get, edit } = useCRUD();
  const dispatch = useDispatch();
  const onSubmitHandler = async (
    paymentAmount,
    paymentMonth,
    stdId,
    course
  ) => {
    return new Promise(async (r, rej) => {
      try {
        const result = await _onSubmitHandler(
          add,
          get,
          edit,
          dispatch,
          paymentAmount,
          paymentMonth,
          stdId,
          course
        );

        dispatch({ type: CLEAR_PAYMENT, clear_Payment: true });

        r(result);
      } catch (err) {
        console.log(`err use Save New Payment`, err);
        rej(err);
      }
    });
  };

  return { onSubmitHandler };
}

export default useSaveNewPayment;

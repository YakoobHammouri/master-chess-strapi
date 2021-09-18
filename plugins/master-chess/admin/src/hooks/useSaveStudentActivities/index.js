import React from "react";
import moment from "moment";
import { getTrad } from "../../utils";
import { endPoint, useCRUD } from "..";
import { useDispatch } from "react-redux";
import {
  SAVE_ACTIVITIE_LOADING,
  CLEAR_ACTIVITIE,
} from "../../containers/Context/StudentActivities/constants";
const _onSaveHandler = async (
  add,
  get,
  edit,
  dispatch,
  activiteObj,
  stdId,
  course
) => {
  const ok = confirm("Are you sure to save the Payment?");

  if (ok) {
    try {
      dispatch({
        type: SAVE_ACTIVITIE_LOADING,
        saveLoading: true,
      });

      const { data } = await get(
        `${endPoint.StudentActivities}/student/${stdId}`
      );

      // the Student not Have the student payemt
      // add Student Payment
      if (data === null) {
        const obj = {
          student: stdId,
          activities: [activiteObj],
        };

        console.log(`obj`, obj);
        await add(endPoint.StudentActivities, obj);

        dispatch({
          type: SAVE_ACTIVITIE_LOADING,
          saveLoading: false,
        });

        strapi.notification.toggle({
          type: "success",
          message: { id: getTrad("takeActivities.success") },
        });
      } else {
        // Student have Payment Record
        // add new Payment to Student Payment Record
        // const obj = {
        //   amount: paymentAmount.value,
        //   course: {
        //     id: course.value,
        //   },
        //   date: paymentDate.value._d,
        //   // date: new moment()._d,
        //   month: paymentMonth.value,
        //   courseName: course.meta.name,
        // };
        // data.Payments.push(obj);
        // await edit(`${endPoint.StudentPayment}/${data?.id}`, data);
        // dispatch({
        //   type: SAVE_PAYMENT_LOADING,
        //   saveLoading: false,
        // });
        // strapi.notification.toggle({
        //   type: "success",
        //   message: { id: getTrad("takePayment.success") },
        // });
      }
    } catch (err) {
      console.log("Error in temp Std Payment  : ", err);
      strapi.notification.toggle({
        type: "warning",
        message: { id: getTrad("activities.get.student.activities.error") },
      });

      dispatch({
        type: SAVE_ACTIVITIE_LOADING,
        saveLoading: false,
      });
    }
  }
};

const _onEditHandler = async (
  get,
  edit,
  dispatch,
  paymentAmount,
  paymentMonth,
  paymentDate,
  stdId,
  course,
  paymentId
) => {
  const ok = confirm("Are you sure to update the Payment?");

  if (ok) {
    try {
      dispatch({
        type: SAVE_PAYMENT_LOADING,
        saveLoading: true,
      });
      const { data } = await get(`${endPoint.StudentPayment}/student/${stdId}`);

      // if length === 0 then student not have payment Record
      if (data === null) {
        strapi.notification.toggle({
          type: "warning",
          message: { id: getTrad("payment.student.no.have.record") },
        });
      } else {
        // Student have Payment Record
        // add new Payment to Student Payment Record
        const index = data.Payments.findIndex((t) => t.id === paymentId);
        const obj = data.Payments[index];
        obj.amount = paymentAmount.value;
        obj.month = paymentMonth.value;
        obj.date = paymentDate.value._d;
        console.log(`obj 111111111`, obj);
        data.Payments[index] = obj;
        await edit(`${endPoint.StudentPayment}/${data?.id}`, data);
        dispatch({
          type: SAVE_PAYMENT_LOADING,
          saveLoading: false,
        });

        dispatch({
          type: UPDATE_EDIT_PAYMENT_Table,
          updateTable: true,
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
      dispatch({
        type: SAVE_PAYMENT_LOADING,
        saveLoading: false,
      });
    }
  }
};

function useSaveStudentActivities() {
  const { add, get, edit } = useCRUD();
  const dispatch = useDispatch();
  const onSaveHandler = async (obj, stdId, course) => {
    return new Promise(async (r, rej) => {
      try {
        const result = await _onSaveHandler(
          add,
          get,
          edit,
          dispatch,
          obj,
          stdId,
          course
        );

        dispatch({ type: CLEAR_ACTIVITIE, clear_StudentActivities: true });

        r(result);
      } catch (err) {
        console.log(`err use Save New Payment`, err);
        rej(err);
      }
    });
  };

  const onEditHandler = async (
    paymentAmount,
    paymentMonth,
    paymentDate,
    stdId,
    course,
    paymentId
  ) => {
    return new Promise(async (r, rej) => {
      try {
        const result = await _onEditHandler(
          get,
          edit,
          dispatch,
          paymentAmount,
          paymentMonth,
          paymentDate,
          stdId,
          course,
          paymentId
        );

        // dispatch({ type: CLEAR_PAYMENT, clear_Payment: true });

        r(result);
      } catch (err) {
        console.log(`err use Save New Payment`, err);
        rej(err);
      }
    });
  };

  return { onSaveHandler, onEditHandler };
}

export default useSaveStudentActivities;

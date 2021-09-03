import { useEffect, useState } from "react";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";
import {
  STUDENT_LiST,
  REDUCER_NAME,
} from "../../containers/Context/Attendances/constants";
import { useDispatch, useSelector } from "react-redux";

const fetchStudentList = async () => {
  try {
    const data = await request("/students", {
      method: "GET",
    });
    return data;
  } catch (e) {
    console.log("Error in load product : ", e);
    strapi.notification.toggle({
      type: "warning",
      message: { id: getTrad("CenterList.error.onload") },
    });
    return null;
  }
};

const useGetStudent = () => {
  const dispatch = useDispatch();

  const studentList = useSelector(
    (state) => state.get(REDUCER_NAME).studentList
  );

  const loadStudentList = () => {
    fetchStudentList()
      .then((std) => {
        if (!std) {
          return;
        }

        const stdList = std.map((prod) => {
          return {
            value: `${prod.id}`,
            label: prod.name,
          };
        });
        dispatch({ type: STUDENT_LiST, stdList });
        return stdList;
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  };

  useEffect(() => {
    loadStudentList();
    // fetchStudentList()
    //   .then((std) => {
    //     if (!std) {
    //       return;
    //     }

    //     const stdList = std.map((prod) => {
    //       return {
    //         value: `${prod.id}`,
    //         label: prod.name,
    //       };
    //     });
    //     dispatch({ type: STUDENT_LiST, stdList });
    //     return stdList;
    //   })
    //   .catch((err) => {
    //     console.log(`err`, err);
    //   });
  }, []);

  return { studentList, loadStudentList };
};

export default useGetStudent;

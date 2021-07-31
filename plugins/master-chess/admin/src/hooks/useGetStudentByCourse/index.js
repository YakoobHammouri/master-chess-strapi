import { useEffect, useState } from "react";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";
import { STUDENT_COURSE_LIST, REDUCER_NAME } from "../constants";
import { useDispatch, useSelector } from "react-redux";

const fetchStudentCoursesList = async (courseid) => {
  try {
    ///students?courses=1
    const data = await request(`/students?courses=${courseid}`, {
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

const useGetStudentByCourse = () => {
  const dispatch = useDispatch();

  const getStudentCourseList = async (courseid) => {
    return new Promise(async (r, rej) => {
      try {
        const stdCourse = await fetchStudentCoursesList(courseid);
        if (!stdCourse) {
          return;
        }
        const aStdCourse = stdCourse.map((prod) => {
          return {
            id: `${prod.id}`,
            name: prod.name,
            Attendances: false,
          };
        });
        dispatch({ type: STUDENT_COURSE_LIST, studCourse: aStdCourse });
        r(aStdCourse);
      } catch (err) {
        console.log(`err in get Course`, err);
        rej(err);
      }
    });
  };

  return { getStudentCourseList };
};

export default useGetStudentByCourse;

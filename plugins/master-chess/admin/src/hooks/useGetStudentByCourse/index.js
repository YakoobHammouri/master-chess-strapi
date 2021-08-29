import { useEffect, useState } from "react";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";
import {
  STUDENT_COURSE_LIST,
  REDUCER_NAME,
} from "../../containers/Context/Attendances/constants";
import { useDispatch, useSelector } from "react-redux";

const fetchStudentCoursesList = async (courseid) => {
  try {
    ///students?courses=1
    const data = await request(`/courses/${courseid}`, {
      method: "GET",
    });
    return data?.students;
  } catch (e) {
    console.log("Error in load students : ", e);
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
            student: `${prod.id}`,
            studentName: prod.name,
            attendance: false,
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

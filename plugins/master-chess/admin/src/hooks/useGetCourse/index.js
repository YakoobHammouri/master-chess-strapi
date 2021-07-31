import { useEffect, useState } from "react";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";
import { COURSE_LIST, REDUCER_NAME } from "../constants";
import { useDispatch, useSelector } from "react-redux";

const fetchCoursesList = async (centerid) => {
  try {
    const data = await request(`/courses?center=${centerid}`, {
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

const useGetCourses = () => {
  const dispatch = useDispatch();
  const getCourseList = async (centerid) => {
    return new Promise(async (r, rej) => {
      try {
        const course = await fetchCoursesList(centerid);
        if (!course) {
          return;
        }
        const acourse = course.map((prod) => {
          return {
            value: `${prod.id}`,
            label: `${prod.name} - Level ${prod.level}`,
          };
        });
        dispatch({ type: COURSE_LIST, acourse });
        r(acourse);
      } catch (err) {
        console.log(`err in get Course`, err);
        rej(err);
      }
    });
  };

  return { getCourseList };
};

export default useGetCourses;

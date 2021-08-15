import { useEffect, useState } from "react";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";
import { COURSE_LIST, REDUCER_NAME } from "../constants";
import { useDispatch } from "react-redux";

const fetchCoursesList = async (centerid, isfinished) => {
  try {
    const url =
      isfinished === false
        ? `/courses?center=${centerid}&finished=${isfinished}`
        : `/courses?center=${centerid}`;

    const data = await request(url, {
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
  const getCourseList = async (centerid, isfinished) => {
    return new Promise(async (r, rej) => {
      try {
        const course = await fetchCoursesList(centerid, isfinished);
        if (!course) {
          return;
        }
        const acourse = course.map((prod) => {
          return {
            value: `${prod.id}`,
            label: `${prod.name} - Level ${prod.level}`,
            meta: {
              lecturesTotal: prod.lecturesTotal,
              numberOfLecture: prod.numberOfLecture,
              finished: prod.finished,
            },
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

import React from "react";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";

const fetchCourseById = async (id) => {
  try {
    const data = await request(`/courses/${id}`, {
      method: "GET",
    });
    return data;
  } catch (e) {
    console.log("Error in get Course by id : ", e);
    strapi.notification.toggle({
      type: "warning",
      message: { id: getTrad("CenterList.error.onload") },
    });
    return null;
  }
};

const useGetCourseById = () => {
  const getCourseById = async (id) => {
    return new Promise(async (r, rej) => {
      try {
        const course = await fetchCourseById(id);
        if (!course) {
          r(null);
        }
        r(course);
      } catch (err) {
        console.log(`err in get Course by id`, err);
        rej(err);
      }
    });
  };

  return { getCourseById };
};

export default useGetCourseById;

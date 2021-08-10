import React from "react";
import moment from "moment";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";
import { STUDENT_COURSE_LIST, REDUCER_NAME } from "../constants";
import { useDispatch, useSelector } from "react-redux";

const fetchGetAttendancesList = async (courseid) => {
  try {
    ///students?courses=1

    const data = await request(`/attendances?course=${courseid}`, {
      method: "GET",
    });
    return data;
  } catch (e) {
    console.log("Error in load Attendances List : ", e);
    strapi.notification.toggle({
      type: "warning",
      message: { id: getTrad("CenterList.error.onload") },
    });
    return null;
  }
};

const useGetAttendancesList = () => {
  const dispatch = useDispatch();

  const getAttendancesList = async (courseid) => {
    return new Promise(async (r, rej) => {
      try {
        const attList = await fetchGetAttendancesList(courseid);
        if (!attList) {
          return;
        }

        const _attList = attList?.map((prod) => {
          return {
            id: `${prod.id}`,
            date: moment(prod.Date).format("DD/MM/YYYY hh:mm A"),
          };
        });

        console.log(`attList 11 :`, _attList);

        // dispatch({ type: STUDENT_COURSE_LIST, studCourse: aStdCourse });
        r(_attList);
      } catch (err) {
        console.log(`err in get Course`, err);
        rej(err);
      }
    });
  };

  return { getAttendancesList };
};

export default useGetAttendancesList;

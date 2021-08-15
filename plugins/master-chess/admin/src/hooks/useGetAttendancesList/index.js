import React from "react";
import moment from "moment";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";
import { ATTENDANCE_LEST, REDUCER_NAME } from "../constants";
import { useDispatch, useSelector } from "react-redux";

const fetchGetAttendancesList = async (courseid) => {
  try {
    const data = await request(
      `/attendances?course=${courseid}&_sort=Date:ASC`,
      {
        method: "GET",
      }
    );
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
            value: `${prod.id}`,
            label: `${moment(prod?.Date)
              .locale("en")
              .format("dddd")} - ${moment(prod?.Date)
              .format("DD/MM/YYYY")
              .toString()}`,
          };
        });

        dispatch({ type: ATTENDANCE_LEST, attendlist: _attList });
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

import React from "react";
import moment from "moment";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";

import { useDispatch, useSelector } from "react-redux";

const fetchGetAttendancesById = async (byId, byQuery) => {
  try {
    const url = byQuery ? `/attendances${byQuery}` : `/attendances/${byId}`;
    // old url : `/attendances/${byId}`
    const data = await request(url, {
      method: "GET",
    });
    return data;
  } catch (e) {
    console.log("Error in load Attendances by ID : ", e);
    strapi.notification.toggle({
      type: "warning",
      message: { id: getTrad("CenterList.error.onload") },
    });
    return null;
  }
};

const useGetAttendancesById = () => {
  const dispatch = useDispatch();

  const getAttendancesById = async (id, query) => {
    return new Promise(async (r, rej) => {
      try {
        const attbyid = await fetchGetAttendancesById(id, query);
        if (!attbyid) {
          r(null);
        }

        r(attbyid);
      } catch (err) {
        console.log(`err in get Course`, err);
        rej(err);
      }
    });
  };

  return { getAttendancesById };
};

export default useGetAttendancesById;

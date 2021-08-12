import React from "react";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";

import { useDispatch } from "react-redux";

const useEditAttendances = () => {
  const editAttendances = async (id, obj) => {
    return new Promise(async (r, rej) => {
      try {
        const data = await request(`/attendances/${id}`, {
          method: "PUT",
          body: obj,
        });
        console.log("Data edit Attend 11 : ", data);
        strapi.notification.toggle({
          type: "success",
          message: { id: getTrad("takeAttendances.success") },
        });
        r("ok");
      } catch (e) {
        console.log("Error in edit Attendances : ", e);
        strapi.notification.toggle({
          type: "warning",
          message: { id: getTrad("takeAttendances.error") },
        });
        rej(err);
      }
    });
  };

  return { editAttendances };
};

export default useEditAttendances;

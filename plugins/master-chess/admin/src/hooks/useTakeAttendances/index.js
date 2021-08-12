import React from "react";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";

import { useDispatch } from "react-redux";

const useTakeAttendances = () => {
  const takeAttendances = async (obj) => {
    return new Promise(async (r, rej) => {
      try {
        const data = await request(
          `/attendances
        `,
          {
            method: "POST",
            body: obj,
          }
        );
        strapi.notification.toggle({
          type: "success",
          message: { id: getTrad("takeAttendances.success") },
        });
        r("ok");
      } catch (e) {
        console.log("Error in takeAttendances : ", e);
        strapi.notification.toggle({
          type: "warning",
          message: { id: getTrad("takeAttendances.error") },
        });
        rej(err);
      }
    });
  };

  return { takeAttendances };
};

export default useTakeAttendances;

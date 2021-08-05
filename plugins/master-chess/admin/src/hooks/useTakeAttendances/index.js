import { useEffect, useState } from "react";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";
import { STUDENT_COURSE_LIST, REDUCER_NAME } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import pluginId from "../../pluginId";

const _takeAttendances = async (obj) => {};

const useTakeAttendances = () => {
  const dispatch = useDispatch();

  const takeAttendances = async (obj) => {
    return new Promise(async (r, rej) => {
      try {
        console.log(`obj 1111`, obj);
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

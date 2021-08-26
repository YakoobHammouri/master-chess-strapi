import React from "react";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";

/*
general Component for Edit  
*/
const useGet = () => {
  const get = async (url) => {
    return new Promise(async (r, rej) => {
      try {
        const data = await request(url, {
          method: "GET",
        });
        strapi.notification.toggle({
          type: "success",
          message: { id: getTrad("edit.success") },
        });
        r(data);
      } catch (e) {
        console.log("Error in edit  : ", e);
        strapi.notification.toggle({
          type: "warning",
          message: { id: getTrad("edit.error") },
        });
        rej(err);
      }
    });
  };

  return { get };
};

export default useGet;

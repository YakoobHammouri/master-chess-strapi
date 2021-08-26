import React from "react";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";

/*
general Component for Edit  
*/
const useAdd = () => {
  const add = async (url, obj) => {
    return new Promise(async (r, rej) => {
      try {
        const data = await request(url, {
          method: "POST",
          body: obj,
        });
        strapi.notification.toggle({
          type: "success",
          message: { id: getTrad("edit.success") },
        });
        r("ok");
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

  return { add };
};

export default useAdd;
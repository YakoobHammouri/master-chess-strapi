import React from "react";
import { request } from "strapi-helper-plugin";

const useCRUD = () => {
  const PromiseFun = (type, url, obj) =>
    new Promise(async (r, rej) => {
      try {
        const data = await request(url, {
          method: type,
          body: obj,
        });
        r(data);
      } catch (e) {
        rej(e);
      }
    });

  const add = async (url, obj) => PromiseFun("POST", url, obj);

  const edit = async (url, obj) => PromiseFun("PUT", url, obj);

  const get = async (url) => PromiseFun("GET", url);

  return { add, edit, get };
};

export default useCRUD;

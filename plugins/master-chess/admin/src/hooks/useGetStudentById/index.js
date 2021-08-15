import { useEffect, useState } from "react";
import { request } from "strapi-helper-plugin";
import getTrad from "../../utils/getTrad";
import { SELECT_STUDENT_By_ID } from "../constants";
import { useDispatch, useSelector } from "react-redux";

const fetchStudentList = async (stdId) => {
  try {
    const data = await request(`/students/${stdId}`, {
      method: "GET",
    });
    return data;
  } catch (e) {
    console.log("Error in load product : ", e);
    strapi.notification.toggle({
      type: "warning",
      message: { id: getTrad("CenterList.error.onload") },
    });
    return null;
  }
};

const useGetStudentById = () => {
  const dispatch = useDispatch();

  const getStudentById = async (stdId) => {
    return new Promise(async (r, rej) => {
      try {
        const std = await fetchStudentList(stdId);
        if (!std) {
          r(null);
        }
        dispatch({ type: SELECT_STUDENT_By_ID, std });
        r(std);
      } catch (err) {
        console.log(`err in get Student by Id`, err);
        rej(err);
      }
    });
  };

  return { getStudentById };
};

export default useGetStudentById;

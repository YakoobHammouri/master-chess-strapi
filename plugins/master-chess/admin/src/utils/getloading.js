import React from "react";
import { useSelector } from "react-redux";

import { REDUCER_NAME } from "../containers/Context/Attendances/constants";

export default function () {
  return useSelector((state) => state.get(REDUCER_NAME).isLoading) ?? false;
}

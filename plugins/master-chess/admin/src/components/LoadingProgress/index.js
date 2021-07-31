import React from "react";
import { useSelector } from "react-redux";
import { LoadingBar, LoadingIndicator } from "@buffetjs/styles";

import { REDUCER_NAME } from "../../hooks/constants";

function LoadingStatusa({ indicator }) {
  const isLoading = useSelector((state) => state.get(REDUCER_NAME).isLoading);
  return isLoading ? (
    indicator ? (
      <LoadingIndicator
        animationTime="0.6s"
        borderWidth="4px"
        borderColor="#f3f3f3"
        borderTopColor="#555555"
        size="26px"
      />
    ) : (
      <LoadingBar />
    )
  ) : (
    ""
  );
}

export default LoadingStatusa;

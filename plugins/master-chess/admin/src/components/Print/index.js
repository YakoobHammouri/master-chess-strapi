import React from "react";
import axios from "axios";
import { Button } from "@buffetjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileWord } from "@fortawesome/free-solid-svg-icons";
import { T } from "../../utils";
import { getTrad } from "../../utils";

const Print = async (url, obj, LoadingHandler) => {
  LoadingHandler(true);
  axios
    .post(url, obj, {
      responseType: "blob",
    })
    .then((respones) => {
      const url = window.URL.createObjectURL(new Blob([respones.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${obj.center}-${obj.course}-${obj.sdate}-${respones?.headers?.["content-disposition"]}`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      LoadingHandler(false);
      return "Ok";
    })
    .catch((err) => {
      console.error("Eroro :", err);
      LoadingHandler(false);
    });
};

function index({ color, obj, isLoading, LoadingHandler, isDocx }) {
  return (
    <Button
      color={color ?? "secondary"}
      icon={<FontAwesomeIcon icon={isDocx ? faFileWord : faFilePdf} />}
      label={`${T("attend.text.print")} ${isDocx ? "word" : "pdf"}`}
      isLoading={isLoading}
      onClick={async () => {
        if (isDocx) {
          await Print("/master-chess/attend-word", obj, LoadingHandler);
        } else {
          await Print("/master-chess/attend-pdf", obj, LoadingHandler);
        }
      }}
    />
  );
}

export default index;

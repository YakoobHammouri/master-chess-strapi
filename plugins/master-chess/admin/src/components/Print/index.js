import React from "react";
import axios from "axios";
import { Button } from "@buffetjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileWord } from "@fortawesome/free-solid-svg-icons";
import { T } from "../../utils";
import { getTrad } from "../../utils";

const Print = async (url, obj, LoadingHandler, type, ft) => {
  LoadingHandler(true, ft);
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
        `${obj.center}-${obj.course}-${obj.sdate}-${type}-${respones?.headers?.["content-disposition"]}`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      strapi.notification.toggle({
        type: "success",
        message: { id: getTrad("create.file.success") },
      });

      return "Ok";
    })
    .catch((err) => {
      console.error("Eroro :", err);
      strapi.notification.toggle({
        type: "warning",
        message: { id: getTrad("create.file.error") },
      });
    })
    .finally(() => {
      LoadingHandler(false, ft);
    });
};

function index({
  color,
  obj,
  isLoading,
  LoadingHandler,
  isDocx,
  isPayment,
  type,
}) {
  return (
    <Button
      color={color ?? "secondary"}
      icon={<FontAwesomeIcon icon={isDocx ? faFileWord : faFilePdf} />}
      label={`${T("attend.text.print")} ${isDocx ? "word" : "pdf"}`}
      isLoading={isLoading}
      onClick={async () => {
        if (isDocx) {
          await Print(
            "/master-chess/attend-word",
            obj,
            LoadingHandler,
            type,
            "docx"
          );
        } else if (isPayment) {
          await Print(
            "/master-chess/payment-pdf",
            obj,
            LoadingHandler,
            type,
            "pdf"
          );
        } else {
          await Print(
            "/master-chess/attend-pdf",
            obj,
            LoadingHandler,
            type,
            "pdf"
          );
        }
      }}
    />
  );
}

export default index;

import React from "react";
import axios from "axios";
import { Button } from "@buffetjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { T } from "../../utils";

function pdf({ color, obj, isLoading, LoadingHandler }) {
  return (
    <Button
      color={color ?? "secondary"}
      icon={<FontAwesomeIcon icon={faFilePdf} />}
      label={T("attend.text.print")}
      isLoading={isLoading}
      onClick={async () => {
        LoadingHandler(true);

        axios
          .post("/master-chess/attend-pdf", obj, {
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

            strapi.notification.toggle({
              type: "success",
              message: {
                id: getTrad("Generate.code.modal.create.success"),
              },
            });
            LoadingHandler(false);
            return "Ok";
          })
          .catch((err) => {
            console.error("Eroro :", err);
            LoadingHandler(false);
          });
      }}
    />
  );
}

export default pdf;

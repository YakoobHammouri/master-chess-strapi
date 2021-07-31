import React from "react";
import { Header } from "@buffetjs/custom";

function AttendancesHeader() {
  return (
    <Header
      actions={[
        {
          label: "Cancel",
          onClick: () => alert("Cancel button clicked"),
          color: "cancel",
          type: "button",
        },
        {
          label: "Save",
          onClick: () => alert("Save button clicked"),
          color: "success",
          type: "submit",
        },
      ]}
      title={{
        label: "Course Attendances",
        // cta: {
        //   icon: "fa fa-pencil",
        //   onClick: () => alert("Edit button clicked"),
        // },
      }}
      content="choose the center and course To take attendance "
    />
  );
}

export default AttendancesHeader;

import React, { useState } from "react";
import { Toggle } from "@buffetjs/core";
import { T } from "../../../../utils";
const ToggleAttendances = ({ attendances, onArttChange, isDisabled }) => {
  return (
    <Toggle
      name="toggle"
      onChange={({ target: { value } }) => onArttChange(value)}
      value={attendances}
      leftLabel={T("attendances.text.NO")}
      rightLabel={T("attendances.text.Yes")}
      disabled={isDisabled}
    />
  );
};

export default ToggleAttendances;

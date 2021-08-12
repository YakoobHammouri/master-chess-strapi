import React, { useState } from "react";
import { Toggle } from "@buffetjs/core";
const ToggleAttendances = ({ attendances, onArttChange, isDisabled }) => {
  return (
    <Toggle
      name="toggle"
      onChange={({ target: { value } }) => onArttChange(value)}
      value={attendances}
      leftLabel={"No"}
      rightLabel={"Yes"}
      disabled={isDisabled}
    />
  );
};

export default ToggleAttendances;

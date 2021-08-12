import React, { useState } from "react";
import { Toggle } from "@buffetjs/core";
const ToggleAttendances = ({ attendances, onArttChange }) => {
  return (
    <Toggle
      name="toggle"
      onChange={({ target: { value } }) => onArttChange(value)}
      value={attendances}
      leftLabel={"No"}
      rightLabel={"Yes"}
    />
  );
};

export default ToggleAttendances;

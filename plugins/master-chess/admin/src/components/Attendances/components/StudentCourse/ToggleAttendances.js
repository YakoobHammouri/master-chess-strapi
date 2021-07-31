import React, { useState } from "react";
import { Toggle } from "@buffetjs/core";
const ToggleAttendances = ({ attendances, onChange }) => {
  // const [val, setValue] = useState(attendances);

  return (
    <Toggle
      name="toggle"
      onChange={({ target: { value } }) => onChange(value)}
      value={attendances}
      leftLabel={"No"}
      rightLabel={"Yes"}
    />
  );
};

export default ToggleAttendances;

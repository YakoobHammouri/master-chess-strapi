import React from "react";
import { CustomRow as Row } from "@buffetjs/styles";
import ToggleAttendances from "./ToggleAttendances";
const CustomRow = ({ row }) => {
  const { id, name, Attendances } = row;

  return (
    <Row>
      <td>
        <p>{id}</p>
      </td>
      <td>
        <p>{name}</p>
      </td>
      <td>
        {/*
        
        //TODO : 
         1- opne reducse to update Attendances
         2 - at finish click save
         3- in save get data with  Attendances from reduser to crater in  Attendances list
        
        */}
        <ToggleAttendances
          attendances={Attendances}
          onChange={(value) => {
            setValue(value);
          }}
        />
      </td>
    </Row>
  );
};

export default CustomRow;

import React from "react";
import Wrapper from "./Wrapper";
import { Label } from "..";
import T from "../../utils/T";
import { DatePicker } from "@buffetjs/core";
import { BaselineAlignment } from "strapi-helper-plugin";

const Index = ({ name, labelText, dateVal, onChangeDate }) => {
  return (
    <Wrapper>
      <span id="locale-code">
        <Label for={name} text={T(labelText)} />
      </span>
      <BaselineAlignment top size="5px" />
      <DatePicker
        name={name}
        onChange={({ target }) => onChangeDate(target.value)}
        value={dateVal}
        displayFormat={"DD/MM/YYYY"}
      />
    </Wrapper>
  );
};

export default Index;

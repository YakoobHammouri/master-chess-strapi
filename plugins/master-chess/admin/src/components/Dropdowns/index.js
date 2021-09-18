import React from "react";
import getloading from "../../utils/getloading";
import Select from "react-select";
import Wrapper from "./Wrapper";
import Label from "../Label";
import T from "../../utils/T";
import { BaselineAlignment } from "strapi-helper-plugin";
import { ErrorMessage } from "@buffetjs/styles";

const index = ({
  name,
  lableTxt,
  errorTxt,
  lsit,
  value,
  onValChange,
  isDisabled,
  defaultValue,
}) => {
  return (
    <Wrapper>
      <span id="locale-code">
        <Label htmlFor={name} text={lableTxt ? T(lableTxt) : ""} />
      </span>
      <BaselineAlignment top size="10px" />
      <Select
        className="basic-single"
        classNamePrefix="select"
        isLoading={getloading()}
        isClearable={true}
        isSearchable={true}
        name={name}
        options={lsit}
        value={value}
        onChange={onValChange}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
      />
      <BaselineAlignment bottom size="10px" />
      {errorTxt ? <ErrorMessage>{errorTxt}</ErrorMessage> : ""}
    </Wrapper>
  );
};
export default index;

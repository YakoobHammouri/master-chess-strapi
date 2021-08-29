import React from "react";
import getloading from "../../utils/getloading";
import Select from "react-select";
import Wrapper from "./Wrapper";
import Label from "../Label";
import T from "../../utils/T";
import { BaselineAlignment } from "strapi-helper-plugin";

const index = ({
  name,
  lableTxt,
  lsit,
  value,
  onValChange,
  isDisabled,
  defaultValue,
}) => {
  return (
    <Wrapper>
      <span id="locale-code">
        <Label for={name} text={T(lableTxt)} />
      </span>
      <BaselineAlignment top size="5px" />
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
    </Wrapper>
  );
};
export default index;

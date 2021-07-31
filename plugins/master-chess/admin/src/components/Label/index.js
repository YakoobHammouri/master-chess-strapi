import React from "react";
import styled from "styled-components";
import { themePropTypes } from "strapi-helper-plugin";
import { Label } from "@buffetjs/core";

{
  /* <Label htmlFor="ProductList">{labelText}</Label>; */
}

const index = styled((props) => (
  <Label htmlFor={props.for} fontSize="md" {...props}>
    {props.text}
  </Label>
))`
  margin-bottom: 12px;
  padding: 0;
`;

index.propTypes = {
  ...themePropTypes,
};

export default index;

import React from "react";
import styled from "styled-components";
import { themePropTypes } from "strapi-helper-plugin";

import { Text } from "@buffetjs/core";

const Wrapper = styled((props) => <Text as="ul" fontSize="md" {...props} />)`
  margin-bottom: 24px;
  padding: 0;
  min-width: 230px;
  list-style-type: none;
  padding: 0px 15px;
  // background-color: ${({ theme }) => theme.main.colors.white};
`;

Wrapper.propTypes = {
  ...themePropTypes,
};

export default Wrapper;

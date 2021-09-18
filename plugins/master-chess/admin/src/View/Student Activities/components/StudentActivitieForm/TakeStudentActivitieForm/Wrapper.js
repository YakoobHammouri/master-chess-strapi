import React from "react";
import styled from "styled-components";
import { colors } from "strapi-helper-plugin";
const Wrapper = styled.div`
  padding-top: 30px;
  display: flex;
  justify-content: center;
  > * {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const AddButtonWrapper = styled.div`
  position: relative;
  padding-top: 5px;
  padding-bottom: 3px;
  text-align: center;
  width: 100%;
  margin-top: 30px;
  button {
    &:not(.isOpen):hover + .info {
      display: block;
    }
  }
`;

const P = styled.p`
  color: ${colors.blue};
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  > svg {
    margin-right: 7px;
    vertical-align: initial;
    -webkit-font-smoothing: subpixel-antialiased;
  }
  > * {
    /* margin-left: 5px; */
    margin-right: 10px;
  }
`;

const Plus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  background-color: #f3f4f4;
  border-radius: 50%;
  text-align: center;
`;

export { Wrapper, AddButtonWrapper, P, Plus };

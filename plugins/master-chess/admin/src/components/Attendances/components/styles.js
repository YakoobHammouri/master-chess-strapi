import styled, { css } from "styled-components";

import { TabsNav } from "strapi-helper-plugin";

const TitleTabWrapper = styled.div`
  text-transform: capitalize;
  &:hover,
  :focus,
  :active {
    color: #007eff;
  }

  &:before {
    padding: 0px 10px;
    font-family: "FontAwesome";

    ${({ type }) => {
      if (type === "take") {
        return css`
          content: "\f56c";
          // color: #42b88e;
        `;
      }

      if (type === "search") {
        return css`
          content: "\f00e";
          // color: #42b88e;
        `;
      }

      if (type === "cousearch") {
        return css`
          content: "\f5da";
          // color: #42b88e;
        `;
      }

      if (type === "edit") {
        return css`
          content: "\f044";
          // color: #42b88e;
        `;
      }
      if (type === "stdsearch") {
        return css`
          content: "\f4fd";
          // color: #42b88e;
        `;
      }

      return css`
        content: "\f121";
        color: #f0811e;
      `;
    }}
  }
`;

export { TitleTabWrapper };

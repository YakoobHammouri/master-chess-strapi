import styled, { css } from "styled-components";

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
        `;
      }

      if (type === "search") {
        return css`
          content: "\f00e";
        `;
      }

      if (type === "cousearch") {
        return css`
          content: "\f5da";
        `;
      }

      if (type === "edit") {
        return css`
          content: "\f044";
        `;
      }
      if (type === "stdsearch") {
        return css`
          content: "\f4fd";
        `;
      }
      if (type === "coursePayment") {
        return css`
          content: "\f571";
        `;
      }

      if (type === "searchstdPayment") {
        return css`
          content: "\f688";
        `;
      }
      if (type === "searchcoursePayment") {
        return css`
          content: "\f662";
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

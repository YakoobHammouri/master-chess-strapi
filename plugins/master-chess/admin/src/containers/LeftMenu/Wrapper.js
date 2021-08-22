import styled from "styled-components";
import { colors, sizes } from "strapi-helper-plugin";
const Wrapper = styled.div`
  width: 100%;
  padding: 4rem 4rem 4rem;
  background-color: ${colors.leftMenu.mediumGrey};
  ul {
    list-style: none;
    padding-top: 2px;
    display: flex;
    padding: 10px;
    li {
      a {
        padding-right: 30px;
        text-transform: capitalize;
      }
    }
  }
`;

export default Wrapper;

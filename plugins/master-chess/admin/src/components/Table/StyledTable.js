import styled from "styled-components";

import colors from "@buffetjs/styles/src/assets/styles/colors";
import sizes from "@buffetjs/styles/src/assets/styles/sizes";

const Table = styled.div`
  width: 100%;
  position: relative;
  overflow-x: scroll;
  border-radius: 3px;
  box-shadow: 0 2px 4px #e3e9f3;
  background: white;
  table,
  .deleteRow {
    min-width: 500px;
  }
  table {
    width: 100%;
    min-width: 500px;
    font-family: "Lato";
    overflow: hidden;
    border-collapse: collapse;
    &.rowsSelected {
      tbody {
        &::before {
          content: "-";
          height: ${sizes.table.deleteRow.height};
          display: block;
        }
      }
    }
  }

  tr {
    padding-left: 2.5em;
    padding-right: 2.5em;
    text-align: left;
    th,
    td {
      font-size: 1.3rem;
      padding: 0 15px;
      &.checkCell {
        width: 50px;
      }
    }
  }
  thead {
    tr {
      line-height: 0.1rem;
      font-weight: ${sizes.fontWeight.bold};
      text-transform: capitalize;
      th {
        background-color: ${colors.greyHeader};
        height: ${sizes.table.header.height};
        p {
          position: relative;
          padding-right: ${sizes.margin * 1.4}px;
          padding-top: ${sizes.margin * 1.4}px;
          width: fit-content;
          line-height: normal;
          color: ${colors.blueTxt};
          &.clickable {
            cursor: pointer;
          }
        }
        svg {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 18px;
          &.fa-sort-up {
            top: 4px;
          }
          &.fa-sort-down {
            top: -${sizes.margin * 0.2}px;
          }
        }
      }
    }
  }
  tbody {
    background-color: ${colors.greyHover};
    color: ${colors.blueTxt};
    tr {
      border-bottom: 1px solid ${colors.greySeparator};
      background-color: white;
      cursor: pointer;
      button {
        padding-bottom: 0;
      }
      &:nth-of-type(odd) {
        background-color: rgba(0, 0, 0, 0.05);
      }
      &:hover {
        background-color: white;
        background-color: ${colors.greyHover};
      }
      &:not(.deleteRow) {
        td {
          height: ${sizes.table.row.height};
        }
      }
    }
    td {
      p {
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 16px;
      }
    }
  }
  span.link-icon {
    svg {
      color: ${colors.blueTxt};
    }
  }
  @media (min-width: ${sizes.tablet}) {
    width: 100%;
    overflow-x: auto;
  }
`;

const TableRowEmpty = styled.tr`
  width: 100%;
  height: 108px;
  background: #ffffff;
  td {
    height: 106px;
    line-height: 106px;
    font-size: 1.3rem;
    font-weight: ${sizes.fontWeight.regular};
    color: ${colors.blueTxt};
    text-align: center;
    border-collapse: collapse;
    /* stylelint-disable */
    border-top: 1px solid #f1f1f2 !important;
    /* stylelint-enable */
  }
`;

export { Table, TableRowEmpty };

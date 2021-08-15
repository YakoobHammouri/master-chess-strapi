import React from "react";
import { Table, TableRowEmpty } from "./StyledTable";
import TableHeader from "./TableHeader";
import { T } from "../../utils";
const index = ({ headers, className, rows, style }) => {
  // console.log("fdsfsd rows : ", rows);
  return (
    <Table className={className} style={style}>
      <table className="">
        <TableHeader headers={headers} />
        <tbody>
          {rows && Array.isArray(rows) && rows.length > 0 ? (
            rows.map((row) => {
              return (
                <tr>
                  {row?.map((r) => {
                    return (
                      <td>
                        <div style={{ textAlign: "center" }}>{`${r}`}</div>
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <TableRowEmpty>
              <td>{T("table.tableEmptyText")}</td>
            </TableRowEmpty>
          )}
        </tbody>
      </table>
    </Table>
  );
};

export default index;

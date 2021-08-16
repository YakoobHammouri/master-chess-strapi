import React from "react";
import { Table, TableRowEmpty } from "./StyledTable";
import TableHeader from "./TableHeader";
import { T } from "../../utils";
const index = ({ headers, className, rows, style, id }) => {
  // console.log("fdsfsd rows : ", rows);
  return (
    <Table className={className} style={style}>
      <table className="table table-hover" id={id}>
        <TableHeader headers={headers} />
        <tbody>
          {rows && Array.isArray(rows) && rows.length > 0 ? (
            rows.map((row) => {
              return (
                <tr>
                  {row?.map((r) => {
                    return (
                      <td style={{ verticalAlign: "middle" }}>
                        <p style={{ textAlign: "center" }}>{`${r}`}</p>
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

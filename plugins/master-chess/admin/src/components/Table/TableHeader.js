import React from "react";
import { T } from "../../utils";
const TableHeader = ({ headers }) => {
  return (
    <thead>
      <tr style={{ borderBottom: "2px solid #e1e1e1" }}>
        {headers && Array.isArray(headers) && headers.length > 0 ? (
          headers.map((header, i) => {
            return (
              <th key={i}>
                <p className={""}>{header}</p>
              </th>
            );
          })
        ) : (
          <th
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {T("table.tableHeaderEmptyText")}
          </th>
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;

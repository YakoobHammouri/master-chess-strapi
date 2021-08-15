import React from "react";
import { T } from "../../utils";
const TableHeader = ({ headers }) => {
  return (
    <thead>
      <tr>
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

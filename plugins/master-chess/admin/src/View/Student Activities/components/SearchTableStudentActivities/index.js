import React from "react";
import { Table } from "@buffetjs/core";
import { T } from "../../../../utils";

function index({ rows, stdName, searchByCourse }) {
  console.log(`searchByCourse in table`, searchByCourse);
  const CustomRow = ({ row }) => {
    const { id, activity_id, mark, activities_list, activiteName, total } = row;

    return searchByCourse === true ? (
      <tr>
        <td>
          <p>{activity_id}</p>
        </td>

        <td>
          <p>{activiteName}</p>
        </td>
        <td>
          <p>{total}</p>
        </td>
        <td>
          <p>{mark}</p>
        </td>
      </tr>
    ) : (
      <tr>
        <td>
          <p>{id}</p>
        </td>
        <td>
          <p>{stdName}</p>
        </td>
        <td>
          <p>{activiteName}</p>
        </td>
        <td>
          <p>{activities_list?.total}</p>
        </td>
        <td>
          <p>{mark}</p>
        </td>
      </tr>
    );
  };
  const headers = [
    {
      name: T("table.tableHeader.RowON"),
      value: "id",
    },
    {
      name: T("table.tableHeaer.stdName"),
      value: "student",
    },
    {
      name: T("activitiesList.label"),
      value: "activiteName",
    },
    {
      name: T("activitiesList.total.label"),
      value: "activities_list_total",
    },
    {
      name: T("activitiesList.mark.label"),
      value: "mark",
    },
  ];

  if (searchByCourse === true) {
    headers.splice(1, 1);
  }
  return (
    <div style={{ direction: "ltr" }}>
      <Table
        customRow={CustomRow}
        headers={headers}
        rows={rows}
        style={{ direction: "ltr" }}
      />
    </div>
  );
}

export default index;

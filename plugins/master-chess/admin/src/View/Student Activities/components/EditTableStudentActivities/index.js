import React, { useState, useEffect } from "react";
import { Table } from "@buffetjs/core";
import EditModel from "./EditModel";
import { T } from "../../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useSaveStudentActivities } from "../../../../hooks";
function index({ rows, stdId, course, list, isSearch, isSearchByCourse }) {
  const headers = [
    {
      name: T("table.tableHeader.RowON"),
      value: "id",
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

  if (isSearch) {
    headers.splice(0, 2);
  } else if (isSearchByCourse) {
    headers.splice(1, 0, {
      name: T("table.tableHeaer.stdName"),
      value: "student",
    });
  }

  const { onDeleteHandler } = useSaveStudentActivities();
  const [isOpenedCreateModal, setIsOpenedCreateModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState({});
  const handleToggleModalCreate = () => setIsOpenedCreateModal((s) => !s);

  return (
    <div style={{ direction: "ltr" }}>
      <Table
        onClickRow={(e, data) => {
          if (!isSearch && !isSearchByCourse) {
            setSelectedActivity(data);
            setIsOpenedCreateModal(true);
          }
        }}
        headers={headers}
        rows={rows}
        style={{ direction: "ltr" }}
        rowLinks={[
          {
            icon: <FontAwesomeIcon icon={faTrashAlt} />,
            onClick: async (data) => {
              const result = await onDeleteHandler(
                data?.activityId,
                data?.id,
                stdId,
                course?.value
              );
            },
          },
        ]}
      />

      <EditModel
        onClose={handleToggleModalCreate}
        isOpened={isOpenedCreateModal}
        isEdit={true}
        stdId={stdId}
        course={course}
        Id={selectedActivity?.id}
        activiteName={selectedActivity?.activiteName}
        totals={selectedActivity?.activities_list_total}
        marks={selectedActivity?.mark}
        activities_list_id={selectedActivity?.activities_list_id}
        list={list}
        old={selectedActivity}
      />
    </div>
  );
}

export default index;

import React, { useState } from "react";
import { Table } from "@buffetjs/core";
import EditModel from "./EditModel";
import { T } from "../../../../utils";

function EditCoursePaymentTable({
  rows,
  stdId,
  course,
  isSearch,
  isSearchByCourse,
}) {
  const headers = [
    {
      name: T("table.tableHeader.RowON"),
      value: "payment_id",
    },
    {
      name: T("table.tableHeaer.courseName"),
      value: "courseName",
    },
    {
      name: T("table.tableHeaer.amount"),
      value: "amount",
    },
    {
      name: T("table.tableHeaer.month"),
      value: "month",
    },
    {
      name: T("table.tableHeaer.paymentDate"),
      value: "date",
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

  const [isOpenedCreateModal, setIsOpenedCreateModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState({});
  const handleToggleModalCreate = () => setIsOpenedCreateModal((s) => !s);

  return (
    <div style={{ direction: "rtl" }}>
      <Table
        onClickRow={(e, data) => {
          if (!isSearch && !isSearchByCourse) {
            setSelectedPayment(data);
            setIsOpenedCreateModal(true);
          }
        }}
        headers={headers}
        rows={rows}
        style={{ direction: "rtl" }}
      />
      {!isSearch && !isSearchByCourse ? (
        <EditModel
          onClose={handleToggleModalCreate}
          isOpened={isOpenedCreateModal}
          stdId={stdId}
          course={course}
          amount={selectedPayment?.amount}
          month={selectedPayment?.month}
          date={selectedPayment?.date}
          paymentId={selectedPayment?.payment_id}
        />
      ) : null}
    </div>
  );
}

export default EditCoursePaymentTable;

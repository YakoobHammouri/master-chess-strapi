import React, { useState } from "react";
import { Table } from "@buffetjs/core";
import EditModel from "./EditModel";
import { T } from "../../../../utils";

function EditCoursePaymentTable({ rows, stdId, course }) {
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

  const [isOpenedCreateModal, setIsOpenedCreateModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState({});
  const handleToggleModalCreate = () => setIsOpenedCreateModal((s) => !s);

  return (
    <>
      <Table
        onClickRow={(e, data) => {
          setSelectedPayment(data);
          setIsOpenedCreateModal(true);
        }}
        headers={headers}
        rows={rows}
      />
      <EditModel
        onClose={handleToggleModalCreate}
        isOpened={isOpenedCreateModal}
        stdId={stdId}
        course={course}
        amount={selectedPayment?.amount}
        month={selectedPayment?.month}
        paymentId={selectedPayment?.payment_id}
      />
    </>
  );
}

export default EditCoursePaymentTable;

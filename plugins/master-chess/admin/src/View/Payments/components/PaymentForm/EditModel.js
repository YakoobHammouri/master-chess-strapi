import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { REDUCER_NAME } from "../../../../containers/Context/Payment/constants";
import { Modal, ModalFooter, ModalHeader } from "strapi-helper-plugin";
import TakeCoursePaymentForm from "./TakeCoursePaymentForm";
import { useIntl } from "react-intl";
import { Button } from "@buffetjs/core";
import { getTrad } from "../../../../utils";

const EditModel = ({
  onClose,
  isOpened,
  stdId,
  course,
  amount,
  month,
  date,
  paymentId,
}) => {
  const { formatMessage } = useIntl();
  const savePament = useSelector(
    (state) => state.get(REDUCER_NAME).funSavePament
  );

  const loading = useSelector(
    (state) => state.get(REDUCER_NAME).savePamentLoading
  );

  const shouldUpdatePermissions = useRef(false);

  const handleClosed = async () => {
    if (shouldUpdatePermissions.current) {
      await fetchUserPermissions();
    }
    shouldUpdatePermissions.current = true;
  };

  return (
    <Modal
      isOpen={isOpened}
      onToggle={onClose}
      withoverflow="true"
      onClosed={handleClosed}
    >
      <ModalHeader
        withBackButton={true}
        onClickGoBack={onClose}
        HeaderComponent={() => (
          <div>
            <p>Edit Student Payment </p>
          </div>
        )}
      />

      <TakeCoursePaymentForm
        stdId={stdId}
        course={course}
        amount={amount}
        date={date}
        month={month}
        paymentId={paymentId}
        isEdit={true}
        onClose={onClose}
      />
      <ModalFooter>
        <section>
          <Button type="button" color="cancel" onClick={onClose}>
            {formatMessage({ id: "app.components.Button.cancel" })}
          </Button>
          <Button
            color="success"
            type="submit"
            isLoading={loading}
            onClick={() => {
              if (savePament) {
                savePament();
              }
            }}
          >
            {formatMessage({
              id: getTrad("Save"),
            })}
          </Button>
        </section>
      </ModalFooter>
    </Modal>
  );
};

export default EditModel;

import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { REDUCER_NAME } from "../../../../containers/Context/StudentActivities/constants";
import { Modal, ModalFooter, ModalHeader } from "strapi-helper-plugin";
import FormRow from "../StudentActivitieForm/FormRow";
import { useSaveStudentActivities } from "../../../../hooks";
import { useIntl } from "react-intl";
import { Button } from "@buffetjs/core";
import { getTrad } from "../../../../utils";

const EditModel = ({
  onClose,
  isOpened,
  stdId,
  course,
  Id,
  activiteName,
  totals,
  marks,
  activities_list_id,
  list,
  old,
}) => {
  const { formatMessage } = useIntl();

  const { onEditHandler } = useSaveStudentActivities();
  const formRowDataList = useSelector(
    (state) => state.get(REDUCER_NAME).funGetRowStudentActivitiesList
  );
  const loading = useSelector(
    (state) => state.get(REDUCER_NAME).savePamentLoading
  );

  const shouldUpdatePermissions = useRef(false);

  const handleClosed = async () => {
    // if (shouldUpdatePermissions.current) {
    //   const rr = await fetchUserPermissions();
    // }
    // shouldUpdatePermissions.current = true;
  };

  const validateDate = async () => {
    const data = [];

    let _isValid = true;

    formRowDataList?.map((e) => {
      const temp = e();
      if (temp != null && temp.isValid && temp.isEdit) {
        data.push(temp);
      } else {
        _isValid = false;
      }
    });

    if (data.length > 0 && _isValid) {
      await onEditHandler(data[0], Id, stdId, course);
      onClose(false);
    } else {
      strapi.notification.toggle({
        type: "info",
        message: { id: getTrad("activities.student.activities.not.chnage") },
        timeout: 5000,
      });
    }
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
            <p>Edit Student Activity </p>
          </div>
        )}
      />

      <div style={{ height: 98 }}>
        <FormRow
          stdId={stdId}
          course={course}
          Id={Id}
          activiteName={activiteName}
          totals={totals}
          marks={marks}
          activities_list_id={activities_list_id}
          isEdit={true}
          onClose={onClose}
          lists={list}
          old={old}
        />
      </div>

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
              validateDate();
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

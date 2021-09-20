import React, { useEffect, useState, useRef } from "react";
import { isNumber } from "lodash";
import { Inputs } from "@buffetjs/custom";
import { Container, Col, Row } from "reactstrap";
import { Dropdowns } from "../../../../components";
import { T } from "../../../../utils";
import { useDispatch } from "react-redux";
import { SAVE_GET_ROW_ACTIVITIE } from "../../../../containers/Context/StudentActivities/constants";

/*


 stdId={stdId}
          course={course}
          Id={selectedActivity?.id}
          activiteName={selectedActivity?.activiteName}
          total={selectedActivity?.activities_list_total}
          mark={selectedActivity?.mark}
          activities_list_id={selectedActivity?.activities_list_id}

*/

function formRow({
  isEdit,
  marks,
  totals,
  activiteName,
  ActivityId: Id,
  stdId,
  course,
  lists,
  activities_list_id,
  old,
}) {
  const dispatch = useDispatch();
  const requiredText = T("Required");
  const NumberText = T("must.number");
  const [selectActivitie, setSelectActivitie] = useState(
    isEdit ? lists?.find((a) => a.value == activities_list_id) : {}
  ); //
  const [activitieError, setActivitieError] = useState("");
  const [total, setTotal] = useState(totals);
  const [mark, setMark] = useState({
    value: marks,
    error: "",
  });

  useEffect(() => {
    dispatch({ type: SAVE_GET_ROW_ACTIVITIE, getRow: _getRowData });
  }, []);

  useEffect(() => {
    const _total = selectActivitie?.meta?.total ?? 0;
    totalRef.current = _total;
    setTotal(_total);

    if (selectActivitie?.value != activities_list_id) {
      markRef.current = {
        value: 0,
        error: "",
      };
      setMark({
        value: 0,
        error: "",
      });
    }
    setActivitieError("");
  }, [selectActivitie]);

  const onActivitieChange = (selected) => {
    activitieRef.current = selected;
    setSelectActivitie(selected);
  };

  const onMarkChange = ({ target: { value } }) => {
    setMark((prev) => ({ ...prev, value }));
    markRef.current.value = value;
  };

  const _getRowData = () => {
    let isValid = true;

    if (!activitieRef.current.value) {
      setActivitieError(requiredText);
    }

    if (!markRef.current.value) {
      setMark((prev) => ({ ...prev, error: requiredText }));
      isValid = false;
    }

    if (!isNumber(markRef.current.value)) {
      setMark((prev) => ({ ...prev, error: NumberText }));
      isValid = false;
    }

    const _total = activitieRef.current?.meta?.total ?? 0;

    if (markRef.current.value > _total) {
      isValid = false;
    }

    const activiteName = activitieRef.current?.label;
    const activities_id = activitieRef.current?.value;
    const currentmark = markRef.current.value;

    if (isEdit) {
      if (
        old?.activiteName == activiteName &&
        old?.activities_list_id == activities_id &&
        old?.mark == currentmark
      ) {
        // the data not chnage
        return null;
      } else {
        // the data change
        return {
          selectActivitie: activitieRef.current,
          total: totalRef.current,
          mark: markRef.current,
          isValid,
          isEdit,
          activityId: Id,
        };
      }
    } else {
      // create new
      return {
        selectActivitie: activitieRef.current,
        total: totalRef.current,
        mark: markRef.current,
        isValid,
      };
    }

    if (
      isEdit &&
      old?.activiteName != activiteName &&
      old?.activities_list_id != activities_id &&
      old?.mark != currentmark
    ) {
      return {
        selectActivitie: activitieRef.current,
        total: totalRef.current,
        mark: markRef.current,
        isValid,
        isEdit,
        Id,
        stdId,
        course,
      };
    } else {
    }
  };

  const activitieRef = useRef(selectActivitie);
  const totalRef = useRef(total);
  const markRef = useRef(mark);
  return (
    <Container style={{ height: "65px" }}>
      <Row>
        <Col>
          <Dropdowns
            name={"activitiesList"}
            value={selectActivitie}
            onValChange={onActivitieChange}
            lsit={lists}
            isDisabled={lists?.length === 0 ? true : false}
            errorTxt={activitieError}
          />
        </Col>
        <Col>
          <Inputs
            name={"total"}
            value={total}
            type={"number"}
            disabled={true}
          />
        </Col>
        <Col>
          <Inputs
            name={"mark"}
            onChange={onMarkChange}
            value={mark.value}
            error={mark.error}
            type={"number"}
            disabled={total === 0 ? true : false}
            validations={{
              required: true,
              max: total,
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default formRow;

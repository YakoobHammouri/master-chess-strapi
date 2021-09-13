import React, { useEffect, useState, useRef } from "react";
import { isNumber } from "lodash";
import { Inputs } from "@buffetjs/custom";
import { Container, Col, Row } from "reactstrap";
import { Dropdowns } from "../../../../../components";
import { T } from "../../../../../utils";
import { useDispatch } from "react-redux";
import { SAVE_GET_ROW_ACTIVITIE } from "../../../../../containers/Context/StudentActivities/constants";
function formRow({ lists, isEdit }) {
  const dispatch = useDispatch();
  const requiredText = T("Required");
  const NumberText = T("must.number");
  const [selectActivitie, setSelectActivitie] = useState({});
  const [activitieError, setActivitieError] = useState("");
  const [total, setTotal] = useState(0);
  const [mark, setMark] = useState({
    value: isEdit ? mark : 0,
    error: "",
  });

  useEffect(() => {
    dispatch({ type: SAVE_GET_ROW_ACTIVITIE, getRow: _getRowData });
  }, []);

  useEffect(() => {
    const _total = selectActivitie?.meta?.total ?? 0;
    totalRef.current = _total;
    setTotal(_total);
    setMark({
      value: isEdit ? mark : 0,
      error: "",
    });
    setActivitieError("");
  }, [selectActivitie]);

  const onActivitieChange = (selected) => {
    activitieRef.current.value = selected;
    setSelectActivitie(selected);
  };

  const onMarkChange = ({ target: { value } }) => {
    setMark((prev) => ({ ...prev, value }));
    markRef.current.value = value;
  };

  const _getRowData = () => {
    let isValid = true;
    if (!selectActivitie.value) {
      setActivitieError(requiredText);
    }

    if (!mark.value) {
      setMark((prev) => ({ ...prev, error: requiredText }));
      isValid = false;
    }

    if (!isNumber(mark.value)) {
      setMark((prev) => ({ ...prev, error: NumberText }));
      isValid = false;
    }

    const _total = selectActivitie?.meta?.total ?? 0;

    if (mark.value > _total) {
      isValid = false;
    }
    console.log(`obj from get row data `, {
      selectActivitie,
      mark,
      isValid,
    });

    return {
      selectActivitie,
      mark,
      isValid,
    };
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
            isDisabled={lists.length === 0 ? true : false}
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

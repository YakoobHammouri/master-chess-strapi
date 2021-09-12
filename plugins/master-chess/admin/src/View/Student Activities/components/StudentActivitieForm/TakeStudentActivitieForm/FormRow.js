import React, { useEffect, useState, useRef } from "react";
import { Container, Col, Row } from "reactstrap";
import { Inputs } from "@buffetjs/custom";
import { Dropdowns } from "../../../../../components";

function formRow({ lists, isEdit }) {
  const [selectActivitie, setSelectActivitie] = useState({});
  const [total, setTotal] = useState(0);

  const [mark, setMark] = useState({
    value: isEdit ? mark : 0,
    error: "",
  });

  useEffect(() => {
    setTotal(selectActivitie?.meta?.total ?? 0);
    setMark({
      value: isEdit ? mark : 0,
      error: "",
    });
  }, [selectActivitie]);

  const onActivitieChange = (selected) => {
    setSelectActivitie(selected);
  };

  const onMarkChange = ({ target: { value } }) => {
    setMark((prev) => ({ ...prev, value }));
    markRef.current.value = value;
  };

  const markRef = useRef(mark);
  return (
    <Container>
      <Row>
        <Col>
          <Dropdowns
            name={"activitiesList"}
            value={selectActivitie}
            onValChange={onActivitieChange}
            lsit={lists}
            isDisabled={lists.length === 0 ? true : false}
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
            ref={markRef}
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

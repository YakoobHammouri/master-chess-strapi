import React, { useState } from "react";
import { Collapse } from "reactstrap";
import { Padded } from "@buffetjs/core";
import { Banner } from "../../../../components";
import { EditCoursePaymentTable } from ".";
function BannerItem({ name, isFirst, paymentList }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Banner
        category={name}
        isFirst={isFirst}
        isOpen={isOpen}
        onToggle={(cat) => {
          setIsOpen((prev) => !prev);
        }}
      />
      <Collapse isOpen={isOpen}>
        <Padded top bottom right left size="smd">
          <EditCoursePaymentTable rows={paymentList} isSearch={true} />
        </Padded>
      </Collapse>
    </>
  );
}

export default BannerItem;

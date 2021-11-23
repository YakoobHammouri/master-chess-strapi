import React, { useState } from "react";
import { Collapse } from "reactstrap";
import { Padded } from "@buffetjs/core";
import { Banner } from "../../../../components";
import SearchTableStudentActivities from "../SearchTableStudentActivities";
function BannerItem({
  name,
  stdName,
  isFirst,
  activityList,
  course,
  isSearch,
}) {
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
          {/* <EditTableStudentActivities /> */}
          <SearchTableStudentActivities
            rows={activityList}
            stdName={stdName}
            isSearch={isSearch}
            course={course}
          />
        </Padded>
      </Collapse>
    </>
  );
}

export default BannerItem;

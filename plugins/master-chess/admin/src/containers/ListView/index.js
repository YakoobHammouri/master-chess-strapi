import React, { useEffect, useMemo, useState } from "react";
import { get, has, isEqual } from "lodash";
import { Prompt, useHistory, useLocation } from "react-router-dom";
import { ListWrapper, useGlobalContext } from "strapi-helper-plugin";
import { Attendances, Payments, StudentActivities } from "../../View";
import getTrad from "../../utils/getTrad";
import LeftMenu from "../LeftMenu";
import Wrapper from "./Wrapper";

const ListView = ({ componentUid }) => {
  const { emitEvent, formatMessage, plugins } = useGlobalContext();
  const modifiedData = {};
  const initialData = {};
  const hasModelBeenModified = !isEqual(modifiedData, initialData);
  const [enablePrompt, togglePrompt] = useState(true);
  const wait = async () => {
    togglePrompt(false);

    return new Promise((resolve) => setTimeout(resolve, 100));
  };

  const getComponent = (componentUid) => {
    switch (componentUid) {
      case "Attendances":
        return <Attendances />;
      case "Payments":
        return <Payments />;
      case "student-activities":
        return <StudentActivities />;
      default:
        return <Attendances />;
    }
  };

  return (
    <Wrapper>
      <Prompt
        message={formatMessage({ id: getTrad("prompt.unsaved") })}
        when={hasModelBeenModified && enablePrompt}
      />
      <div className="container-fluid">
        <div className="row">
          <LeftMenu wait={wait} />

          <div
            className="col-md-12 content"
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
          >
            <ListWrapper style={{ marginBottom: 80 }}>
              {getComponent(componentUid)}
            </ListWrapper>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ListView;

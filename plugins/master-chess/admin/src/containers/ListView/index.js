import React, { useEffect, useMemo, useState } from "react";
import { get, has, isEqual } from "lodash";
import { Header } from "@buffetjs/custom";
import { Prompt, useHistory, useLocation } from "react-router-dom";
import {
  BackHeader,
  ListWrapper,
  useGlobalContext,
} from "strapi-helper-plugin";
import { Attendances, Payments } from "../../components";
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
      default:
        return "";
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
            className="col-md-10 content"
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
          >
            {/* <Header {...headerProps} /> */}
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

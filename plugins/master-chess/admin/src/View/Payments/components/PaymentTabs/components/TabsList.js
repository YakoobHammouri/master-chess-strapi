import React from "react";
import { T } from "../../../../../utils";
import { Tabs, Tab } from "strapi-helper-plugin";
import { TitleTabWrapper } from "../../general/styles";
import { useDispatch } from "react-redux";
import { SAVE_PAYMENT } from "../../../../../containers/Context/Payment/constants";

//
const TabsLsit = () => {
  const dispatch = useDispatch();
  return (
    <Tabs position={"right"}>
      <Tab key={"take"}>
        <div
          onClick={() => {
            dispatch({
              type: SAVE_PAYMENT,
              savePament: null,
            });
          }}
        >
          <TitleTabWrapper type={"coursePayment"}>
            {T("models.paymetn.take.payment")}
          </TitleTabWrapper>
        </div>
      </Tab>
      <Tab key={"take"}>
        <div
          onClick={() => {
            dispatch({
              type: SAVE_PAYMENT,
              savePament: null,
            });
          }}
        >
          <TitleTabWrapper type={"coursePayment"}>
            {T("models.paymetn.take.payment")}
          </TitleTabWrapper>
        </div>
      </Tab>
    </Tabs>
  );
};

export default TabsLsit;

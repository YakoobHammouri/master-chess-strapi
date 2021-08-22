import React from "react";
import { T } from "../../../../../utils";
import { Tabs, Tab } from "strapi-helper-plugin";
import { TitleTabWrapper } from "../../general/styles";

const TabsLsit = () => (
  <Tabs position={"right"}>
    <Tab key={"take"}>
      <TitleTabWrapper type={"coursePayment"}>
        {T("models.paymetn.take.payment")}
      </TitleTabWrapper>
    </Tab>
  </Tabs>
);

export default TabsLsit;

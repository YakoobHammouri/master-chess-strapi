import React from "react";
import { T } from "../../../../../utils";
import { Tabs, Tab } from "strapi-helper-plugin";
import { TitleTabWrapper } from "../../general/styles";

const TabsLsit = () => (
  <Tabs position={"right"}>
    <Tab key={"take"}>
      <div
        onClick={() => {
          alert(";dskfldsk");
        }}
      >
        <TitleTabWrapper type={"coursePayment"}>
          {T("models.paymetn.take.payment")}
        </TitleTabWrapper>
      </div>
    </Tab>
  </Tabs>
);

export default TabsLsit;

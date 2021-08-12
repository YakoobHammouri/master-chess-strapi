import React, { useState } from "react";

import {
  ContainerFluid,
  TabPanel,
  TabsNav,
  TabsPanel,
} from "strapi-helper-plugin";
import { LoadingProgress } from "../../components";

import {
  TabsList,
  TakeAttendance,
  EditAttendance,
} from "./components/AttendancesTabs";

import { Padded, Separator } from "@buffetjs/core";

import Header from "./components/general/Header";

function index() {
  return (
    <ContainerFluid style={{ marginBottom: 80 }}>
      <Header />
      <Padded top bottom size="sm">
        <Padded top bottom size="sm">
          <LoadingProgress />
        </Padded>
        <Separator />
      </Padded>
      <Padded top size="sm">
        <TabsNav defaultSelection={0}>
          <TabsList />
          <TabsPanel>
            <TabPanel>
              <TakeAttendance />
            </TabPanel>
            <TabPanel>
              <EditAttendance />
            </TabPanel>
          </TabsPanel>
        </TabsNav>
      </Padded>
    </ContainerFluid>
  );
}

export default index;

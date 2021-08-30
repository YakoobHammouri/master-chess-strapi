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
  TakeCoursePayment,
  EditCoursePayment,
  SearchPaymentByStudent,
  SearchPaymentByCourse,
} from "./components/PaymentTabs";

import { Padded, Separator } from "@buffetjs/core";

import Header from "./components/general/Header";

function index() {
  return (
    <ContainerFluid style={{ marginBottom: 300 }}>
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
              <TakeCoursePayment />
            </TabPanel>
            <TabPanel>
              <EditCoursePayment />
            </TabPanel>
            <TabPanel>
              <SearchPaymentByStudent />
            </TabPanel>
            <TabPanel>
              <SearchPaymentByCourse />
            </TabPanel>
          </TabsPanel>
        </TabsNav>
      </Padded>
    </ContainerFluid>
  );
}

export default index;

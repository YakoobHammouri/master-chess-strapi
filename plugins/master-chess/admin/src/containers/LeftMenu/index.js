import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { sortBy, camelCase, upperFirst } from "lodash";
import { useHistory } from "react-router-dom";
import {
  LeftMenuList,
  useGlobalContext,
  List,
  LeftMenuHeader,
} from "strapi-helper-plugin";
import { Separator } from "@buffetjs/core";
import pluginId from "../../pluginId";
import getTrad from "../../utils/getTrad";

import Wrapper from "./Wrapper";

function LeftMenu({ wait }) {
  const { emitEvent, formatMessage, plugins } = useGlobalContext();
  const data = [
    {
      name: "models",
      title: {
        id: formatMessage({ id: getTrad("menu.section.models.name.") }),
      },
      searchable: true,

      links: [
        {
          name: "Attendances",
          to: `/plugins/${pluginId}/service/Attendances`,
          title: "Attendances",
        },
        {
          name: "Payments",
          to: `/plugins/${pluginId}/service/Payments`,
          title: "Payments",
        },
      ],
    },
  ];

  return (
    <Wrapper className="col-md-12">
      {data.map((list) => {
        return <LeftMenuList {...list} key={list.name} />;
      })}
      <Separator />
    </Wrapper>
  );
}

export default LeftMenu;

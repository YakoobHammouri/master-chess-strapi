import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import pluginPermissions from "../../permissions";
import RecursivePath from "../RecursivePath";

import {
  LoadingIndicatorPage,
  CheckPagePermissions,
} from "strapi-helper-plugin";

// Utils
import pluginId from "../../pluginId";

const ListView = lazy(() => import("../ListView"));
import Wrapper from "./Wrapper";

const App = () => {
  return (
    <CheckPagePermissions permissions={pluginPermissions.main}>
      <Wrapper>
        <Suspense fallback={<LoadingIndicatorPage />}>
          <Switch>
            <Route path={`/plugins/${pluginId}`} component={ListView} exact />
            <Route
              path={`/plugins/${pluginId}/service/:serviceName`}
              component={RecursivePath}
            />
          </Switch>
        </Suspense>
      </Wrapper>
    </CheckPagePermissions>
  );
};

export default App;

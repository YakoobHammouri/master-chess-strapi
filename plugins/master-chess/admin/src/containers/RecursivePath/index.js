import React, { Suspense, lazy } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { LoadingIndicatorPage } from "strapi-helper-plugin";

const ListView = lazy(() => import("../ListView"));

const RecursivePath = () => {
  const { url } = useRouteMatch();

  const { serviceName } = useParams();

  return (
    <Suspense fallback={<LoadingIndicatorPage />}>
      <Switch>
        <Route path={`${url}`}>
          <ListView componentUid={serviceName} />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default RecursivePath;

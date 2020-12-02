import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";
import ROUTES from "containers/ROUTES";
import NotFound from "containers/NotFoundPage/Loadable";

export interface IPrivateRouteProps extends RouteProps {
  allow: boolean;
  redirectTo?: string;
}

export function PrivateRoute(props: IPrivateRouteProps) {
  const { allow, redirectTo, ...routeProps } = props;

  if (allow) return <Route {...routeProps} />;
  else if (redirectTo) return <Redirect to={redirectTo} />;
  else return <Route {...routeProps} component={NotFound} />;
}

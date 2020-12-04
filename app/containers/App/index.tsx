/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import GlobalStyle from "../../global-styles";
import ROUTES from "containers/ROUTES";
import styled from "styles/styled-components";
import { ApolloProvider } from "@apollo/react-hooks";
import { apolloClient } from "apolloGraphql";
import { scrollToTop } from "utils/page";
import { useInjectSaga } from "utils/redux-injectors";
import appSaga from "./saga";
import { createSelector } from "reselect";
import {
  makeSelectIsStudentAuthenticated,
  makeSelectIsInstructorAuthenticated,
  makeSelectIsAdminAuthenticated,
} from "containers/Authentication/selectors";
import { useSelector } from "react-redux";
import { PrivateRoute } from "components/privateRoute";
import { createPortalContainer } from "utils/common";

//Page Containers
import NotFoundPage from "containers/NotFoundPage/Loadable";
import HomePage from "containers/HomePage/Loadable";
import DiscoverPage from "containers/DiscoverPage/Loadable";
import CustomerRegisterPage from "containers/Customer/RegisterPage/Loadable";

export const AppContainer = styled.div`
  width: 100%;
  min-height: 100%;
`;

const KEY = "app";

const stateSelector = createSelector(
  makeSelectIsStudentAuthenticated,
  makeSelectIsInstructorAuthenticated,
  makeSelectIsAdminAuthenticated,
  (
    isStudentAuthenticated,
    isInstructorAuthenticated,
    isAdminAuthenticated
  ) => ({
    isStudentAuthenticated,
    isInstructorAuthenticated,
    isAdminAuthenticated,
  })
);

function App() {
  useInjectSaga({ key: KEY, saga: appSaga });

  const {
    isStudentAuthenticated,
    isInstructorAuthenticated,
    isAdminAuthenticated,
  } = useSelector(stateSelector);

  React.useEffect(() => {
    createPortalContainer("portal-popup");
    createPortalContainer("portal-alert");
  }, []);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Switch>
          <Route exact path={ROUTES.homePage} component={HomePage} />
          <Route exact path={ROUTES.discoverPage} component={DiscoverPage} />
          {/* CUSTOMER */}
          <Route
            exact
            path={ROUTES.customerSignupPage}
            component={CustomerRegisterPage}
          />

          {/** Has to be kept last */}
          <Route component={NotFoundPage} />
        </Switch>

        <GlobalStyle />
      </ApolloProvider>
    </>
  );
}
export default hot(App);

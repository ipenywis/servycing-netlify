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
  makeSelectIsCustomerAuthenticated,
  makeSelectIsSpecialistAuthenticated,
  makeSelectIsAdminAuthenticated,
} from "containers/Authentication/selectors";
import { useSelector } from "react-redux";
import { PrivateRoute } from "components/privateRoute";
import { createPortalContainer } from "utils/common";

//Page Containers
import NotFoundPage from "containers/NotFoundPage/Loadable";
import HomePage from "containers/HomePage/Loadable";
import DiscoverPage from "containers/DiscoverPage/Loadable";
import SpecialistRegisterPage from "containers/Specialist/RegisterPage/Loadable";
import SpecialistLoginPage from "containers/Specialist/LoginPage/Loadable";
import CustomerLoginPage from "containers/Customer/LoginPage/Loadable";
import CustomerRegisterPage from "containers/Customer/RegisterPage/Loadable";
import AdminLoginPage from "containers/Admin/LoginPage/Loadable";
import SpecialistDashboardPage from "containers/Specialist/Dashboard/Loadable";
import ServicePage from "containers/ServicePage/Loadable";
import CustomerDashboardPage from "containers/Customer/Dashboard/Loadable";
import AdminDashboardPage from "containers/Admin/Dashboard/Loadable";
import SpecialistPage from "containers/SpecialistPage/Loadable";

export const AppContainer = styled.div`
  width: 100%;
  min-height: 100%;
`;

const KEY = "app";

const stateSelector = createSelector(
  makeSelectIsCustomerAuthenticated,
  makeSelectIsSpecialistAuthenticated,
  makeSelectIsAdminAuthenticated,
  (
    isCustomerAuthenticated,
    isSpecialistAuthenticated,
    isAdminAuthenticated
  ) => ({
    isCustomerAuthenticated,
    isSpecialistAuthenticated,
    isAdminAuthenticated,
  })
);

function App() {
  useInjectSaga({ key: KEY, saga: appSaga });

  const {
    isCustomerAuthenticated,
    isSpecialistAuthenticated,
    isAdminAuthenticated,
  } = useSelector(stateSelector);

  const noOneIsAuthenticated =
    !isCustomerAuthenticated &&
    !isSpecialistAuthenticated &&
    !isAdminAuthenticated;

  const someOneIsAuthenticated =
    isCustomerAuthenticated ||
    isSpecialistAuthenticated ||
    isAdminAuthenticated;

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
          <Route exact path={ROUTES.servicePage} component={ServicePage} />

          {/* CUSTOMER */}
          <PrivateRoute
            exact
            allow={!noOneIsAuthenticated}
            path={ROUTES.customerSignupPage}
            component={CustomerRegisterPage}
          />
          <PrivateRoute
            exact
            allow={!noOneIsAuthenticated}
            path={ROUTES.customerLoginPage}
            component={CustomerLoginPage}
          />
          <PrivateRoute
            allow={isCustomerAuthenticated}
            exact
            path={ROUTES.customerDashboardPage}
            component={CustomerDashboardPage}
          />

          {/* SPECIALIST */}
          <PrivateRoute
            exact
            allow={!noOneIsAuthenticated}
            path={ROUTES.specialistRegisterPage}
            component={SpecialistRegisterPage}
          />
          <PrivateRoute
            exact
            allow={!noOneIsAuthenticated}
            path={ROUTES.specialistLoginPage}
            component={SpecialistLoginPage}
          />
          <PrivateRoute
            exact
            allow={isSpecialistAuthenticated}
            path={ROUTES.specialistDashboardPage}
            component={SpecialistDashboardPage}
          />

          {/* ADMIN */}
          <PrivateRoute
            exact
            allow={!noOneIsAuthenticated}
            path={ROUTES.adminLoginPage}
            component={AdminLoginPage}
          />
          <PrivateRoute
            allow={isAdminAuthenticated}
            exact
            path={ROUTES.adminDashboardPage}
            component={AdminDashboardPage}
          />

          {/** Has to be kept last */}
          <PrivateRoute
            exact
            allow={someOneIsAuthenticated}
            path={ROUTES.specialistPage}
            component={SpecialistPage}
          />
          <Route component={NotFoundPage} />
        </Switch>

        <GlobalStyle />
      </ApolloProvider>
    </>
  );
}
export default hot(App);

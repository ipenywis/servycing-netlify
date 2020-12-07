import React from "react";
import { NavContainer, NavItem, LogoutNavItem } from "./common";
import styled from "styled-components";
import { customerunauthenticated } from "containers/Authentication/actions";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import authService from "services/authService";
import { useHistory } from "react-router-dom";
import ROUTES from "containers/ROUTES";
import { prepareRouteWithParams } from "utils/route";

export interface ICustomerMenuProps {}

const actionDispatch = (dispatch: Dispatch) => ({
  customerunauthenticated: () => dispatch(customerunauthenticated()),
});

export function CustomerMenu(props: ICustomerMenuProps) {
  const history = useHistory();

  const { customerunauthenticated } = actionDispatch(useDispatch());

  const onDashboardClick = () => {
    history.push(ROUTES.customerDashboardPage);
  };

  const onLogoutClick = () => {
    authService.removeCustomerToken();
    customerunauthenticated();
    history.push(ROUTES.homePage);
  };

  return (
    <NavContainer>
      <NavItem onClick={onDashboardClick}>Dashboard</NavItem>
      <LogoutNavItem onClick={onLogoutClick}>Logout</LogoutNavItem>
    </NavContainer>
  );
}

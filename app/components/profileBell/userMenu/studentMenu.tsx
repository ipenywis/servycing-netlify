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

export interface IStudentMenuProps {}

const actionDispatch = (dispatch: Dispatch) => ({
  customerunauthenticated: () => dispatch(customerunauthenticated()),
});

export function StudentMenu(props: IStudentMenuProps) {
  const history = useHistory();

  const { customerunauthenticated } = actionDispatch(useDispatch());

  const onProfileClick = () => {
    history.push(prepareRouteWithParams(ROUTES.accountSettingsPage, ""));
  };

  const onDashboardClick = () => {
    history.push(ROUTES.studentDashboardPage);
  };

  const onCoursesClick = () => {};

  const onWhishlistClick = () => {};

  const onLogoutClick = () => {
    authService.removeCustomerToken();
    customerunauthenticated();
    history.push(ROUTES.homePage);
  };

  return (
    <NavContainer>
      <NavItem onClick={onProfileClick}>Profile</NavItem>
      <NavItem onClick={onDashboardClick}>Dashboard</NavItem>
      <NavItem onClick={onCoursesClick}>Courses</NavItem>
      <NavItem onClick={onWhishlistClick}>Whishlist</NavItem>
      <LogoutNavItem onClick={onLogoutClick}>Logout</LogoutNavItem>
    </NavContainer>
  );
}

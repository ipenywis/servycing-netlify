import React from "react";
import { NavContainer, NavItem, LogoutNavItem } from "./common";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import ROUTES from "containers/ROUTES";
import { specialistUnauthenticated } from "containers/Authentication/actions";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import authService from "services/authService";
import { prepareRouteWithParams } from "utils/route";

export interface ISpecialistMenuProps {}

const actionDispatch = (dispatch: Dispatch) => ({
  specialistUnauthenticated: () => dispatch(specialistUnauthenticated()),
});

export function SpecialistMenu(props: ISpecialistMenuProps) {
  const { specialistUnauthenticated } = actionDispatch(useDispatch());

  const history = useHistory();

  const onProfileClick = () => {
    history.push(prepareRouteWithParams(ROUTES.accountSettingsPage, ""));
  };

  const onDashboardClick = () => {
    history.push(ROUTES.specialistDashboardPage);
  };

  const onCoursesClick = () => {};

  const onWhishlistClick = () => {};

  const onLogoutClick = () => {
    authService.removeSpecialistToken();
    specialistUnauthenticated();
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

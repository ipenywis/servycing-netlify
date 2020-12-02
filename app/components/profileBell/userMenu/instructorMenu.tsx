import React from 'react';
import { NavContainer, NavItem, LogoutNavItem } from './common';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ROUTES from 'containers/ROUTES';
import { instructorUnauthenticated } from 'containers/Authentication/actions';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import authService from 'services/authService';
import { prepareRouteWithParams } from 'utils/route';

export interface IInstructorMenuProps {}

const actionDispatch = (dispatch: Dispatch) => ({
  instructorUnauthenticated: () => dispatch(instructorUnauthenticated()),
});

export function InstructorMenu(props: IInstructorMenuProps) {
  const { instructorUnauthenticated } = actionDispatch(useDispatch());

  const history = useHistory();

  const onProfileClick = () => {
    history.push(prepareRouteWithParams(ROUTES.accountSettingsPage, ''));
  };

  const onDashboardClick = () => {
    history.push(ROUTES.instructorDashboad);
  };

  const onCoursesClick = () => {};

  const onWhishlistClick = () => {};

  const onLogoutClick = () => {
    authService.removeInstructorToken();
    instructorUnauthenticated();
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

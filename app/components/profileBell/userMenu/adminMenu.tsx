import React from 'react';
import { NavContainer, NavItem, LogoutNavItem } from './common';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ROUTES from 'containers/ROUTES';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import authService from 'services/authService';
import { adminUnauthenticated } from 'containers/Authentication/actions';

export interface IAdminMenuProps {}

const actionDispatch = (dispatch: Dispatch) => ({
  adminUnauthenticated: () => dispatch(adminUnauthenticated()),
});

export function AdminMenu(props: IAdminMenuProps) {
  const { adminUnauthenticated } = actionDispatch(useDispatch());

  const history = useHistory();

  const onProfileClick = () => {};

  const onDashboardClick = () => {
    history.push(ROUTES.adminDashboardPage);
  };

  const onCoursesClick = () => {};

  const onWhishlistClick = () => {};

  const onLogoutClick = () => {
    authService.removeAdminToken();
    adminUnauthenticated();
    history.push(ROUTES.homePage);
  };

  return (
    <NavContainer>
      <NavItem onClick={onDashboardClick}>Dashboard</NavItem>
      <LogoutNavItem onClick={onLogoutClick}>Logout</LogoutNavItem>
    </NavContainer>
  );
}

import React from "react";
import styled, { theme } from "styles/styled-components";
import { BrandLogo } from "components/brandLogo";
import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import ROUTES from "containers/ROUTES";
import { createSelector } from "reselect";
import {
  makeSelectIsStudentAuthenticated,
  makeSelectIsInstructorAuthenticated,
  makeSelectIsAdminAuthenticated,
} from "containers/Authentication/selectors";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "components/avatar";
import { ProfileBell } from "components/profileBell";
import authService from "services/authService";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import {
  adminUnauthenticated,
  specialistUnauthenticated,
  customerunauthenticated,
} from "containers/Authentication/actions";
import { UserRole } from "types/user";
import { Seperator } from "components/lineSeperator";

export interface INavbarProps {
  transparent?: boolean;
}

const NavbarContainer = styled.div<INavbarProps>`
  width: 100%;
  height: 54px;
  z-index: 98;
  padding: 0 1.6em;
  background-color: ${({ transparent }) =>
    transparent ? "transparent" : theme.default.secondaryBackground};
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

function LoginButtons() {
  return (
    <>
      <Button
        buttonTheme={ButtonTheme.MINIMAL_WHITE}
        text="Specialists Portal"
        size={11}
      />
      <Seperator direction="vertical" size="44%" spacing="10px" />
      <Button text="Signup" size={11} to={ROUTES.customerSignupPage} />
      <Button
        buttonTheme={ButtonTheme.MINIMAL_WHITE}
        text="Login"
        size={11}
        to={ROUTES.customerLoginPage}
      />
    </>
  );
}

const stateSelector = createSelector(
  makeSelectIsAdminAuthenticated,
  makeSelectIsStudentAuthenticated,
  makeSelectIsInstructorAuthenticated,
  (
    isAdminAuthenticated,
    isStudentAuthenticated,
    isInstructorAuthenticated
  ) => ({
    isAdminAuthenticated,
    isStudentAuthenticated,
    isInstructorAuthenticated,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  adminUnauthenticated: () => dispatch(adminUnauthenticated()),
  specialistUnauthenticated: () => dispatch(specialistUnauthenticated()),
  customerunauthenticated: () => dispatch(customerunauthenticated()),
});

function Accessbility() {
  const {
    isAdminAuthenticated,
    isInstructorAuthenticated,
    isStudentAuthenticated,
  } = useSelector(stateSelector);
  const {
    adminUnauthenticated,
    customerunauthenticated,
    specialistUnauthenticated,
  } = actionDispatch(useDispatch());

  const isAuthenticated =
    isAdminAuthenticated || isStudentAuthenticated || isInstructorAuthenticated;

  const history = useHistory();

  const logout = () => {
    authService.logout();
    adminUnauthenticated();
    specialistUnauthenticated();
    customerunauthenticated();
    //Redirect to homepage
    history.push(ROUTES.homePage);
  };

  const getUserRole = () => {
    if (isAdminAuthenticated) return UserRole.ADMIN;
    else if (isInstructorAuthenticated) return UserRole.SPECIALIST;
    else if (isStudentAuthenticated) return UserRole.CUSTOMER;
    else return UserRole.CUSTOMER;
  };

  if (isAuthenticated) return <ProfileBell userRole={getUserRole()} />;
  else return <LoginButtons />;
}

export function Navbar(props: INavbarProps) {
  return (
    <NavbarContainer {...props}>
      <InnerContainer>
        <RightContainer>
          <BrandLogo />
        </RightContainer>
        <LeftContainer>{<Accessbility />}</LeftContainer>
      </InnerContainer>
    </NavbarContainer>
  );
}

import styled, { theme } from 'styles/styled-components';

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

export const NavItem = styled.div`
  display: flex;
  height: 30px;
  font-size: 15px;
  font-weight: 400;
  color: ${theme.default.nightBlue};
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
  transition: all 180ms ease-in-out;

  &:hover {
    background-color: ${theme.default.shinyBlue};
    color: ${theme.default.primaryText};
  }
`;

export const LogoutNavItem = styled(NavItem as any)`
  margin-top: 5px;
  border-top: 1px solid ${theme.default.mutedBorderColor};

  &:hover {
    background-color: ${theme.default.dangerLight};
    color: ${theme.default.primaryText};
  }
`;

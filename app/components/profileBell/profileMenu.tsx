import React from "react";
import styled, { theme } from "styles/styled-components";
import { ProfileAvatar } from "./profileAvatar";
import { VerticalWrapper } from "components/verticalWrapper";
import { BlackText, GreyText } from "components/text";
import { Seperator } from "components/lineSeperator";
import { createSelector } from "reselect";
import { makeSelectAuthenticatedUser } from "containers/Authentication/selectors";
import { useSelector } from "react-redux";
import { UserRole } from "types/user";
import { CustomerMenu } from "./userMenu/customerMenu";
import { SpecialistMenu } from "./userMenu/specialistMenu";
import { AdminMenu } from "./userMenu/adminMenu";

export interface IProfileMenuProps {
  userRole: UserRole;
}

const ProfileMenuContainer = styled.div`
  position: absolute;
  min-width: 170px;
  min-height: 53px;
  top: 45px;
  right: -4%;
  background: ${theme.default.componentBackground};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.31);
  border-radius: 5px;
  padding: 3px 0;
  z-index: 20;
  user-select: none;

  &:before {
    position: absolute;
    top: -9px;
    right: 9px;
    display: inline-block;
    border-right: 9px solid transparent;
    border-bottom: 9px solid #eee;
    border-left: 9px solid transparent;
    content: "";
  }
`;

const AccountPreviewContainer = styled.div`
  display: flex;
  padding: 5px 7px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${theme.default.mutedBorderColor};
`;

const AccountInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  justify-content: center;
`;

const FullName = styled(BlackText)`
  line-height: 1.1;
`;

const stateSelector = createSelector(
  makeSelectAuthenticatedUser,
  (authenticatedUser) => ({
    authenticatedUser,
  })
);

function UserProfile(props: IProfileMenuProps) {
  const { userRole } = props;

  switch (userRole) {
    case UserRole.ADMIN:
      return <AdminMenu />;
    case UserRole.SPECIALIST:
      return <SpecialistMenu />;
    case UserRole.CUSTOMER:
      return <CustomerMenu />;
    default:
      return <CustomerMenu />;
  }
}

export function ProfileMenu(props: IProfileMenuProps) {
  const { userRole } = props;
  const { authenticatedUser } = useSelector(stateSelector);

  const fullName = authenticatedUser?.fullName;

  return (
    <ProfileMenuContainer>
      <AccountPreviewContainer>
        <ProfileAvatar size={34} />
        {authenticatedUser && (
          <AccountInfoContainer>
            <FullName size={14}>{fullName}</FullName>
          </AccountInfoContainer>
        )}
      </AccountPreviewContainer>
      <UserProfile {...props} />
    </ProfileMenuContainer>
  );
}

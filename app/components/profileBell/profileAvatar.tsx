import React from "react";
import { createSelector } from "reselect";
import {
  makeSelectIsCustomerAuthenticated,
  makeSelectIsSpecialistAuthenticated,
  makeSelectIsAdminAuthenticated,
  makeSelectAuthenticatedUser,
} from "containers/Authentication/selectors";
import { useSelector } from "react-redux";
import { Avatar } from "components/avatar";

export interface IProfileAvatarProps {
  size?: number;

  onClick?: () => void;
}

const stateSelector = createSelector(
  makeSelectIsCustomerAuthenticated,
  makeSelectIsSpecialistAuthenticated,
  makeSelectIsAdminAuthenticated,
  makeSelectAuthenticatedUser,
  (
    isCustomerAuthenticated,
    isSpecialistAuthenticated,
    isAdminAuthenticated,
    authenticatedUser
  ) => ({
    isCustomerAuthenticated,
    isSpecialistAuthenticated,
    isAdminAuthenticated,
    authenticatedUser,
  })
);

function ProfileAvatar(props: IProfileAvatarProps) {
  const { onClick, size } = props;

  const {
    isCustomerAuthenticated,
    isSpecialistAuthenticated,
    isAdminAuthenticated,
    authenticatedUser,
  } = useSelector(stateSelector);

  //TODO: fetch current auth-user data

  const BaseAvatar = (
    <Avatar
      onClick={onClick}
      isSolid
      src={authenticatedUser?.picture ? authenticatedUser?.picture : undefined}
      name={authenticatedUser?.fullName}
      color="green"
      size={size}
    />
  );

  if (isCustomerAuthenticated)
    return React.cloneElement(BaseAvatar, { color: "green" });
  else if (isSpecialistAuthenticated)
    return React.cloneElement(BaseAvatar, { color: "blue" });
  else if (isAdminAuthenticated)
    return React.cloneElement(BaseAvatar, { color: "yellow" });
  else return null;
}

ProfileAvatar.defaultProps = {
  size: 31,
};

export { ProfileAvatar };

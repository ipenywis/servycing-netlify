import React from 'react';
import { createSelector } from 'reselect';
import {
  makeSelectIsStudentAuthenticated,
  makeSelectIsInstructorAuthenticated,
  makeSelectIsAdminAuthenticated,
  makeSelectAuthenticatedUser,
} from 'containers/Authentication/selectors';
import { useSelector } from 'react-redux';
import { Avatar } from 'components/avatar';

export interface IProfileAvatarProps {
  size?: number;

  onClick?: () => void;
}

const stateSelector = createSelector(
  makeSelectIsStudentAuthenticated,
  makeSelectIsInstructorAuthenticated,
  makeSelectIsAdminAuthenticated,
  makeSelectAuthenticatedUser,
  (
    isStudentAuthenticated,
    isInstructorAuthenticated,
    isAdminAuthenticated,
    authenticatedUser,
  ) => ({
    isStudentAuthenticated,
    isInstructorAuthenticated,
    isAdminAuthenticated,
    authenticatedUser,
  }),
);

function ProfileAvatar(props: IProfileAvatarProps) {
  const { onClick, size } = props;

  const {
    isStudentAuthenticated,
    isInstructorAuthenticated,
    isAdminAuthenticated,
    authenticatedUser,
  } = useSelector(stateSelector);

  //TODO: fetch current auth-user data

  const BaseAvatar = (
    <Avatar
      onClick={onClick}
      isSolid
      src={authenticatedUser?.picture ? authenticatedUser?.picture : undefined}
      name="Islem Maboud"
      color="green"
      size={size}
    />
  );

  if (isStudentAuthenticated)
    return React.cloneElement(BaseAvatar, { color: 'green' });
  else if (isInstructorAuthenticated)
    return React.cloneElement(BaseAvatar, { color: 'blue' });
  else if (isAdminAuthenticated)
    return React.cloneElement(BaseAvatar, { color: 'yellow' });
  else return null;
}

ProfileAvatar.defaultProps = {
  size: 31,
};

export { ProfileAvatar };

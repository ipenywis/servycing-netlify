import React, { useState, useEffect } from 'react';
import styled from 'styles/styled-components';
import { ProfileAvatar } from './profileAvatar';
import { ProfileMenu, IProfileMenuProps } from './profileMenu';
import { useClickOutside } from 'react-click-outside-hook';

export interface IProfileBellProps extends IProfileMenuProps {}

const ProfileBellContainer = styled.div`
  display: flex;
  position: relative;
  user-select: none;
`;

export function ProfileBell(props: IProfileBellProps) {
  const [isOpen, setOpen] = useState(false);

  const [ref, hasClickedOutside] = useClickOutside();

  //Keep track of outside clicking
  useEffect(() => {
    if (hasClickedOutside && isOpen) setOpen(false);
  }, [hasClickedOutside]);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <ProfileBellContainer ref={ref}>
      <ProfileAvatar onClick={toggleMenu} />
      {isOpen && <ProfileMenu {...props} />}
    </ProfileBellContainer>
  );
}

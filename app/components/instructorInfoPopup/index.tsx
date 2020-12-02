import React from 'react';
import { Popup } from 'components/popup';
import styled from 'styles/styled-components';
import { Avatar } from 'components/avatar';
import { IInstructor } from 'types/instructor';
import { Marginer } from 'components/marginer';
import { BlackText, GreyText } from 'components/text';
import { Seperator } from 'components/lineSeperator';

export interface IInstructorInfoPopupProps {
  isOpen: boolean;
  instructor: IInstructor;

  onClose: () => void;
}

const StyledPopup = styled(Popup)`
  padding-right: 3em;
  padding-left: 3em;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function InstructorInfoPopup(props: IInstructorInfoPopupProps) {
  const { instructor, isOpen, onClose } = props;

  return (
    <StyledPopup isOpen={isOpen} onClose={onClose}>
      <InfoContainer>
        <Avatar src={instructor.picture} size={100} />
        <Marginer direction="vertical" margin="1em" />
        <BlackText size={16}>
          {instructor.firstName} {instructor.lastName}
        </BlackText>
        <GreyText size={14}>{instructor.username}</GreyText>
        <GreyText size={14}>{instructor.email}</GreyText>
        <Marginer direction="vertical" margin={6} />
        <BlackText size={14}>{instructor.shortBio}</BlackText>
      </InfoContainer>
    </StyledPopup>
  );
}

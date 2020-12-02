import React, { useState } from 'react';
import styled, { theme } from 'styles/styled-components';
import ImageLoader from 'react-imageloader';
import { IInstructor } from 'types/instructor';
import { BlackText, GreyText, ErrorText } from 'components/text';
import { VerticalWrapper } from 'components/verticalWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faPenAlt,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { InstructorInfoPopup } from 'components/instructorInfoPopup';

export interface IDashboardInstructorProps extends IInstructor {
  onEditClick?: () => void;
  onDeleteClick?: () => Promise<any>;
}

const InstructorContainer = styled.div`
  width: 100%;
  height: 66px;
  border: 1px solid #a4a4a4;
  background-color: #f0f0f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;

  &:not(:last-of-type) {
    margin-bottom: 14px;
  }
`;

const InstructorThumbnail = styled.div`
  width: 3.2em;
  height: 3.2em;
  margin-right: 12px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteIcon = styled.div`
  font-size: 12px;
  color: ${theme.default.dangerLight};
  cursor: pointer;
  transition: all 150ms ease-in-out;

  &:hover {
    color: ${theme.default.dangerDark};
  }
`;

const EditIcon = styled.div`
  font-size: 12px;
  color: ${theme.default.primary};
  cursor: pointer;
  transition: all 150ms ease-in-out;
  margin-right: 9px;

  &:hover {
    color: ${theme.default.primaryDark};
  }
`;

const ViewIcon = styled.div`
  font-size: 12px;
  color: ${theme.default.nightBlue};
  cursor: pointer;
  transition: all 150ms ease-in-out;
  margin-right: 9px;

  &:hover {
    color: ${theme.default.shinyBlue};
  }
`;

export function DashboardInstructor(props: IDashboardInstructorProps) {
  const {
    id,
    username,
    firstName,
    lastName,
    picture,
    onEditClick,
    onDeleteClick,
  } = props;

  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const onDelete = async () => {
    setDeleting(true);

    if (onDeleteClick) await onDeleteClick();

    setDeleting(false);
  };

  return (
    <InstructorContainer>
      <TopContainer>
        <InstructorThumbnail>
          <ImageLoader src={picture}>Error!</ImageLoader>
        </InstructorThumbnail>
        <VerticalWrapper centerVertically>
          <BlackText size={15}>
            {firstName} {lastName}
          </BlackText>
          <GreyText size={12}>{username}</GreyText>
        </VerticalWrapper>
      </TopContainer>
      <BottomContainer>
        {isDeleting && <ErrorText size={13}>Deleting</ErrorText>}
        {!isDeleting && (
          <>
            <ViewIcon onClick={() => setInfoPopupOpen(true)}>
              <FontAwesomeIcon icon={faEye} />
            </ViewIcon>
            <EditIcon onClick={() => onEditClick && onEditClick()}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </EditIcon>
            <DeleteIcon onClick={onDelete}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </DeleteIcon>
          </>
        )}
      </BottomContainer>
      <InstructorInfoPopup
        instructor={props}
        isOpen={isInfoPopupOpen}
        onClose={() => setInfoPopupOpen(false)}
      />
    </InstructorContainer>
  );
}

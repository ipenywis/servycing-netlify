import React, { useMemo, useState } from 'react';
import styled, { theme } from 'styles/styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { BlackText, GreyText, DarkText } from 'components/text';
import { ILessonTutorial } from 'types/lessonTutorial';
import { calculateAverageReadTime } from 'utils/text';
import { Alert } from 'components/alert';

export interface ILessonTutorialProps {
  allowToRemove?: boolean;
  tutorial: ILessonTutorial;

  onClick?: (tutorial: ILessonTutorial) => void;
  onDelete?: (id: string) => void;
}

const LessonTutorialContainer = styled.div`
  width: 100%;
  min-height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${theme.default.lightGreyText};
  border-radius: 4px;
  padding: 6px 14px;
  position: relative;
  transition: all 300ms ease-in-out;
  cursor: pointer;

  &:not(:last-of-type) {
    margin-bottom: 12px;
  }
`;

const ReadButton = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: ${theme.default.mutedText};
  transition: all 170ms ease-in-out;

  &:hover {
    color: ${theme.default.secondaryText};
  }
`;

const RemoveIcon = styled.div`
  position: absolute;
  top: 1px;
  right: 4px;
  font-size: 10px;
  color: ${theme.default.mutedText};
  transition: all 150ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${theme.default.greyText};
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 1.2em;
`;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

export function LessonTutorial(props: ILessonTutorialProps) {
  const { tutorial, allowToRemove, onClick, onDelete } = props;
  const [isDeleting, setDeleting] = useState(false);
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const averageReadTime = useMemo(
    () => calculateAverageReadTime(tutorial.content),
    [tutorial.content],
  );

  const openDeleteAlert = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteAlertOpen(true);
  };

  const closeDeleteAlert = () => {
    setDeleteAlertOpen(false);
  };

  const deleteHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      setDeleting(true);
      await onDelete(tutorial.id);
      setDeleting(false);
    }
  };

  return (
    <LessonTutorialContainer onClick={() => onClick && onClick(tutorial)}>
      <InnerContainer>
        {allowToRemove && (
          <RemoveIcon onClick={openDeleteAlert}>
            <FontAwesomeIcon icon={faTimes} />
          </RemoveIcon>
        )}
        <Alert
          title="Delete Tutorial?"
          isOpen={isDeleteAlertOpen}
          onCancel={closeDeleteAlert}
          onOk={deleteHandler}
        >
          Deleting tutorial will result in removing all of the lessons that
          includes the current tutorial!
          <DarkText size={14} bold marginTop={6}>
            Are you sure?
          </DarkText>
        </Alert>
        <ReadButton onClick={() => onClick && onClick(tutorial)}>
          <FontAwesomeIcon icon={faFileAlt} />
        </ReadButton>
        <ContentContainer>
          <BlackText size={15}>{tutorial.title}</BlackText>
        </ContentContainer>
        <DetailsContainer>
          {!isDeleting && (
            <GreyText size={13}>{`${averageReadTime}min read`}</GreyText>
          )}
          {isDeleting && <GreyText size={13}>Deleting...</GreyText>}
        </DetailsContainer>
      </InnerContainer>
    </LessonTutorialContainer>
  );
}

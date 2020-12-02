import React from 'react';
import styled, { theme } from 'styles/styled-components';
import { MutedText, WhiteText, GreyText } from 'components/text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import { ILesson } from 'types/lesson';
import { formatTime } from 'utils/time';

export interface ILessonTrackProps {
  lesson: ILesson;
  instuctorFullName: string;
  isCurrentPlaying?: boolean;
  isUpNext?: boolean;

  onSelect?: (lesson: ILesson) => void;
}

const TrackContainer = styled.div<ILessonTrackProps>`
  width: 100%;
  height: 88px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 8px;
  padding-top: 12px;
  flex-shrink: 0;
  transition: all 350ms ease-in-out;
  cursor: pointer;

  background-color: ${({ isCurrentPlaying }) =>
    isCurrentPlaying && theme.default.secondaryText};

  &:hover {
    background-color: ${theme.default.secondaryText};
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid ${theme.default.greyText};
  }
`;

const PlayContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 40px;
  margin-right: 8px;
`;

const PlayIconContainer = styled.div<ILessonTrackProps>`
  font-size: 12px;
  color: ${({ isCurrentPlaying }) =>
    isCurrentPlaying ? theme.default.primary : theme.default.greyText};
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StatusContainer = styled.div`
  position: absolute;
  left: 13px;
  top: 6px;
`;

export function LessonTrack(props: ILessonTrackProps) {
  const { onSelect, ...lessonProps } = props;
  const { lesson, instuctorFullName, isCurrentPlaying, isUpNext } = lessonProps;

  const duration = lesson.video ? formatTime(lesson.video.duration) : '';

  return (
    <TrackContainer
      {...lessonProps}
      onClick={() => onSelect && onSelect(lesson)}
    >
      <StatusContainer>
        <GreyText size={10} bold>
          {isCurrentPlaying && !isUpNext && 'NOW PLAYING'}
          {!isCurrentPlaying && isUpNext && 'UP NEXT'}
        </GreyText>
      </StatusContainer>
      <PlayContainer>
        <MutedText size={11} marginRight={9} verticalCenter>
          {lesson.order}
        </MutedText>
        <PlayIconContainer {...lessonProps}>
          <FontAwesomeIcon icon={faPlay} />
        </PlayIconContainer>
      </PlayContainer>
      <DetailsContainer>
        <WhiteText size={14} marginBottom={4} bold>
          {lesson.title}
        </WhiteText>
        <HorizontalWrapper>
          <GreyText size={9} marginRight={5} bold={isCurrentPlaying}>
            {duration}
          </GreyText>
          <GreyText size={9} bold={isCurrentPlaying}>
            -
          </GreyText>
          <GreyText size={9} marginLeft={5} bold={isCurrentPlaying}>
            {instuctorFullName}
          </GreyText>
        </HorizontalWrapper>
      </DetailsContainer>
    </TrackContainer>
  );
}

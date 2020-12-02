import React from 'react';
import styled, { theme } from 'styles/styled-components';
import { BlackText, DarkText, GreyText, MutedText } from 'components/text';
import { AuthorThumbnail } from 'components/authorThumbnail';

import AuthorImg from 'images/person-portrait.png';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { ILesson } from 'types/lesson';
import { formatTime } from 'utils/time';
import { IInstructor } from 'types/instructor';
import { makeHLSVideoUrl } from 'utils/video';
import { useHistory } from 'react-router-dom';
import ROUTES from 'containers/ROUTES';
import { playCourseLesson } from 'utils/lesson';

export interface ICourseLessonProps extends ILesson {
  instructor: IInstructor;
}

const CourseLessonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 65px;
  background-color: ${theme.default.componentBackground};

  &:not(:last-of-type) {
    border-bottom: 1px solid ${theme.default.lightText};
  }
`;

const LessonNumber = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1.5em;
  cursor: pointer;
`;

const LessonInfoContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 7px;
`;

const LessonMetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 15px;
`;

const IconContainer = styled.div`
  font-size: 13px;
  color: ${theme.default.greyText};
`;

export function CourseLesson(props: ICourseLessonProps) {
  const { title, order, id, instructor, video, slugs } = props;

  const formatedDuration = formatTime(video ? video.duration : 0);

  const history = useHistory();

  return (
    <CourseLessonContainer>
      <LessonNumber onClick={() => playCourseLesson(slugs, history)}>
        <BlackText size={19}>{order}</BlackText>
      </LessonNumber>
      <LessonInfoContainer>
        <DarkText
          clickable
          size={17}
          onClick={() => playCourseLesson(slugs, history)}
        >
          {title}
        </DarkText>
        <AuthorInfo>
          <AuthorThumbnail src={AuthorImg} size={18} />
          <GreyText marginLeft={5} size={12} verticalCenter>
            {`${instructor.firstName} ${instructor.lastName}`}
          </GreyText>
          <MutedText marginLeft="2%" verticalCenter size={12}>
            LESSON
          </MutedText>
        </AuthorInfo>
      </LessonInfoContainer>
      <LessonMetaContainer>
        <HorizontalWrapper centerVertically>
          <IconContainer>
            <FontAwesomeIcon icon={faClock} />
          </IconContainer>
          <GreyText marginLeft={6} size={14}>
            {formatedDuration}
          </GreyText>
        </HorizontalWrapper>
      </LessonMetaContainer>
    </CourseLessonContainer>
  );
}

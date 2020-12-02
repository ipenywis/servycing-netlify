import React from 'react';
import styled, { theme } from 'styles/styled-components';
import ImageLoader from 'react-imageloader';
import { BlackText } from 'components/text';
import Skeleton from 'react-loading-skeleton';

export interface IInstructorDashboardCourseProps {
  name?: string;
  thumbnailSrc?: string;
  isLoading?: boolean;

  onClick?: () => void;
}

const CourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 15em;
  min-height: 14em;
  border: 1px solid ${theme.default.mutedText};
  margin: 20px;
  margin-right: 2%;
  border-radius: 3px;
  cursor: pointer;
  transition: all 180ms ease-in-out;

  &:hover {
    border: 1px solid ${theme.default.greyText};
    box-shadow: 0px 0px 3px rgba(15, 15, 15, 0.2);
  }
`;

const CourseThumbnail = styled(ImageLoader)`
  width: 100%;
  height: 60%;

  img {
    width: 100%;
    height: 100%;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const EmptyThumbnailPlaceholder = styled.div`
  width: 100%;
  height: 60%;
  background-color: ${theme.default.lightGreyText};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.default.greyText};
  font-size: 14px;
`;

export function InstructorDashboardCourse(
  props: IInstructorDashboardCourseProps,
) {
  const { thumbnailSrc, name, isLoading, onClick } = props;

  return (
    <CourseContainer onClick={onClick}>
      {isLoading && (
        <div style={{ marginTop: '-3px' }}>
          <Skeleton height="9em" width="100%" wrapper="div" />
        </div>
      )}
      {!isLoading && thumbnailSrc && (
        <CourseThumbnail src={thumbnailSrc}>Error!</CourseThumbnail>
      )}
      {!isLoading && !thumbnailSrc && (
        <EmptyThumbnailPlaceholder>
          No Course Thumbnail
        </EmptyThumbnailPlaceholder>
      )}
      <ContentContainer>
        <BlackText size={15} marginTop={10} horizontalCenter>
          {!isLoading ? name : <Skeleton width="11em" />}
        </BlackText>
      </ContentContainer>
    </CourseContainer>
  );
}

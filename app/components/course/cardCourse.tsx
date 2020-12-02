import React from 'react';
import styled, { theme, css } from 'styles/styled-components';
import { Text, BlackText, MutedText } from 'components/text';
import ImageLoader from 'react-imageloader';
import { AuthorThumbnail } from 'components/authorThumbnail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VerticalWrapper } from 'components/verticalWrapper';
import { faPlayCircle, faPlay } from '@fortawesome/free-solid-svg-icons';

//Images
import AuthorSampleImg from 'images/person-portrait.png';
import Skeleton from 'react-loading-skeleton';
import { ICourse } from 'types/course';

export interface ICardCourseProps extends ICourse {
  small?: boolean;
  marginRight?: string;
  isLoading?: boolean;
}

const CourseWrapper = styled.div<ICardCourseProps>`
  padding: ${({ small }) => (small ? '1rem' : '1.5rem')};
`;

const CourseContainer = styled.div<ICardCourseProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 14em;
  min-width: 12em;
  max-width: 20em;
  min-height: 23em;
  background-color: ${theme.default.componentBackground};
  box-shadow: 0 5px 35px -10px rgba(0, 0, 0, 0.26);
  margin-top: 1em;
  padding-bottom: 2em;
  cursor: pointer;
  border-radius: 6px;
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : '0')};
  position: relative;

  ${({ small }) =>
    small &&
    css`
      flex: 1 1 10em;
      min-width: 8em;
      max-width: 15em;
      min-height: 19.8em;
    `};

  /*&:not(:last-child) {
    margin-right: 3em;
  }*/
`;

const ThumbnailPlayButton = styled.span<ICardCourseProps>`
  font-size: ${({ small }) => (small ? '23px' : '30px')};
  color: #fff;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 500ms ease-in-out;
`;

const ThumbnailContainer = styled.div<ICardCourseProps>`
  width: 100%;
  min-height: ${({ small }) => (small ? '49%' : '53%')};
  position: relative;

  img {
    width: 100%;
    height: 100%;
    transition: all 200ms ease-in-out;
    border-radius: 6px 6px 3px 3px;
  }

  &:hover img {
    filter: brightness(1.1);
  }

  &:hover > span {
    opacity: 1;
  }
`;

const Category = styled(MutedText)`
  margin-top: 7px;
  font-size: 11px;
  text-transform: uppercase;
`;

const Title = styled(BlackText)<ICardCourseProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: ${({ small }) => (small ? '15px' : '18px')};
  font-weight: normal;
  margin-top: 1.4em;
  text-align: center;
  padding: 0 10px;
`;

const AuthorName = styled(BlackText)`
  opacity: 0.8;
  font-size: 13px;
  margin-left: 13px;
`;

const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 2em;
  //margin-left: 1.4em;
  position: absolute;
  bottom: 13px;
  left: 1.2em;
`;

const NumberOfLessons = styled(BlackText)`
  font-size: 11px;
  font-weight: 400;
  margin-left: 14px;
  margin-top: 1px;
  opacity: 0.6;
`;

const PlayIconContainer = styled.span`
  position: absolute;
  right: 13px;
  bottom: 12px;
  font-size: 23px;
  color: ${theme.default.primary};
  opacity: 0.9;
  transition: color, 300ms ease-in-out;

  &:hover {
    filter: contrast(0.6);
  }
`;

const DotSeperator = styled.span`
  color: ${theme.default.mutedText};
  font-size: 12px;
  font-weight: 700;
  margin: 0 2px;
`;

const ThumbnailSkeleton = () => (
  <div style={{ marginTop: '-5px' }}>
    <Skeleton height="9em" width="100%" wrapper="div" />
  </div>
);

export function CardCourse(props: ICardCourseProps) {
  const { thumbnailUrl, name, isLoading } = props;

  return (
    <CourseWrapper {...props}>
      <CourseContainer {...props}>
        {(isLoading || !thumbnailUrl) && <ThumbnailSkeleton />}
        {!isLoading && thumbnailUrl && (
          <ThumbnailContainer {...props}>
            <ImageLoader
              src={thumbnailUrl}
              style={{ width: '100%', height: '100%' }}
              preloader={() => <ThumbnailSkeleton />}
            >
              Error!
            </ImageLoader>
            <ThumbnailPlayButton {...props}>
              <FontAwesomeIcon icon={faPlay} />
            </ThumbnailPlayButton>
          </ThumbnailContainer>
        )}
        {isLoading && <Skeleton count={1} height={7} />}
        {!isLoading && (
          <Category>
            COURSE<DotSeperator>•</DotSeperator>REACT
          </Category>
        )}
        {isLoading && <Skeleton count={1} />}
        {!isLoading && <Title {...props}>{name}</Title>}
        <DetailsContainer>
          {isLoading && <Skeleton circle={true} width={23} height={23} />}
          {!isLoading && <AuthorThumbnail src={AuthorSampleImg} size={31} />}
          <VerticalWrapper>
            <AuthorName>
              {!isLoading ? (
                'John Sandman'
              ) : (
                <Skeleton count={1} height={7} width={50} />
              )}
            </AuthorName>
            <NumberOfLessons>
              {!isLoading ? (
                '54 lessons'
              ) : (
                <Skeleton count={1} height={5} width={40} />
              )}
            </NumberOfLessons>
          </VerticalWrapper>
        </DetailsContainer>
        <PlayIconContainer>
          {!isLoading && <FontAwesomeIcon icon={faPlayCircle} />}
        </PlayIconContainer>
      </CourseContainer>
    </CourseWrapper>
  );
}

import React from 'react';
import styled, { theme } from 'styles/styled-components';
import { BlackText, MutedText } from 'components/text';
import ImageLoader from 'react-imageloader';
import { ICourse } from 'types/course';
import { VerticalWrapper } from 'components/verticalWrapper';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import { Link } from 'components/link';

//Image
import AuthorSampleImg from 'images/person-portrait.png';
import { AuthorThumbnail } from 'components/authorThumbnail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import { prepareRouteWithParams } from 'utils/route';
import ROUTES from 'containers/ROUTES';

export interface IInlineCourseProps extends ICourse {
  isLoading?: boolean;
}

const CourseContainer = styled.div`
  width: 100%;
  min-width: 4em;
  max-height: 113px;
  display: flex;
  align-items: center;
  padding: 10px 8px;
  flex: 1 1;
  background-color: ${theme.default.componentBackground};

  &:not(:last-of-type) {
    border-bottom: 2px solid ${theme.default.lightText};
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 3;
  width: 80%;
  height: 100%;
`;

const RightContainer = styled.div`
  display: flex;
  height: 100%;
  padding-right: 1em;
`;

const ThumbnailContainer = styled.div`
  width: 7em;
  height: 4.6em;
  margin-right: 1em;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    transition: all 200ms ease-in-out;
    border-radius: 4px;
  }

  &:hover img {
    filter: brightness(1.1);
  }

  &:hover > span {
    opacity: 1;
  }
`;

const ThumbnailPlayButton = styled.span`
  font-size: 20px;
  color: #fff;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 500ms ease-in-out;
`;

const Title = styled(BlackText)`
  font-size: 17px;
  font-weight: normal;
  margin-bottom: 7px;
`;

const AuthorName = styled(BlackText)`
  opacity: 0.8;
  font-size: 12px;
  margin-left: 8px;
  line-height: 2;
  font-weight: 400;
`;

const CourseDetails = styled.div`
  margin-top: 4px;
  display: flex;
`;

const CategoryText = styled(BlackText)`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
`;

const DetailsText = styled(BlackText)`
  font-size: 12px;
  font-weight: 300;

  &:not(:last-of-type) {
    margin-right: 5px;
  }
`;

const DotSeperator = styled.span`
  color: ${theme.default.mutedText};
  font-size: 17px;
  font-weight: 700;
  margin: 0 2px;
`;

export function InlineCourse(props: IInlineCourseProps) {
  const { name, thumbnailUrl, isLoading, slugs } = props;

  const defaultSlug = slugs && slugs.length > 0 ? slugs[0].slug : '#';
  const courseLink = prepareRouteWithParams(ROUTES.coursePage, defaultSlug);

  return (
    <CourseContainer>
      <LeftContainer>
        <Link to={courseLink}>
          <ThumbnailContainer>
            {!isLoading && thumbnailUrl && (
              <>
                <ImageLoader
                  src={thumbnailUrl}
                  preloader={() => <Skeleton width="100%" height="100%" />}
                >
                  Error!
                </ImageLoader>
                <ThumbnailPlayButton>
                  <FontAwesomeIcon icon={faPlay} />
                </ThumbnailPlayButton>
              </>
            )}
            {(isLoading || !thumbnailUrl) && (
              <Skeleton width="100%" height="100%" />
            )}
          </ThumbnailContainer>
        </Link>
        <VerticalWrapper centerVertically>
          {!isLoading && (
            <Title>
              <Link to={courseLink}>{name}</Link>
            </Title>
          )}
          {isLoading && <Skeleton count={1} width="10em" />}
          <HorizontalWrapper>
            {!isLoading && (
              <AuthorThumbnail
                src={AuthorSampleImg}
                size={22}
                preloader={() => <Skeleton circle width="100%" height="100%" />}
              />
            )}
            {!isLoading && (
              <Link to="#">
                <AuthorName>Islem Penywis</AuthorName>
              </Link>
            )}
            {isLoading && <Skeleton count={1} width="4em" />}
          </HorizontalWrapper>
        </VerticalWrapper>
      </LeftContainer>
      <RightContainer>
        <VerticalWrapper centerVertically>
          {!isLoading && (
            <Link to="#">
              <CategoryText>
                COURSE<DotSeperator>•</DotSeperator>REACT
              </CategoryText>
            </Link>
          )}
          {isLoading && <Skeleton count={1} width="3em" />}
          <CourseDetails>
            {!isLoading && <DetailsText>20 Lessons</DetailsText>}
            {!isLoading && <DetailsText>3h 40m</DetailsText>}
            {isLoading && <Skeleton count={1} width="2em" />}
          </CourseDetails>
        </VerticalWrapper>
      </RightContainer>
    </CourseContainer>
  );
}

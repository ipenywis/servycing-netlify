import React from 'react';
import styled from 'styles/styled-components';
import { Card } from 'components/card';
import ImageLoader from 'react-imageloader';
import { Button } from 'components/button';
import { faPlay, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { ButtonTheme } from 'components/button/themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'components/link';
import { IInstructor } from 'types/instructor';
import { AuthorInfo } from 'components/authorInfo';
import Skeleton from 'react-loading-skeleton';
import { Marginer } from 'components/marginer';
import { DarkText } from 'components/text';

export interface IWatchCourseCardProps {
  thumbnailUrl?: string;
  instructor?: IInstructor;
  isLoading?: boolean;
  coursePrice?: number;
  isFreeCourse?: boolean;

  onStartWatching?: () => void;
  onBuyCourse?: () => void;
}

const WatchCard = styled(Card)`
  width: 17em;
  min-height: 26em;
  max-height: 29em;
  padding: 0;
  border-radius: 5px;
  align-items: center;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10.1em;

  img {
    width: 100%;
    height: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
`;

const PlayIconContainer = styled.span`
  font-size: 38px;
  color: #fff;
  opacity: 0.7;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 300ms ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const WatchButton = styled(Button)`
  padding-right: 2em;
  padding-left: 1em;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-top: 1.5em;
  margin-bottom: 1.1em;
  border-radius: 2px;

  svg {
    margin-right: 7px;
  }
`;

const COURSE_PRICE_COURENCY = '$';

export function WatchCourseCard(props: IWatchCourseCardProps) {
  const {
    instructor,
    thumbnailUrl,
    isLoading,
    coursePrice,
    isFreeCourse,
    onStartWatching,
    onBuyCourse,
  } = props;

  return (
    <WatchCard>
      <ThumbnailContainer>
        {!thumbnailUrl && (
          <div style={{ marginTop: '-4px', width: '100%', height: '100%' }}>
            <Skeleton width="100%" height="100%" />
          </div>
        )}
        {thumbnailUrl && (
          <ImageLoader
            src={thumbnailUrl}
            style={{ width: '100%', height: '100%' }}
            wrapper={React.createFactory('div')}
            preloader={() => <Skeleton width="100%" height="100%" />}
          >
            Error!
          </ImageLoader>
        )}
        <PlayIconContainer onClick={onStartWatching}>
          <FontAwesomeIcon icon={faPlay} />
        </PlayIconContainer>
      </ThumbnailContainer>
      {!isFreeCourse && (
        <DarkText bold size={20} marginTop={10} marginBottom={5}>
          {COURSE_PRICE_COURENCY}
          {coursePrice}.00
        </DarkText>
      )}
      {isFreeCourse && (
        <DarkText bold size={20} marginTop={10}>
          Free
        </DarkText>
      )}
      {!isLoading && isFreeCourse && (
        <WatchButton
          buttonTheme={ButtonTheme.PRIMARY_SOLID}
          text="START WATCHING"
          icon={faPlay}
          iconSize="sm"
          iconPosition="left"
          onClick={onStartWatching}
        />
      )}
      {!isLoading && !isFreeCourse && (
        <WatchButton
          buttonTheme={ButtonTheme.PRIMARY_PRIMARY}
          text="Buy Course"
          icon={faShoppingCart}
          iconSize="sm"
          iconPosition="left"
          onClick={onBuyCourse}
        />
      )}
      {isLoading && <Marginer margin="5em" direction="vertical" />}
      {instructor && <AuthorInfo instructor={instructor} />}
    </WatchCard>
  );
}

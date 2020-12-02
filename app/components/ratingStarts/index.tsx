import React from 'react';
import styled, { theme } from 'styles/styled-components';
import BRatings from 'react-ratings-declarative';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BlackText } from 'components/text';

export interface IRatingStarsProps {
  rating: number;
  showRatingNumber?: boolean;

  onRateChange?: (rate: number) => void;
}

const Ratings = styled(BRatings)`
  display: flex;
`;

const RatingWidget = styled(BRatings.Widget)`
  stroke: red;
  fill: blue;
`;

const RatingContainer = styled.div`
  height: 20px;
  display: flex;
  align-items: flex-end;
`;

const RatingValue = styled(BlackText)`
  font-size: 15px;
  margin-left: 8px;
  margin-top: 5px;
  font-weight: 500;
`;

export function RatingStars(props: IRatingStarsProps) {
  const { rating, showRatingNumber } = props;

  return (
    <RatingContainer>
      <Ratings
        rating={rating}
        ignoreInlineStyles={false}
        widgetDimensions="18px"
        widgetSpacings="2px"
        typeOfWidget="Star"
        widgetRatedColors={theme.default.gold}
        widgetHoverColors={theme.default.shinyYellow}
        widgetEmptyColors={theme.default.mutedText}
        changeRating={props.onRateChange}
      >
        <RatingWidget />
        <RatingWidget />
        <RatingWidget />
        <RatingWidget />
        <RatingWidget />
      </Ratings>
      {showRatingNumber && <RatingValue>{rating}</RatingValue>}
    </RatingContainer>
  );
}

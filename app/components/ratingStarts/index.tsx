import React from "react";
import styled, { theme } from "styles/styled-components";
import BRatings from "react-ratings-declarative";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlackText } from "components/text";

export interface IRatingStarsProps {
  rating: number;
  showRatingNumber?: boolean;
  showAllStars?: boolean;
  size?: number;
  textSize?: number;

  onRateChange?: (rate: number) => void;
}

const Ratings = styled(BRatings)`
  display: flex;
`;

const RatingWidget = styled(BRatings.Widget)`
  stroke: red;
  fill: blue;
`;

const RatingContainer = styled.div<any>`
  height: 20px;
  display: flex;
  align-items: flex-end;
`;

const RatingValue = styled(BlackText)<any>`
  font-size: ${({ textSize }) => (textSize ? textSize + "px" : "15px")};
  margin-left: 3px;
  font-weight: 500;
`;

function RatingStars(props: IRatingStarsProps) {
  const { rating, showRatingNumber, showAllStars, size, textSize } = props;

  return (
    <RatingContainer size={size}>
      <Ratings
        rating={rating}
        ignoreInlineStyles={false}
        widgetDimensions={size || "18px"}
        widgetSpacings="2px"
        typeOfWidget="Star"
        widgetRatedColors={theme.default.gold}
        widgetHoverColors={theme.default.shinyYellow}
        widgetEmptyColors={theme.default.mutedText}
        changeRating={props.onRateChange}
      >
        {Array(showAllStars ? 5 : 1)
          .fill("")
          .map((item, idx) => (
            <RatingWidget key={idx} s />
          ))}
      </Ratings>
      {showRatingNumber && (
        <RatingValue textSize={textSize} verticalCenter>
          {rating}
        </RatingValue>
      )}
    </RatingContainer>
  );
}

RatingStars.defaultProps = {
  showAllStars: true,
};

export { RatingStars };

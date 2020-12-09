import { Avatar } from "components/avatar";
import { RatingStars } from "components/ratingStarts";
import { GreyText } from "components/text";
import React from "react";
import styled, { theme } from "styles/styled-components";
import { IServiceReview } from "types/serviceReview";

interface IReviewCardProps extends IServiceReview {}

const ReviewCardContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 1.2em 0;
  border-top: 1px solid ${theme.default.mutedBorderColor};

  &:last-of-type {
    border-bottom: 1px solid ${theme.default.mutedBorderColor};
  }
`;

const CustomerInfo = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;
`;

export function ReviewCard(props: IReviewCardProps) {
  const { customer, review, rating } = props;

  return (
    <ReviewCardContainer>
      <CustomerInfo>
        <Avatar name={customer.fullName} size={34} />
        <GreyText size={15} marginLeft={7} marginRight={10} bold>
          {customer.fullName}
        </GreyText>
        <RatingStars rating={rating} showAllStars={false} showRatingNumber />
      </CustomerInfo>
      <GreyText size={14}>{review}</GreyText>
    </ReviewCardContainer>
  );
}

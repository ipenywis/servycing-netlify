import { AuthorThumbnail } from "components/authorThumbnail";
import React from "react";
import styled from "styles/styled-components";

import Img from "images/services thumbnails/garden.jpg";
import { BlackText, GreyText, MutedText } from "components/text";
import { RatingStars } from "components/ratingStarts";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { Marginer } from "components/marginer";
import { createSelector } from "reselect";
import { makeSelectSpecialist } from "./selectors";
import { useSelector } from "react-redux";
import { Avatar } from "components/avatar";

interface ISpecilistInfoProps {}

const SpecialistInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const stateSelector = createSelector(makeSelectSpecialist, (specialist) => ({
  specialist,
}));

export function SpecialistInfo(props: ISpecilistInfoProps) {
  const { specialist } = useSelector(stateSelector);

  if (!specialist) return null;

  return (
    <SpecialistInfoContainer>
      <Avatar name={specialist.fullName} size={140} />
      <BlackText size={22} bold marginTop={13}>
        {specialist.fullName}
      </BlackText>
      <GreyText size={13} marginTop={1}>
        {specialist.shortBio}
      </GreyText>
      <Marginer direction="vertical" margin={5} />
      <HorizontalWrapper centered centerVertically>
        <RatingStars rating={specialist.rating} showRatingNumber size={15} />
        <MutedText size={12} marginLeft={4}>
          (24 reviews)
        </MutedText>
      </HorizontalWrapper>
    </SpecialistInfoContainer>
  );
}

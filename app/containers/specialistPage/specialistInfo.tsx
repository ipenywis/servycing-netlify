import { AuthorThumbnail } from "components/authorThumbnail";
import React from "react";
import styled from "styles/styled-components";

import Img from "images/services thumbnails/garden.jpg";
import { BlackText, GreyText, MutedText } from "components/text";
import { RatingStars } from "components/ratingStarts";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { Marginer } from "components/marginer";

interface ISpecilistInfoProps {}

const SpecialistInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function SpecialistInfo(props: ISpecilistInfoProps) {
  return (
    <SpecialistInfoContainer>
      <AuthorThumbnail src={Img} size={150} />
      <BlackText size={22} bold marginTop={13}>
        Islem Maboud
      </BlackText>
      <GreyText size={13} marginTop={1}>
        Landscaping Specialist, Love being creative!
      </GreyText>
      <Marginer direction="vertical" margin={2} />
      <HorizontalWrapper centered centerVertically>
        <RatingStars rating={5} size={13} />
        <MutedText size={11} marginLeft={4}>
          (24 reviews)
        </MutedText>
      </HorizontalWrapper>
    </SpecialistInfoContainer>
  );
}

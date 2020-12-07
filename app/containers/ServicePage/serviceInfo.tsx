import { AuthorThumbnail } from "components/authorThumbnail";
import { Avatar } from "components/avatar";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { Marginer } from "components/marginer";
import { BlackText, DarkText, GreyText } from "components/text";
import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import styled from "styles/styled-components";
import { makeSelectService } from "./selectors";
import ImageLoader from "react-imageloader";

import Img from "images/services thumbnails/garden.jpg";
import { RatingStars } from "components/ratingStarts";

interface IServiceInfoProps {}

const ServiceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 60%;
`;

const ServiceThumbnail = styled.div`
  max-width: 100%;
  max-height: 50%;
  width: auto;
  height: auto;

  img {
    width: 100%;
    height: 100%;
  }
`;

const stateSelector = createSelector(makeSelectService, (service) => ({
  service,
}));

export function ServiceInfo(props: IServiceInfoProps) {
  const { service } = useSelector(stateSelector);

  if (!service) return null;

  return (
    <ServiceInfoContainer>
      <DarkText size={30} black lineHeight={1.3} marginBottom={9}>
        {service.title}
      </DarkText>
      <HorizontalWrapper height="auto" centerVertically>
        <Avatar name={service.specialist.fullName} color="green" size={29} />
        <GreyText size={12} marginLeft={5} verticalCenter>
          {service.specialist.fullName}
        </GreyText>
        <Marginer direction="horizontal" margin="10px" />
        <RatingStars textSize={14} size={15} rating={5} showRatingNumber />
        <BlackText size={12} marginLeft={11} verticalCenter>
          {service.type.toLowerCase()}
        </BlackText>
      </HorizontalWrapper>
      <Marginer direction="vertical" margin="1em" />
      <ServiceThumbnail>
        <ImageLoader src={Img} />
      </ServiceThumbnail>
      <Marginer direction="vertical" margin="2em" />
      <BlackText size={18} black>
        About the service
      </BlackText>
      <GreyText size={14} marginTop="1em" lineHeight={1.7}>
        {service.description}
      </GreyText>
    </ServiceInfoContainer>
  );
}

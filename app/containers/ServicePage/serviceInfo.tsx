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

  return (
    <ServiceInfoContainer>
      <DarkText size={30} black lineHeight={1.3} marginBottom={9}>
        I will landscape your home backyard from top to bottom
      </DarkText>
      <HorizontalWrapper height="auto" centerVertically>
        <Avatar name="Islem Maboud" color="green" size={28} />
        <GreyText size={12} marginLeft={5} verticalCenter>
          Kane Morker
        </GreyText>
        <Marginer direction="horizontal" margin="10px" />
        <RatingStars textSize={14} size={15} rating={5} showRatingNumber />
        <BlackText size={12} marginLeft={11} verticalCenter>
          Landscaping
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sagittis dui eget mi porttitor, non interdum risus molestie. Proin
        semper turpis vitae ipsum euismod, a mattis orci commodo. Nullam nec
        metus vehicula, iaculis velit a, congue neque. Duis ultricies felis id
        diam aliquam, id accumsan lacus pretium. Praesent sagittis condimentum
        felis id mollis. Mauris vitae risus iaculis enim sodales molestie.
        Suspendisse orci neque, placerat at erat dignissim, venenatis porta
        diam. Proin egestas, mauris id faucibus condimentum, diam lacus aliquet
      </GreyText>
    </ServiceInfoContainer>
  );
}

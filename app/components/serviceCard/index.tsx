import React from "react";
import styled, { theme } from "styles/styled-components";
import ImageLoader from "react-imageloader";

//Only for testing purposes
import GardenImg from "images/services thumbnails/garden.jpg";
import { BlackText, GreyText, MutedText, SuccessText } from "components/text";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { Avatar } from "components/avatar";
import { RatingStars } from "components/ratingStarts";

interface IServiceCardProps {}

const CardContainer = styled.div`
  width: 300px;
  min-height: 280px;
  background-color: ${theme.default.componentBackground};
  border-radius: 3px;
  box-shadow: 0 0px 1px 1px rgba(0, 0, 0, 0.17);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0.5em;
  margin-bottom: 1.3em;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 160px;
`;

const ServiceThumbnail = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 14px;
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  padding: 0 10px;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${theme.default.lightGreyText};
`;

export function ServiceCard(props: IServiceCardProps) {
  return (
    <CardContainer>
      <TopContainer>
        <ServiceThumbnail>
          <ImageLoader src={GardenImg} />
        </ServiceThumbnail>
      </TopContainer>
      <ContentContainer>
        <BlackText size={17} bold marginBottom={10}>
          I will landscape your home backyard and make you feel happy
        </BlackText>
        <HorizontalWrapper centerVertically>
          <Avatar size={24} />
          <BlackText size={12} marginLeft={3}>
            Islem Maboud
          </BlackText>
        </HorizontalWrapper>
      </ContentContainer>
      <BottomContainer>
        <RatingStars rating={5} showRatingNumber showAllStars={false} />
        <HorizontalWrapper>
          <MutedText size={12} verticalCenter marginRight={4} marginBottom={2}>
            STARTING AT
          </MutedText>
          <SuccessText size={15} bold>
            $200
          </SuccessText>
          <MutedText size={11} verticalCenter>
            /hr
          </MutedText>
        </HorizontalWrapper>
      </BottomContainer>
    </CardContainer>
  );
}

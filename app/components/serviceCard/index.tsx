import React from "react";
import styled, { theme } from "styles/styled-components";
import ImageLoader from "react-imageloader";

//Only for testing purposes
import GardenImg from "images/services thumbnails/garden.jpg";
import { BlackText, GreyText, MutedText, SuccessText } from "components/text";
import { HorizontalWrapper } from "components/horizontalWrapper";

interface IServiceCardProps {}

const CardContainer = styled.div`
  width: 320px;
  min-height: 280px;
  background-color: ${theme.default.componentBackground};
  border-radius: 3px;
  box-shadow: 0 0px 1px 1px rgba(0, 0, 0, 0.17);
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  padding: 4px 10px;
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 35px;
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
        <BlackText size={19} bold>
          I will landscape your home backyard
        </BlackText>
      </ContentContainer>
      <BottomContainer>
        <div>5</div>
        <HorizontalWrapper>
          <MutedText size={13} verticalCenter marginRight={4} marginBottom={2}>
            STARTING AT
          </MutedText>
          <SuccessText size={16} bold>
            $200
          </SuccessText>
          <MutedText size={12} verticalCenter>
            /hr
          </MutedText>
        </HorizontalWrapper>
      </BottomContainer>
    </CardContainer>
  );
}

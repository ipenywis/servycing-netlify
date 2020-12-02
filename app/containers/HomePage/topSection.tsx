import React from "react";
import styled from "styles/styled-components";
import { DesktopQuery, Device } from "components/responsive";
import { BrandLogo } from "components/brandLogo";
import { WhiteText } from "components/text";
import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import { Marginer } from "components/marginer";
import ImageLoader from "react-imageloader";

//Images
import TopSectionBackgroundImg from "images/landing-page.jpg";
import StandoutImg from "images/work_with_the_best.png";
import { useMediaQuery } from "react-responsive";

interface ITopSectionProps {
  children?: any | any[];
}

const TopSectionContainer = styled.div`
  width: 100%;
  height: 600px;
  background: url(${TopSectionBackgroundImg}) no-repeat;
  background-position: 0px -50px;
  background-size: cover;

  @media ${Device.desktop} {
    height: 900px;
    background-position: 0px -160px;
  }
`;

const BackgroundFilter = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(38, 70, 83, 0.9);
  display: flex;
  flex-direction: column;
`;

const TopSectionInnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const StandoutImage = styled.div`
  width: 29em;
  height: 24em;

  @media ${Device.desktop} {
    width: 37em;
    height: 32em;
  }

  span,
  img {
    width: 100% !important;
    height: 100% !important;
  }
`;

const SloganContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export function TopSection(props: ITopSectionProps) {
  const { children } = props;

  const isDesktop = useMediaQuery({ query: Device.desktop });

  return (
    <TopSectionContainer>
      <BackgroundFilter>
        {children}
        <TopSectionInnerContainer>
          <ContentContainer>
            <SloganContainer>
              <BrandLogo
                size={isDesktop ? 45 : 38}
                logoSize={40}
                height="auto"
              />
              <WhiteText
                size={isDesktop ? "2.3em" : "1.7em"}
                bold
                lineHeight={1.4}
              >
                Find the right specialist
              </WhiteText>
              <WhiteText
                size={isDesktop ? "2.3em" : "1.7em"}
                bold
                lineHeight={1.4}
              >
                For the right job
              </WhiteText>
              <Marginer direction="vertical" margin="1em" />
              <Button buttonTheme={ButtonTheme.PRIMARY_SOLID} text="Join Now" />
            </SloganContainer>
            <StandoutImage>
              <ImageLoader src={StandoutImg} />
            </StandoutImage>
          </ContentContainer>
        </TopSectionInnerContainer>
      </BackgroundFilter>
    </TopSectionContainer>
  );
}

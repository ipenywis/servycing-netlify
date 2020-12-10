import { BrandLogo } from "components/brandLogo";
import { Device } from "components/responsive";
import React from "react";
import { useMediaQuery } from "react-responsive";
import styled, { theme } from "styles/styled-components";
import { WhiteText } from "components/text";
import { Marginer } from "components/marginer";

//Images
import FarmingImg from "images/farming.png";

import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import ImageLoader from "react-imageloader";
import ROUTES from "containers/ROUTES";

interface ISpecialistAdProps {}

const SpecialistAdContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: ${theme.default.blueDianne};
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

const SloganContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StandoutImage = styled.div`
  width: 28em;
  height: 23em;

  @media ${Device.desktop} {
    width: 35em;
    height: 29em;
  }

  span,
  img {
    width: 100% !important;
    height: 100% !important;
  }
`;

export function SpecialistAd(props: ISpecialistAdProps) {
  const isDesktop = useMediaQuery({ query: Device.desktop });

  return (
    <SpecialistAdContainer>
      <ContentContainer>
        <SloganContainer>
          <BrandLogo size={isDesktop ? 38 : 34} logoSize={37} height="auto" />
          <WhiteText size={isDesktop ? "1.8em" : "1.4em"} bold lineHeight={1.4}>
            You're a Specialist, and you
          </WhiteText>
          <WhiteText size={isDesktop ? "1.8em" : "1.4em"} bold lineHeight={1.4}>
            have an outstanding
          </WhiteText>
          <WhiteText size={isDesktop ? "1.8em" : "1.4em"} bold lineHeight={1.4}>
            Service to offer?
          </WhiteText>
          <Marginer direction="vertical" margin="1em" />
          <Button
            buttonTheme={ButtonTheme.PRIMARY_SOLID}
            text="Join as Specialist"
            to={ROUTES.specialistRegisterPage}
          />
        </SloganContainer>
        <StandoutImage>
          <ImageLoader src={FarmingImg} />
        </StandoutImage>
      </ContentContainer>
    </SpecialistAdContainer>
  );
}

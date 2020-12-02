import React from "react";
import styled from "styles/styled-components";
import TopSectionBackgroundImg from "images/landing-page.jpg";
import { Device } from "components/responsive";

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

export function TopSection(props: ITopSectionProps) {
  const { children } = props;

  return (
    <TopSectionContainer>
      <BackgroundFilter>
        {children}
        <TopSectionInnerContainer>topSection</TopSectionInnerContainer>
      </BackgroundFilter>
    </TopSectionContainer>
  );
}

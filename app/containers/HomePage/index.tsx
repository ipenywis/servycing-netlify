import { Footer } from "components/footer";
import { Marginer } from "components/marginer";
import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import { ServiceCard } from "components/serviceCard";
import { SpecialistAd } from "components/specialistAd";
import { BlackText } from "components/text";
import React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styles/styled-components";
import { RecommendedServices } from "./recommendedServices";
import { TopSection } from "./topSection";

interface IHomePageProps {}

const StyledInnerPageContainer = styled(InnerPageContainer as any)`
  padding: 0;
`;

function HomePage(props: IHomePageProps) {
  return (
    <PageContainer>
      <TopSection>
        <Navbar transparent />
      </TopSection>
      <StyledInnerPageContainer>
        <Marginer direction="vertical" margin="2em" />
        <RecommendedServices />
        <Marginer direction="vertical" margin="5em" />
        <SpecialistAd />
      </StyledInnerPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default hot(HomePage);

import { Marginer } from "components/marginer";
import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import { ServiceCard } from "components/serviceCard";
import { SpecialistAd } from "components/specialistAd";
import { BlackText } from "components/text";
import React from "react";
import { hot } from "react-hot-loader/root";
import { RecommendedServices } from "./recommendedServices";
import { TopSection } from "./topSection";

interface IHomePageProps {}

function HomePage(props: IHomePageProps) {
  return (
    <PageContainer>
      <TopSection>
        <Navbar transparent />
      </TopSection>
      <InnerPageContainer>
        <Marginer direction="vertical" margin="2em" />
        <BlackText size={27} black>
          Most used services &#38; More
        </BlackText>
        <Marginer direction="vertical" margin="2em" />
        <RecommendedServices />
        <Marginer direction="vertical" margin="4em" />
        <SpecialistAd />
      </InnerPageContainer>
    </PageContainer>
  );
}

export default hot(HomePage);

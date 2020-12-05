import React from "react";
import { Footer } from "components/footer";
import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import { hot } from "react-hot-loader/root";
import { BlackText, MutedText } from "components/text";
import { Marginer } from "components/marginer";
import { OfferedServices } from "./offeredServices";

interface ISpecialistDashboardPageProps {}

function SpecialistDashboardPage(props: ISpecialistDashboardPageProps) {
  return (
    <PageContainer>
      <Navbar />
      <InnerPageContainer>
        <BlackText size={35} black>
          Dashboard
        </BlackText>
        <MutedText size={16}>
          View and Manage all of your offered services and pending requests
        </MutedText>
        <Marginer direction="vertical" margin="4em" />
        <OfferedServices />
      </InnerPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default hot(SpecialistDashboardPage);

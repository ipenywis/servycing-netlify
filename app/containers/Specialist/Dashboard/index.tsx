import React from "react";
import { Footer } from "components/footer";
import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import { hot } from "react-hot-loader/root";
import { BlackText, MutedText } from "components/text";
import { Marginer } from "components/marginer";
import { useInjectReducer } from "redux-injectors";
import specialistDashboardReducer, { REDUCER_KEY } from "./reducer";
import { screenSizes } from "components/responsive";
import { SectionsManager } from "./sectionsManager";

interface ISpecialistDashboardPageProps {}

function SpecialistDashboardPage(props: ISpecialistDashboardPageProps) {
  useInjectReducer({ key: REDUCER_KEY, reducer: specialistDashboardReducer });

  return (
    <PageContainer>
      <Navbar />
      <InnerPageContainer maxWidth={`${screenSizes.laptop}px`}>
        <BlackText size={35} black>
          Dashboard
        </BlackText>
        <MutedText size={14}>
          View and Manage all of your offered services and pending requests.
        </MutedText>
        <Marginer direction="vertical" margin="1.5em" />
        <SectionsManager />
      </InnerPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default hot(SpecialistDashboardPage);

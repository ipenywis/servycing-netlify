import React from "react";
import { Footer } from "components/footer";
import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import { hot } from "react-hot-loader/root";
import { BlackText } from "components/text";

interface ISpecialistDashboardPageProps {}

function SpecialistDashboardPage(props: ISpecialistDashboardPageProps) {
  return (
    <PageContainer>
      <Navbar />
      <InnerPageContainer>
        <BlackText size={35} black>
          Dashboard
        </BlackText>
      </InnerPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default hot(SpecialistDashboardPage);

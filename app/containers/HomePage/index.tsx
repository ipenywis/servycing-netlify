import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import React from "react";
import { hot } from "react-hot-loader/root";
import { TopSection } from "./topSection";

interface IHomePageProps {}

function HomePage(props: IHomePageProps) {
  return (
    <PageContainer>
      <TopSection>
        <Navbar transparent />
      </TopSection>
      <InnerPageContainer></InnerPageContainer>
    </PageContainer>
  );
}

export default hot(HomePage);

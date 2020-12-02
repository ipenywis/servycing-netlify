import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import React from "react";
import { hot } from "react-hot-loader/root";

interface IHomePageProps {}

function HomePage(props: IHomePageProps) {
  return (
    <PageContainer>
      <Navbar />
      <InnerPageContainer>Page</InnerPageContainer>
    </PageContainer>
  );
}

export default hot(HomePage);

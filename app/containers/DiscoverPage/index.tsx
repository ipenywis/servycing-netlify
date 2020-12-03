import React from "react";
import { Footer } from "components/footer";
import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import { hot } from "react-hot-loader/root";
import styled from "styles/styled-components";
import { screenSizes } from "components/responsive";
import { BlackText } from "components/text";
import { ServicesFilterBar } from "components/servicesFilterBar";
import { Marginer } from "components/marginer";

interface IDiscoverPageProps {}

const StyledInnerPageContainer = styled(InnerPageContainer as any)`
  max-width: ${screenSizes.laptop}px;
`;

function DiscoverPage(props: IDiscoverPageProps) {
  return (
    <PageContainer>
      <Navbar />
      <StyledInnerPageContainer>
        <BlackText size={30} black>
          Discover More
        </BlackText>
        <Marginer direction="vertical" margin="11px" />
        <ServicesFilterBar
          onChange={(value) => console.log("Change: ", value)}
        />
      </StyledInnerPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default hot(DiscoverPage);

import { Footer } from "components/footer";
import { Marginer } from "components/marginer";
import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import { DarkText } from "components/text";
import React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styles/styled-components";
import { SpecialistInfo } from "./specialistInfo";

interface ISpecialistPageProps {}

const SpecialistPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5em;
`;

function SpecialistPage(props: ISpecialistPageProps) {
  return (
    <PageContainer>
      <Navbar />
      <InnerPageContainer>
        <SpecialistPageContainer>
          <DarkText size={26} black>
            Servycing Specialist
          </DarkText>
          <Marginer direction="vertical" margin="1.7em" />
          <SpecialistInfo />
        </SpecialistPageContainer>
      </InnerPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default hot(SpecialistPage);

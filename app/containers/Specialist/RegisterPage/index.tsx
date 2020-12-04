import { Footer } from "components/footer";
import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import { SignupBox } from "./signupBox";
import React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styles/styled-components";
import { DarkText } from "components/text";

interface IRegisterPageProps {}

const RegisterPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function SpecialistRegisterPage(props: IRegisterPageProps) {
  return (
    <PageContainer>
      <Navbar />
      <InnerPageContainer>
        <RegisterPageContainer>
          <DarkText size={35} black marginTop="1em" marginBottom="1.5em">
            Join Now and offer your services
          </DarkText>
          <SignupBox />
        </RegisterPageContainer>
      </InnerPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default hot(SpecialistRegisterPage);

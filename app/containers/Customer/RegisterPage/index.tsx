import { Footer } from "components/footer";
import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import { SignupBox } from "./signupBox";
import React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styles/styled-components";

interface IRegisterPageProps {}

const RegisterPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function CustomerRegisterPage(props: IRegisterPageProps) {
  return (
    <PageContainer>
      <Navbar />
      <InnerPageContainer>
        <RegisterPageContainer>
          <SignupBox />
        </RegisterPageContainer>
      </InnerPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default hot(CustomerRegisterPage);

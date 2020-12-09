import { Footer } from "components/footer";
import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import { DarkText } from "components/text";
import React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styles/styled-components";

import { LoginBox } from "./loginBox";

interface IAdminLoginPageProps {}

const LoginPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function AdminLoginPage(props: IAdminLoginPageProps) {
  return (
    <PageContainer>
      <Navbar />
      <InnerPageContainer>
        <LoginPageContainer>
          <DarkText size={35} black marginTop="1em" marginBottom="1.5em">
            Welcome Back Boss!
          </DarkText>
          <LoginBox />
        </LoginPageContainer>
      </InnerPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default hot(AdminLoginPage);

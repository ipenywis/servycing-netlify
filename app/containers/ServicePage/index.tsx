import React from "react";
import { Footer } from "components/footer";
import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import { hot } from "react-hot-loader/root";
import { useInjectReducer } from "redux-injectors";
import servicePageReducer, { REDUCER_KEY } from "./reducer";
import styled from "styles/styled-components";
import { screenSizes } from "components/responsive";
import { ServiceInfo } from "./serviceInfo";
import { OrderService } from "./orderService";

interface IServicePageProps {}

const ServiceContainer = styled.div`
  max-width: ${screenSizes.laptop}px;
  display: flex;
  justify-content: center;
  align-self: center;
  padding-top: 2em;
`;

function ServicePage(props: IServicePageProps) {
  useInjectReducer({ key: REDUCER_KEY, reducer: servicePageReducer });

  return (
    <PageContainer>
      <Navbar />
      <InnerPageContainer>
        <ServiceContainer>
          <ServiceInfo />
          <OrderService />
        </ServiceContainer>
      </InnerPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default hot(ServicePage);

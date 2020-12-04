import React, { useEffect } from "react";
import { Footer } from "components/footer";
import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import { hot } from "react-hot-loader/root";
import styled from "styles/styled-components";
import { screenSizes } from "components/responsive";
import { BlackText, MutedText } from "components/text";
import { ServicesFilterBar } from "components/servicesFilterBar";
import { Marginer } from "components/marginer";
import offeredServicesService from "services/offeredServicesService";
import { Dispatch } from "redux";
import { IServicesFilter } from "types/offeredService";
import { setFilters } from "./actions";
import { useDispatch } from "react-redux";
import { Services } from "./services";
import { useInjectReducer } from "redux-injectors";
import discoverPageReducer, { REDUCER_KEY } from "./reducer";

interface IDiscoverPageProps {}

const StyledInnerPageContainer = styled(InnerPageContainer as any)`
  max-width: ${screenSizes.laptop}px;
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setFilters: (filters: IServicesFilter) => dispatch(setFilters(filters)),
});

function DiscoverPage(props: IDiscoverPageProps) {
  //Inject Reducer
  useInjectReducer({ key: REDUCER_KEY, reducer: discoverPageReducer });

  const { setFilters } = actionDispatch(useDispatch());

  return (
    <PageContainer>
      <Navbar />
      <StyledInnerPageContainer>
        <BlackText size={39} black>
          Discover More
        </BlackText>
        <MutedText size={14}>
          Explore services that are made especially for you.
        </MutedText>
        <Marginer direction="vertical" margin="1.5em" />
        <ServicesFilterBar onChange={setFilters} />
        <Marginer direction="vertical" margin="2.5em" />
        <Services />
      </StyledInnerPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default hot(DiscoverPage);

import React, { useEffect, useState } from "react";
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
import offeredServicesService from "services/offeredServicesService";
import { useParams } from "react-router-dom";
import { Pane } from "components/pane";
import { MinimalSpinner } from "components/loadingSpinner/minimal";
import { Dispatch } from "redux";
import { IOfferedService } from "types/offeredService";
import { setService } from "./actions";
import { useDispatch } from "react-redux";
import { ErrorText } from "components/text";

interface IServicePageProps {}

const ServiceContainer = styled.div`
  max-width: ${screenSizes.laptop}px;
  display: flex;
  justify-content: center;
  align-self: center;
  padding-top: 2em;
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setService: (service: IOfferedService) => dispatch(setService(service)),
});

function ServicePage(props: IServicePageProps) {
  useInjectReducer({ key: REDUCER_KEY, reducer: servicePageReducer });
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setService } = actionDispatch(useDispatch());

  const { id } = useParams<{ id: string }>();

  const fetchOfferedService = async () => {
    setLoading(true);
    const service = await offeredServicesService
      .getOfferedServiceById(id)
      .catch((err) => {
        setError((err && err.message) || "Unexpected error occured!");
      });

    if (service) setService(service);

    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchOfferedService();
  }, [id]);

  return (
    <PageContainer>
      <Navbar />
      <InnerPageContainer>
        {error && !isLoading && (
          <Pane alignCenter>
            <ErrorText size={16}>{error}</ErrorText>
          </Pane>
        )}
        {isLoading && !error && (
          <Pane alignCenter>
            <MinimalSpinner size="lg" />
          </Pane>
        )}
        {!isLoading && !error && (
          <ServiceContainer>
            <ServiceInfo />
            <OrderService />
          </ServiceContainer>
        )}
      </InnerPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default hot(ServicePage);

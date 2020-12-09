import { HorizontalWrapper } from "components/horizontalWrapper";
import { MinimalSpinner } from "components/loadingSpinner/minimal";
import { ServiceCard } from "components/serviceCard";
import uniqBy from "lodash/uniqBy";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import offeredServicesService from "services/offeredServicesService";
import styled from "styles/styled-components";
import { IFinishedProject } from "types/finishedProject";
import { setFinishedServices } from "./actionts";
import { makeSelectFinishedServices, makeSelectSpecialist } from "./selectors";

interface IFinishedServicesProps {}

const FinishedServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setFinishedServices: (services: IFinishedProject[]) =>
    dispatch(setFinishedServices(services)),
});

const stateSelector = createSelector(
  makeSelectFinishedServices,
  makeSelectSpecialist,
  (finishedServices, specialist) => ({
    finishedServices,
    specialist,
  })
);

export function FinishedServices(props: IFinishedServicesProps) {
  const { finishedServices, specialist } = useSelector(stateSelector);
  const { setFinishedServices } = actionDispatch(useDispatch());
  const [isLoading, setLoading] = useState(false);

  const isEmptyFinishedServices =
    !finishedServices || (finishedServices && finishedServices.length === 0);

  if (!specialist) return null;

  const fetchFinishedServices = async () => {
    setLoading(true);
    const finishedServicesWithCount = await offeredServicesService
      .getSpecialistFinishedServicesById(specialist.id)
      .catch((err) => {
        console.log("Error: ", err);
      });

    if (finishedServicesWithCount) {
      setFinishedServices(finishedServicesWithCount.finishedServices);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchFinishedServices();
  }, []);

  //Make sure services are unique
  const uniqueServices = useMemo(() => {
    return uniqBy(finishedServices, "offeredService");
  }, [finishedServices]);

  return (
    <FinishedServicesContainer>
      boom
      {isLoading && (
        <HorizontalWrapper centered>
          {<MinimalSpinner size="md" />}
        </HorizontalWrapper>
      )}
      <ServicesContainer>
        {!isEmptyFinishedServices &&
          !isLoading &&
          uniqueServices.map((service, idx) => (
            <ServiceCard key={idx} {...service.offeredService} />
          ))}
      </ServicesContainer>
    </FinishedServicesContainer>
  );
}

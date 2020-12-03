import { ServiceCard } from "components/serviceCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import offeredServicesService from "services/offeredServicesService";
import styled from "styles/styled-components";
import { IOfferedService, IServicesFilter } from "types/offeredService";
import { setFilters, setOfferedServices } from "./actions";
import { makeSelectFilters, makeSelectOfferedServices } from "./selectors";

interface IServicesProps {}

const ServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ServicesWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const stateSelector = createSelector(
  makeSelectOfferedServices,
  makeSelectFilters,
  (offeredServices, filters) => ({
    offeredServices,
    filters,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setOfferedServices: (services: IOfferedService[]) =>
    dispatch(setOfferedServices(services)),
  setFilters: (filters: IServicesFilter) => dispatch(setFilters(filters)),
});

export function Services(props: IServicesProps) {
  const { offeredServices, filters } = useSelector(stateSelector);
  const { setOfferedServices, setFilters } = actionDispatch(useDispatch());

  const isEmptyOfferedServices =
    !offeredServices || (offeredServices && offeredServices.length === 0);

  const fetchOfferedServices = async () => {
    const fetchedServices = await offeredServicesService
      .getAndFilterOfferedServices(filters || undefined)
      .catch((err) => {
        console.log("Error: ", err);
      });

    if (fetchedServices) setOfferedServices(fetchedServices);
  };

  useEffect(() => {
    fetchOfferedServices();
  }, [filters]);

  return (
    <ServicesContainer>
      <ServicesWrapper>
        {!isEmptyOfferedServices &&
          offeredServices.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
      </ServicesWrapper>
    </ServicesContainer>
  );
}

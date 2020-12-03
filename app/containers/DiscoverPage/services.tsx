import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import { Marginer } from "components/marginer";
import { ServiceCard } from "components/serviceCard";
import { WarningText } from "components/text";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import offeredServicesService from "services/offeredServicesService";
import styled from "styles/styled-components";
import { IOfferedService } from "types/offeredService";
import { ILoadRangeOptions } from "types/pagination";
import { setLoadRange, setOfferedServices } from "./actions";
import {
  makeSelectFilters,
  makeSelectLoadRange,
  makeSelectOfferedServices,
} from "./selectors";

interface IServicesProps {}

const ServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ServicesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const stateSelector = createSelector(
  makeSelectOfferedServices,
  makeSelectFilters,
  makeSelectLoadRange,
  (offeredServices, filters, loadRange) => ({
    offeredServices,
    filters,
    loadRange,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setOfferedServices: (services: IOfferedService[]) =>
    dispatch(setOfferedServices(services)),
  setLoadRange: (range: ILoadRangeOptions) => dispatch(setLoadRange(range)),
});

export function Services(props: IServicesProps) {
  const { offeredServices, filters, loadRange } = useSelector(stateSelector);
  const { setOfferedServices, setLoadRange } = actionDispatch(useDispatch());

  const isEmptyOfferedServices =
    !offeredServices || (offeredServices && offeredServices.length === 0);

  const fetchOfferedServices = async (loadedRange?: boolean) => {
    const fetchedServices = await offeredServicesService
      .getAndFilterOfferedServices(filters || undefined, loadRange)
      .catch((err) => {
        console.log("Error: ", err);
      });

    console.log("Services: ", fetchedServices, loadedRange);

    if (fetchedServices && loadedRange)
      setOfferedServices([...offeredServices, ...fetchedServices]);
    else if (fetchedServices) setOfferedServices(fetchedServices);
  };

  const updateLoadRange = () => {
    setLoadRange({ start: loadRange.range, range: 1 });
  };

  useEffect(() => {
    fetchOfferedServices(false);
  }, [filters]);

  useEffect(() => {
    fetchOfferedServices(true);
  }, [loadRange]);

  return (
    <ServicesContainer>
      <ServicesWrapper>
        {isEmptyOfferedServices && (
          <WarningText
            size={14}
            marginTop="4em"
            horizontalCenter
            verticalCenter
          >
            No services found using these filters!
          </WarningText>
        )}
        {!isEmptyOfferedServices &&
          offeredServices.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
      </ServicesWrapper>
      <Marginer direction="vertical" margin="3em" />
      <Button
        text="View More"
        buttonTheme={ButtonTheme.GREY_SOLID}
        onClick={updateLoadRange}
      />
    </ServicesContainer>
  );
}

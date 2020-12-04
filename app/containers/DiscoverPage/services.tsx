import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import { Marginer } from "components/marginer";
import { ServiceCard } from "components/serviceCard";
import { WarningText } from "components/text";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import offeredServicesService from "services/offeredServicesService";
import styled from "styles/styled-components";
import { IOfferedService } from "types/offeredService";
import { ILoadRangeOptions } from "types/pagination";
import {
  setLoadRange,
  setOfferedServices,
  setOfferedServicesCount,
} from "./actions";
import { DEFAULT_LOAD_RANGE } from "./constants";
import {
  makeSelectFilters,
  makeSelectLoadRange,
  makeSelectOfferedServices,
  makeSelectOfferedServicesCount,
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
  makeSelectOfferedServicesCount,
  (offeredServices, filters, loadRange, offeredServicesCount) => ({
    offeredServices,
    filters,
    loadRange,
    offeredServicesCount,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setOfferedServices: (services: IOfferedService[]) =>
    dispatch(setOfferedServices(services)),
  setOfferedServicesCount: (count: number) =>
    dispatch(setOfferedServicesCount(count)),
  setLoadRange: (range: ILoadRangeOptions) => dispatch(setLoadRange(range)),
});

export function Services(props: IServicesProps) {
  const {
    offeredServices,
    filters,
    loadRange,
    offeredServicesCount,
  } = useSelector(stateSelector);
  const {
    setOfferedServices,
    setLoadRange,
    setOfferedServicesCount,
  } = actionDispatch(useDispatch());

  const isEmptyOfferedServices =
    !offeredServices || (offeredServices && offeredServices.length === 0);

  const fetchOfferedServices = async (loadedRange?: boolean) => {
    if (!loadedRange) {
      //Reset loaded range on filter
      setLoadRange(DEFAULT_LOAD_RANGE);
    }

    const fetchedServicesWithCount = await offeredServicesService
      .getAndFilterOfferedServices(
        filters || undefined,
        loadedRange ? loadRange : DEFAULT_LOAD_RANGE
      )
      .catch((err) => {
        console.log("Error: ", err);
      });

    if (fetchedServicesWithCount && loadedRange) {
      const fetchedServices = fetchedServicesWithCount.offeredServices;
      const count = fetchedServicesWithCount.count;
      setOfferedServices([...offeredServices, ...fetchedServices]);
      setOfferedServicesCount(count);
    } else if (fetchedServicesWithCount) {
      const fetchedServices = fetchedServicesWithCount.offeredServices;
      const count = fetchedServicesWithCount.count;
      setOfferedServices(fetchedServices);
      setOfferedServicesCount(count);
    }
  };

  const updateLoadRange = () => {
    if (
      !offeredServicesCount ||
      (offeredServices && offeredServices.length < offeredServicesCount)
    )
      setLoadRange({
        start: (loadRange.start || 0) + loadRange.range,
        range: loadRange.range,
      });
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
      {!offeredServicesCount ||
        (!isEmptyOfferedServices &&
          offeredServices.length < offeredServicesCount && (
            <Button
              text="View More"
              buttonTheme={ButtonTheme.GREY_SOLID}
              onClick={updateLoadRange}
            />
          ))}
    </ServicesContainer>
  );
}

import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { MinimalSpinner } from "components/loadingSpinner/minimal";
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
import { wait } from "utils/common";
import {
  setLoadRange,
  setOfferedServices,
  setOfferedServicesCount,
  setServicesLoading,
} from "./actions";
import { DEFAULT_LOAD_RANGE } from "./constants";
import {
  makeSelectFilters,
  makeSelectIsServicesLoading,
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
  makeSelectIsServicesLoading,
  (
    offeredServices,
    filters,
    loadRange,
    offeredServicesCount,
    isServicesLoading
  ) => ({
    offeredServices,
    filters,
    loadRange,
    offeredServicesCount,
    isServicesLoading,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setOfferedServices: (services: IOfferedService[]) =>
    dispatch(setOfferedServices(services)),
  setOfferedServicesCount: (count: number) =>
    dispatch(setOfferedServicesCount(count)),
  setLoadRange: (range: ILoadRangeOptions) => dispatch(setLoadRange(range)),
  setServicesLoading: (loading: boolean) =>
    dispatch(setServicesLoading(loading)),
});

export function Services(props: IServicesProps) {
  const {
    offeredServices,
    filters,
    loadRange,
    offeredServicesCount,
    isServicesLoading,
  } = useSelector(stateSelector);
  const {
    setOfferedServices,
    setLoadRange,
    setOfferedServicesCount,
    setServicesLoading,
  } = actionDispatch(useDispatch());

  const isEmptyOfferedServices =
    !offeredServices || (offeredServices && offeredServices.length === 0);

  const fetchOfferedServices = async (loadedRange?: boolean) => {
    if (!loadedRange) {
      //Reset loaded range on filter
      setLoadRange(DEFAULT_LOAD_RANGE);
    }

    setServicesLoading(true);

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

    setServicesLoading(false);
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
        {isServicesLoading && (
          <HorizontalWrapper centered>
            <MinimalSpinner />
          </HorizontalWrapper>
        )}
        {!isServicesLoading && isEmptyOfferedServices && (
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
          !isServicesLoading &&
          offeredServices.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
      </ServicesWrapper>
      <Marginer direction="vertical" margin="3em" />
      {!offeredServicesCount ||
        (!isEmptyOfferedServices &&
          !isServicesLoading &&
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

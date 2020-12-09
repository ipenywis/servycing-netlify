import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { MinimalSpinner } from "components/loadingSpinner/minimal";
import { ServiceCard } from "components/serviceCard";
import { BlackText } from "components/text";
import uniqBy from "lodash/uniqBy";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import offeredServicesService from "services/offeredServicesService";
import styled from "styles/styled-components";
import { IFinishedProject } from "types/finishedProject";
import { IOfferedService } from "types/offeredService";
import { ILoadRangeOptions } from "types/pagination";
import { setFinishedServices, setOfferedServices } from "./actionts";
import { DEFAULT_SERVICES_LOAD_RANGE } from "./constants";
import {
  makeSelectFinishedServices,
  makeSelectOfferedServices,
  makeSelectSpecialist,
} from "./selectors";

interface IOfferedServicesProps {}

const FinishedServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setOfferedServices: (services: IOfferedService[]) =>
    dispatch(setOfferedServices(services)),
});

const stateSelector = createSelector(
  makeSelectOfferedServices,
  makeSelectSpecialist,
  (offeredServices, specialist) => ({
    offeredServices,
    specialist,
  })
);

export function OfferedServices(props: IOfferedServicesProps) {
  const { offeredServices, specialist } = useSelector(stateSelector);
  const { setOfferedServices } = actionDispatch(useDispatch());
  const [isLoading, setLoading] = useState(false);
  const [servicesCount, setServicesCount] = useState(0);
  const [loadRange, setLoadRange] = useState<ILoadRangeOptions>(
    DEFAULT_SERVICES_LOAD_RANGE
  );

  const isEmptyOfferedServices =
    !offeredServices || (offeredServices && offeredServices.length === 0);

  if (!specialist) return null;

  const fetchOfferedServices = async (loadedByRange = false) => {
    setLoading(true);
    const offeredServicesWithCount = await offeredServicesService
      .getSpecialistOfferedServices(specialist.id, loadRange)
      .catch((err) => {
        console.log("Error: ", err);
      });

    if (offeredServicesWithCount && !loadedByRange) {
      setOfferedServices(offeredServicesWithCount.offeredServices);
      setServicesCount(offeredServicesWithCount.count);
    } else if (offeredServicesWithCount && loadedByRange) {
      setOfferedServices([
        ...offeredServices,
        ...offeredServicesWithCount.offeredServices,
      ]);
      setServicesCount(offeredServicesWithCount.count);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOfferedServices();
  }, []);

  useEffect(() => {
    fetchOfferedServices(true);
  }, [loadRange]);

  const onViewMore = () => {
    setLoadRange({
      start: (loadRange.start || 0) + loadRange.range,
      range: loadRange.range,
    });
  };

  return (
    <FinishedServicesContainer>
      <BlackText size={24} marginBottom={14} black>
        Offered Services
      </BlackText>
      <InnerContainer>
        {isLoading && (
          <HorizontalWrapper centered>
            {<MinimalSpinner size="md" />}
          </HorizontalWrapper>
        )}
        <ServicesContainer>
          {!isEmptyOfferedServices &&
            !isLoading &&
            offeredServices.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
        </ServicesContainer>
        {!isEmptyOfferedServices &&
          offeredServices.length >= DEFAULT_SERVICES_LOAD_RANGE.range &&
          offeredServices.length !== servicesCount && (
            <Button
              text="View More"
              onClick={onViewMore}
              buttonTheme={ButtonTheme.GREY_SOLID}
            />
          )}
      </InnerContainer>
    </FinishedServicesContainer>
  );
}

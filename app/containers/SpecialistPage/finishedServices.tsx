import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
import { ILoadRangeOptions } from "types/pagination";
import { setFinishedServices } from "./actionts";
import { DEFAULT_SERVICES_LOAD_RANGE } from "./constants";
import { makeSelectFinishedServices, makeSelectSpecialist } from "./selectors";

interface IFinishedServicesProps {}

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
  const [servicesCount, setServicesCount] = useState(0);
  const [loadRange, setLoadRange] = useState<ILoadRangeOptions>(
    DEFAULT_SERVICES_LOAD_RANGE
  );

  const isEmptyFinishedServices =
    !finishedServices || (finishedServices && finishedServices.length === 0);

  if (!specialist) return null;

  const fetchFinishedServices = async (loadedByRange = false) => {
    setLoading(true);
    const finishedServicesWithCount = await offeredServicesService
      .getSpecialistFinishedServicesById(specialist.id, loadRange)
      .catch((err) => {
        console.log("Error: ", err);
      });

    if (finishedServicesWithCount && !loadedByRange) {
      setFinishedServices(finishedServicesWithCount.finishedServices);
      setServicesCount(finishedServicesWithCount.count);
    } else if (finishedServicesWithCount && loadedByRange) {
      setFinishedServices([
        ...finishedServices,
        ...finishedServicesWithCount.finishedServices,
      ]);
      setServicesCount(finishedServicesWithCount.count);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchFinishedServices(true);
  }, [loadRange]);

  useEffect(() => {
    fetchFinishedServices();
  }, []);

  const onViewMore = () => {
    setLoadRange({
      start: (loadRange.start || 0) + loadRange.range,
      range: loadRange.range,
    });
  };

  //Make sure services are unique
  const uniqueServices = useMemo(() => {
    return uniqBy(finishedServices, "offeredService");
  }, [finishedServices]);

  return (
    <FinishedServicesContainer>
      <BlackText size={24} marginBottom={14} black>
        Finished Services
      </BlackText>
      <InnerContainer>
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
        {!isEmptyFinishedServices &&
          finishedServices.length >= DEFAULT_SERVICES_LOAD_RANGE.range &&
          finishedServices.length !== servicesCount && (
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

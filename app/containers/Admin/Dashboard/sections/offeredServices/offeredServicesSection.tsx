import {
  IconButton,
  Menu,
  Popover,
  Position,
  Spinner,
  Table,
} from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import offeredServicesService from "services/offeredServicesService";
import { IOfferedService } from "types/offeredService";
import {
  setActiveTab,
  setOfferedServices,
  setOfferedServicesCount,
  setToUpdateOfferedService,
} from "../../actions";
import {
  makeSelectOfferedServices,
  makeSelectOfferedServicesCount,
} from "../../selectors";
import {
  DASHBOARD_SECTION_TAB,
  DEFAULT_OFFERED_SERVICES_LOAD_RANGE,
} from "../../constants";
import styled from "styles/styled-components";
import { BlackText, MutedText, WarningText } from "components/text";
import { SectionContainer } from "../../common";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { MinimalSpinner } from "components/loadingSpinner/minimal";
import { wait } from "utils/common";
import { Pane } from "components/pane";
import { VerticalWrapper } from "components/verticalWrapper";
import { Marginer } from "components/marginer";
import { closePopupByClickOutside } from "types/common";
import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import { ILoadRangeOptions } from "types/pagination";

interface IOfferedServicesProps {}

const stateSelector = createSelector(
  makeSelectOfferedServices,
  makeSelectOfferedServicesCount,
  (offeredServices, offeredServicesCount) => ({
    offeredServices,
    offeredServicesCount,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setOfferedServices: (services: IOfferedService[]) =>
    dispatch(setOfferedServices(services)),
  setActiveTab: (tab: DASHBOARD_SECTION_TAB) => dispatch(setActiveTab(tab)),
  setToUpdateOfferedService: (service: IOfferedService) =>
    dispatch(setToUpdateOfferedService(service)),
  setOfferedServicesCount: (count: number) =>
    dispatch(setOfferedServicesCount(count)),
});

interface IMenuProps {
  offeredService: IOfferedService;
}

function RenderRowMenu(props: IMenuProps) {
  const { offeredService } = props;
  const { offeredServices } = useSelector(stateSelector);
  const {
    setActiveTab,
    setToUpdateOfferedService,
    setOfferedServices,
  } = actionDispatch(useDispatch());
  const [isDeleting, setDeleting] = useState(false);

  const goToUpdateSection = () => {
    setToUpdateOfferedService(offeredService);
    setActiveTab(DASHBOARD_SECTION_TAB.UPDATE_SERVICE);
  };

  const deleteServiceFromState = (id: string) => {
    const updatedServices = offeredServices.filter((service) => {
      return service.id !== id;
    });

    setOfferedServices(updatedServices);
  };

  const deleteService = async () => {
    setDeleting(true);
    const deleted = await offeredServicesService
      .deleteOfferedService(offeredService.id)
      .catch((err) => {
        console.log("Error: ", err);
      });

    if (deleted) deleteServiceFromState(offeredService.id);

    closePopupByClickOutside();

    setDeleting(false);
  };

  return (
    <Menu>
      <Menu.Group>
        <Menu.Item onSelect={goToUpdateSection}>Update</Menu.Item>
        <Menu.Divider />
      </Menu.Group>
      <Menu.Group>
        <Menu.Item intent="danger" onSelect={deleteService}>
          <HorizontalWrapper centerVertically>
            <VerticalWrapper centerVertically>
              Delete
              <MutedText size={12}>
                All associated requests will be deleted!
              </MutedText>
            </VerticalWrapper>
            <Marginer direction="horizontal" margin="10px" />
            {isDeleting && <Spinner size={14} />}
          </HorizontalWrapper>
        </Menu.Item>
      </Menu.Group>
    </Menu>
  );
}

export function OfferedServicesSection(props: IOfferedServicesProps) {
  const { offeredServices, offeredServicesCount } = useSelector(stateSelector);
  const { setOfferedServices, setOfferedServicesCount } = actionDispatch(
    useDispatch()
  );
  const [isLoading, setLoading] = useState(false);
  const [loadRange, setLoadRange] = useState<ILoadRangeOptions | null>(
    DEFAULT_OFFERED_SERVICES_LOAD_RANGE
  );

  const isEmptyOfferedServices =
    !offeredServices || (offeredServices && offeredServices.length === 0);

  const cantLoadMore =
    offeredServices && offeredServices.length === offeredServicesCount;

  const fetchedOfferedServices = async () => {
    setLoading(true);
    const offeredServicesWithCount = await offeredServicesService
      .getAndFilterOfferedServices(undefined, loadRange || undefined, true)
      .catch((err) => {
        console.log("Err: ", err);
      });

    if (offeredServicesWithCount) {
      setOfferedServices(offeredServicesWithCount.offeredServices);
      setOfferedServicesCount(offeredServicesWithCount.count);
    }

    setLoading(false);
  };

  const loadMore = () => {
    //Load 20 more
    setLoadRange({
      start: 0,
      range: loadRange
        ? loadRange.range + 20
        : DEFAULT_OFFERED_SERVICES_LOAD_RANGE.range,
    });
  };

  const loadAll = () => {
    //Load All services
    setLoadRange(null);
  };

  useEffect(() => {
    fetchedOfferedServices();
  }, [loadRange]);

  return (
    <SectionContainer>
      <BlackText size={19} bold>
        Services
      </BlackText>
      <MutedText size={12} marginBottom="1em">
        All of offered services by all specialist are here, you can view, update
        or delete.
      </MutedText>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell flexGrow={3}>Title</Table.TextHeaderCell>
          <Table.TextHeaderCell>Type</Table.TextHeaderCell>
          <Table.TextHeaderCell>Preferred Hours</Table.TextHeaderCell>
          <Table.TextHeaderCell>Rating</Table.TextHeaderCell>
          <Table.TextHeaderCell>Hourly Price</Table.TextHeaderCell>
          <Table.TextHeaderCell>More</Table.TextHeaderCell>
        </Table.Head>
        {(isLoading || isEmptyOfferedServices) && (
          <Pane alignCenter marginTop="5%">
            {isLoading && <MinimalSpinner />}
            {isEmptyOfferedServices && (
              <WarningText>There are no offered services yet!</WarningText>
            )}
          </Pane>
        )}
        <Table.Body>
          {!isLoading &&
            !isEmptyOfferedServices &&
            offeredServices.map((service, idx) => (
              <Table.Row key={idx}>
                <Table.TextCell flexGrow={3}>{service.title}</Table.TextCell>
                <Table.TextCell>{service.type}</Table.TextCell>
                <Table.TextCell>{service.preferredHours}</Table.TextCell>
                <Table.TextCell isNumber>{service.rating}</Table.TextCell>
                <Table.TextCell isNumber>${service.rate}</Table.TextCell>
                <Table.Cell>
                  <Popover
                    content={<RenderRowMenu offeredService={service} />}
                    position={Position.BOTTOM_RIGHT}
                  >
                    <IconButton icon="more" appearance="minimal" height={24} />
                  </Popover>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Marginer direction="vertical" margin="2em" />
      {!isEmptyOfferedServices && (
        <HorizontalWrapper centered>
          <Button
            text="Load More"
            size={12}
            buttonTheme={ButtonTheme.GREY_SOLID}
            onClick={loadMore}
            disabled={cantLoadMore}
          />
          <Button
            text="Load All"
            size={12}
            buttonTheme={ButtonTheme.GREY_SOLID}
            onClick={loadAll}
            disabled={cantLoadMore}
          />
        </HorizontalWrapper>
      )}
    </SectionContainer>
  );
}

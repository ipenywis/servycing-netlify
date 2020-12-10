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
  setToUpdateOfferedService,
} from "../actions";
import { makeSelectOfferedServices } from "../selectors";
import {
  DASHBOARD_SECTION_TAB,
  DEFAULT_OFFERED_SERVICES_LOAD_RANGE,
} from "../constants";
import styled from "styles/styled-components";
import { BlackText, MutedText, WarningText } from "components/text";
import { SectionContainer } from "../common";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { MinimalSpinner } from "components/loadingSpinner/minimal";
import { wait } from "utils/common";
import { Pane } from "components/pane";
import { VerticalWrapper } from "components/verticalWrapper";
import { Marginer } from "components/marginer";
import { closePopupByClickOutside } from "types/common";
import { usePagination } from "components/usePagination";
import { Pagination } from "components/pagination";

interface IOfferedServicesProps {}

const stateSelector = createSelector(
  makeSelectOfferedServices,
  (offeredServices) => ({
    offeredServices,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setOfferedServices: (services: IOfferedService[]) =>
    dispatch(setOfferedServices(services)),
  setActiveTab: (tab: DASHBOARD_SECTION_TAB) => dispatch(setActiveTab(tab)),
  setToUpdateOfferedService: (service: IOfferedService) =>
    dispatch(setToUpdateOfferedService(service)),
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
  const { offeredServices } = useSelector(stateSelector);
  const { setOfferedServices } = actionDispatch(useDispatch());
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const [loadRange, showPagination, pageCount, page, setPage] = usePagination(
    0,
    count,
    DEFAULT_OFFERED_SERVICES_LOAD_RANGE
  );

  const isEmptyOfferedServices =
    !offeredServices || (offeredServices && offeredServices.length === 0);

  const fetchedOfferedServices = async () => {
    setLoading(true);
    const offeredServicesWithCount = await offeredServicesService
      .getSpecialistMyOfferedServices(loadRange)
      .catch((err) => {
        console.log("Err: ", err);
      });

    if (offeredServicesWithCount) {
      setCount(offeredServicesWithCount.count);
      setOfferedServices(offeredServicesWithCount.offeredServices);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchedOfferedServices();
  }, []);

  useEffect(() => {
    fetchedOfferedServices();
  }, [page]);

  return (
    <SectionContainer>
      <BlackText size={19} bold>
        Your Services
      </BlackText>
      <MutedText size={12} marginBottom="1em">
        All of your offered services are here, view, update or delete.
      </MutedText>
      <Table minHeight="16em">
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
              <WarningText>You haven't offered any services yet</WarningText>
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
                <Table.TextCell isNumber>5.0</Table.TextCell>
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
      <HorizontalWrapper centered>
        {!isLoading && showPagination && (
          <Pagination
            pageCount={Math.ceil(pageCount)}
            pageRangeDisplayed={0}
            marginPagesDisplayed={2}
            forcePage={page}
            onPageChange={(page) => setPage(page.selected)}
          />
        )}
      </HorizontalWrapper>
    </SectionContainer>
  );
}

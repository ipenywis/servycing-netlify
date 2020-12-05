import { IconButton, Menu, Popover, Position, Table } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import offeredServicesService from "services/offeredServicesService";
import { IOfferedService } from "types/offeredService";
import { setOfferedServices } from "../actions";
import { makeSelectOfferedServices } from "../selectors";
import { DEFAULT_OFFERED_SERVICES_LOAD_RANGE } from "../constants";
import styled from "styles/styled-components";
import { BlackText, MutedText } from "components/text";
import { SectionContainer } from "../common";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { MinimalSpinner } from "components/loadingSpinner/minimal";
import { wait } from "utils/common";
import { Pane } from "components/pane";

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
});

function RenderRowMenu() {
  return (
    <Menu>
      <Menu.Group>
        <Menu.Item>Update</Menu.Item>
        <Menu.Divider />
      </Menu.Group>
      <Menu.Group>
        <Menu.Item intent="danger">Delete</Menu.Item>
      </Menu.Group>
    </Menu>
  );
}

export function OfferedServicesSection(props: IOfferedServicesProps) {
  const { offeredServices } = useSelector(stateSelector);
  const { setOfferedServices } = actionDispatch(useDispatch());
  const [isLoading, setLoading] = useState(false);

  const isEmptyOfferedServices =
    !offeredServices || (offeredServices && offeredServices.length === 0);

  const fetchedOfferedServices = async () => {
    setLoading(true);
    const servicesWithCount = await offeredServicesService
      .getAndFilterOfferedServices(
        undefined,
        DEFAULT_OFFERED_SERVICES_LOAD_RANGE
      )
      .catch((err) => {
        console.log("Err: ", err);
      });

    if (servicesWithCount && servicesWithCount.offeredServices)
      setOfferedServices(servicesWithCount.offeredServices);

    setLoading(false);
  };

  useEffect(() => {
    fetchedOfferedServices();
  }, []);

  return (
    <SectionContainer>
      <BlackText size={19} bold>
        Your Services
      </BlackText>
      <MutedText size={12} marginBottom="1em">
        All of your offered services are here, view, update or delete.
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
        {isLoading && (
          <Pane alignCenter marginTop="5%">
            <MinimalSpinner />
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
                    content={RenderRowMenu}
                    position={Position.BOTTOM_RIGHT}
                  >
                    <IconButton icon="more" appearance="minimal" height={24} />
                  </Popover>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </SectionContainer>
  );
}

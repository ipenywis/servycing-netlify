import { IconButton, Menu, Popover, Position, Table } from "evergreen-ui";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import offeredServicesService from "services/offeredServicesService";
import { IOfferedService } from "types/offeredService";
import { setOfferedServices } from "./actions";
import { makeSelectOfferedServices } from "./selectors";
import { DEFAULT_OFFERED_SERVICES_LOAD_RANGE } from "./constants";
import styled from "styles/styled-components";
import { BlackText } from "components/text";

interface IOfferedServicesProps {}

const OfferedServicesSectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

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

export function OfferedServices(props: IOfferedServicesProps) {
  const { offeredServices } = useSelector(stateSelector);
  const { setOfferedServices } = actionDispatch(useDispatch());

  const isEmptyOfferedServices =
    !offeredServices || (offeredServices && offeredServices.length === 0);

  const fetchedOfferedServices = async () => {
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
  };

  useEffect(() => {
    fetchedOfferedServices();
  }, []);

  return (
    <OfferedServicesSectionContainer>
      <BlackText size={21} bold marginBottom="1em">
        Your Services
      </BlackText>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell flexGrow={3}>Title</Table.TextHeaderCell>
          <Table.TextHeaderCell>Type</Table.TextHeaderCell>
          <Table.TextHeaderCell>Preferred Hours</Table.TextHeaderCell>
          <Table.TextHeaderCell>Rating</Table.TextHeaderCell>
          <Table.TextHeaderCell>Hourly Price</Table.TextHeaderCell>
          <Table.TextHeaderCell>More</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {!isEmptyOfferedServices &&
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
                    <IconButton icon="more" appearance="minimal" />
                  </Popover>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </OfferedServicesSectionContainer>
  );
}

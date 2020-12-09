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
import { setActiveTab, setCustomers, setToUpdateCustomer } from "../../actions";
import { makeSelectCustomers } from "../../selectors";
import {
  DASHBOARD_SECTION_TAB,
  DEFAULT_OFFERED_SERVICES_LOAD_RANGE,
} from "../../constants";
import { BlackText, MutedText, WarningText } from "components/text";
import { SectionContainer } from "../../common";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { MinimalSpinner } from "components/loadingSpinner/minimal";
import { Pane } from "components/pane";
import { VerticalWrapper } from "components/verticalWrapper";
import { Marginer } from "components/marginer";
import { closePopupByClickOutside } from "types/common";
import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import { ILoadRangeOptions } from "types/pagination";
import { ICustomer } from "types/customer";
import customerService from "services/customerService";
import { Avatar } from "components/avatar";

interface ICustomersSectionProps {}

const stateSelector = createSelector(makeSelectCustomers, (customers) => ({
  customers,
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setCustomers: (customers: ICustomer[]) => dispatch(setCustomers(customers)),
  setToUpdateCustomer: (customer: ICustomer | null) =>
    dispatch(setToUpdateCustomer(customer)),
  setActiveTab: (tab: DASHBOARD_SECTION_TAB) => dispatch(setActiveTab(tab)),
});

interface IMenuProps {
  customer: ICustomer;
}

function RenderRowMenu(props: IMenuProps) {
  const { customer } = props;
  const { customers } = useSelector(stateSelector);
  const { setActiveTab, setCustomers, setToUpdateCustomer } = actionDispatch(
    useDispatch()
  );
  const [isDeleting, setDeleting] = useState(false);

  const goToUpdateSection = () => {
    setToUpdateCustomer(customer);
    setActiveTab(DASHBOARD_SECTION_TAB.UPDATE_CUSTOMER);
  };

  const deleteCustomerFromState = (id: string) => {
    const updatedCustomers = customers.filter((service) => {
      return service.id !== id;
    });

    setCustomers(updatedCustomers);
  };

  const deleteSpecialist = async () => {
    setDeleting(true);
    const deleted = await customerService.delete(customer.id).catch((err) => {
      console.log("Error: ", err);
    });

    if (deleted) deleteCustomerFromState(customer.id);

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
        <Menu.Item intent="danger" onSelect={deleteSpecialist}>
          <HorizontalWrapper centerVertically>
            <VerticalWrapper centerVertically>
              Delete
              <MutedText size={12}>
                All associated data will be deleted!
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

export function CustomersSection(props: ICustomersSectionProps) {
  const { customers } = useSelector(stateSelector);
  const { setCustomers, setActiveTab } = actionDispatch(useDispatch());
  const [isLoading, setLoading] = useState(false);
  const [loadRange, setLoadRange] = useState<ILoadRangeOptions | null>(
    DEFAULT_OFFERED_SERVICES_LOAD_RANGE
  );

  const isEmptyCustomers = !customers || (customers && customers.length === 0);

  const fetchCustomers = async () => {
    setLoading(true);
    const customers = await customerService.getCustomers().catch((err) => {
      console.log("Err: ", err);
    });

    if (customers) {
      setCustomers(customers);
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
    fetchCustomers();
  }, []);

  return (
    <SectionContainer>
      <BlackText size={19} bold>
        Customers
      </BlackText>
      <MutedText size={12} marginBottom="1em">
        View and Manage All registered customers.
      </MutedText>
      <Button
        size={14}
        text="Add New Customer"
        buttonTheme={ButtonTheme.FULL_MINIMAL_BLUE}
        onClick={() => setActiveTab(DASHBOARD_SECTION_TAB.ADD_NEW_CUSTOMER)}
      />
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Avatar</Table.TextHeaderCell>
          <Table.TextHeaderCell>Id</Table.TextHeaderCell>
          <Table.TextHeaderCell>Full Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Email</Table.TextHeaderCell>
          <Table.TextHeaderCell>More</Table.TextHeaderCell>
        </Table.Head>
        {(isLoading || isEmptyCustomers) && (
          <Pane alignCenter marginTop="5%">
            {isLoading && !isEmptyCustomers && <MinimalSpinner />}
            {isEmptyCustomers && !isLoading && (
              <WarningText>No customers are registered yet!</WarningText>
            )}
          </Pane>
        )}
        <Table.Body>
          {!isLoading &&
            !isEmptyCustomers &&
            customers.map((customer, idx) => (
              <Table.Row key={idx}>
                <Table.Cell>
                  <Avatar name={customer.fullName} size={29} />
                </Table.Cell>
                <Table.TextCell>{customer.id}</Table.TextCell>
                <Table.TextCell>{customer.fullName}</Table.TextCell>
                <Table.TextCell>{customer.email}</Table.TextCell>
                <Table.Cell>
                  <Popover
                    content={<RenderRowMenu customer={customer} />}
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
      {/* <HorizontalWrapper centered>
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
      </HorizontalWrapper> */}
    </SectionContainer>
  );
}

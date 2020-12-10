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
import { IOfferedService, OFFERED_SERVICE_STATUS } from "types/offeredService";
import { setOfferedServices, setPendingServiceRequests } from "../actions";
import {
  makeSelectOfferedServices,
  makeSelectPendingServiceRequests,
} from "../selectors";
import {
  DEFAULT_OFFERED_SERVICES_LOAD_RANGE,
  DEFAULT_PENDING_REQUESTS_LOAD_RANGE,
} from "../constants";
import styled from "styles/styled-components";
import {
  BlackText,
  ErrorText,
  GreyText,
  InfoText,
  MutedText,
  SuccessText,
  WarningText,
} from "components/text";
import { SectionContainer } from "../common";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { MinimalSpinner } from "components/loadingSpinner/minimal";
import { wait } from "utils/common";
import { Pane } from "components/pane";
import { IPendingServiceRequest } from "types/pendingServiceRequest";
import { Marginer } from "components/marginer";
import { usePagination } from "components/usePagination";
import { Pagination } from "components/pagination";

interface IPendingRequestsSectionProps {}

const stateSelector = createSelector(
  makeSelectPendingServiceRequests,
  (pendingRequests) => ({
    pendingRequests,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setPendingRequests: (requests: IPendingServiceRequest[]) =>
    dispatch(setPendingServiceRequests(requests)),
});

interface IMenuProps {
  request: IPendingServiceRequest;
}

function RenderRowMenu(props: IMenuProps) {
  const { request } = props;
  const { pendingRequests } = useSelector(stateSelector);
  const { setPendingRequests } = actionDispatch(useDispatch());
  const [isAcceptLoading, setAcceptLoading] = useState(false);
  const [isRejectLoading, setRejectLoading] = useState(false);

  const updatePendingRequest = (
    id: string,
    newRequestData: IPendingServiceRequest
  ) => {
    const updatedRequests = pendingRequests.map((request) => {
      if (request.id === id) return { ...newRequestData };
      else return request;
    });

    setPendingRequests(updatedRequests);
  };

  const acceptPendingRequest = async () => {
    setAcceptLoading(true);
    const acceptedPendingRequest = await offeredServicesService
      .specialistAcceptPendingRequest(request.id)
      .catch((err) => {
        console.log("Error accepting: ", err);
      });

    if (acceptedPendingRequest)
      updatePendingRequest(request.id, acceptedPendingRequest);

    setAcceptLoading(false);
  };

  const rejectPendingRequest = async () => {
    setRejectLoading(true);
    const rejectedPendingRequest = await offeredServicesService
      .specialistRejectPendingRequest(request.id)
      .catch((err) => {
        console.log("Error rejecting: ", err);
      });

    if (rejectedPendingRequest)
      updatePendingRequest(request.id, rejectedPendingRequest);
    setRejectLoading(false);
  };

  return (
    <Menu>
      <Menu.Group>
        <Menu.Item intent="success" onSelect={acceptPendingRequest}>
          <HorizontalWrapper centerVertically>
            Accept
            <Marginer direction="horizontal" margin="10px" />
            {isAcceptLoading && <Spinner size={14} />}
          </HorizontalWrapper>
        </Menu.Item>
        <Menu.Item intent="danger" onSelect={rejectPendingRequest}>
          <HorizontalWrapper centerVertically>
            Reject
            <Marginer direction="horizontal" margin="10px" />
            {isRejectLoading && <Spinner size={14} />}
          </HorizontalWrapper>
        </Menu.Item>
      </Menu.Group>
    </Menu>
  );
}

export function PendingRequestsSection(props: IPendingRequestsSectionProps) {
  const { pendingRequests } = useSelector(stateSelector);
  const { setPendingRequests } = actionDispatch(useDispatch());
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const [loadRange, showPagination, pageCount, page, setPage] = usePagination(
    0,
    count,
    DEFAULT_PENDING_REQUESTS_LOAD_RANGE
  );

  const isEmptyPendingRequests =
    !pendingRequests || (pendingRequests && pendingRequests.length === 0);

  const fetchedPendingRequests = async () => {
    setLoading(true);
    const pendingRequestsWithCount = await offeredServicesService
      .getSpecialistPendingServiceRequests(loadRange)
      .catch((err) => {
        console.log("Err: ", err);
      });

    if (pendingRequestsWithCount) {
      setCount(pendingRequestsWithCount.count);
      setPendingRequests(pendingRequestsWithCount.pendingServicesRequests);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchedPendingRequests();
  }, []);

  useEffect(() => {
    fetchedPendingRequests();
  }, [page]);

  return (
    <SectionContainer>
      <BlackText size={19} bold>
        Pending Services Requests
      </BlackText>
      <MutedText size={12} marginBottom="1em">
        View and Manage all requests coming from customers for your offered
        services.
      </MutedText>
      <Table minHeight="16em">
        <Table.Head>
          <Table.TextHeaderCell flexGrow={1}>Id</Table.TextHeaderCell>
          <Table.TextHeaderCell>Service</Table.TextHeaderCell>
          <Table.TextHeaderCell>Customer</Table.TextHeaderCell>
          <Table.TextHeaderCell>Status</Table.TextHeaderCell>
          <Table.TextHeaderCell>More</Table.TextHeaderCell>
        </Table.Head>
        {(isLoading || isEmptyPendingRequests) && (
          <Pane alignCenter marginTop="5%">
            {!isEmptyPendingRequests && isLoading && <MinimalSpinner />}
            {!isLoading && isEmptyPendingRequests && (
              <WarningText size={14}>
                You have no Pending service's requests
              </WarningText>
            )}
          </Pane>
        )}
        <Table.Body>
          {!isLoading &&
            !isEmptyPendingRequests &&
            pendingRequests.map((request, idx) => {
              const isPending =
                request.status === OFFERED_SERVICE_STATUS.PENDING;
              const isWorkingOn =
                request.status === OFFERED_SERVICE_STATUS.WORKING_ON;
              const isRejected =
                request.status === OFFERED_SERVICE_STATUS.REJECTED;

              return (
                <Table.Row key={idx}>
                  <Table.TextCell flexGrow={1}>{request.id}</Table.TextCell>
                  <Table.TextCell>
                    {request.offeredService.title}
                  </Table.TextCell>
                  <Table.TextCell>{request.customer.fullName}</Table.TextCell>
                  <Table.Cell>
                    {isPending && <InfoText size={14}>Pending</InfoText>}
                    {isWorkingOn && (
                      <SuccessText size={14}>Working on</SuccessText>
                    )}
                    {isRejected && <ErrorText size={14}>Rejected</ErrorText>}
                  </Table.Cell>
                  <Table.Cell>
                    {isPending && (
                      <Popover
                        content={<RenderRowMenu request={request} />}
                        position={Position.BOTTOM_RIGHT}
                      >
                        <IconButton
                          icon="more"
                          appearance="minimal"
                          height={24}
                        />
                      </Popover>
                    )}
                    {!isPending && (
                      <GreyText size={12}>Already took action</GreyText>
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
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

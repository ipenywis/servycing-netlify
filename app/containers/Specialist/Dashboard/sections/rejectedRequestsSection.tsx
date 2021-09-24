import { IconButton, Menu, Popover, Position, Table } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import offeredServicesService from "services/offeredServicesService";
import { IOfferedService, OFFERED_SERVICE_STATUS } from "types/offeredService";
import {
  setOfferedServices,
  setPendingServiceRequests,
  setRejectedServiceRequests,
} from "../actions";
import {
  makeSelectOfferedServices,
  makeSelectPendingServiceRequests,
  makeSelectRejectedServiceRequests,
} from "../selectors";
import {
  DEFAULT_OFFERED_SERVICES_LOAD_RANGE,
  DEFAULT_REJECTED_REQUESTS_LOAD_RANGE,
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
import { usePagination } from "components/usePagination";
import { Pagination } from "components/pagination";

interface IRejectedRequestsSectionProps {}

const stateSelector = createSelector(
  makeSelectRejectedServiceRequests,
  (rejectedRequests) => ({
    rejectedRequests,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setRejectedRequests: (requests: IPendingServiceRequest[]) =>
    dispatch(setRejectedServiceRequests(requests)),
});

interface IMenuProps {
  request: IPendingServiceRequest;
}

export function RejectedRequestsSection(props: IRejectedRequestsSectionProps) {
  const { rejectedRequests } = useSelector(stateSelector);
  const { setRejectedRequests } = actionDispatch(useDispatch());
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const [loadRange, showPagination, pageCount, page, setPage] = usePagination(
    0,
    count,
    DEFAULT_REJECTED_REQUESTS_LOAD_RANGE
  );

  const isEmptyRejectedRequests =
    !rejectedRequests || (rejectedRequests && rejectedRequests.length === 0);

  const fetchedPendingRequests = async () => {
    setLoading(true);
    const rejectedRequestsWithCount = await offeredServicesService
      .getSpecialistRejectedServiceRequests(loadRange)
      .catch((err) => {
        console.log("Err: ", err);
      });

    if (rejectedRequestsWithCount) {
      setCount(rejectedRequestsWithCount.count);
      setRejectedRequests(rejectedRequestsWithCount.pendingServicesRequests);
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
        Rejected Services Requests
      </BlackText>
      <MutedText size={12} marginBottom="1em">
        View all your rejected requests coming from customers for your offered
        services.
      </MutedText>
      <Table minHeight="16em">
        <Table.Head>
          <Table.TextHeaderCell flexGrow={1}>Id</Table.TextHeaderCell>
          <Table.TextHeaderCell>Service</Table.TextHeaderCell>
          <Table.TextHeaderCell>Customer</Table.TextHeaderCell>
          <Table.TextHeaderCell>Status</Table.TextHeaderCell>
        </Table.Head>
        {(isLoading || isEmptyRejectedRequests) && (
          <Pane alignCenter marginTop="5%">
            {!isEmptyRejectedRequests && isLoading && <MinimalSpinner />}
            {!isLoading && isEmptyRejectedRequests && (
              <WarningText size={14}>
                You have no Rejected service's requests
              </WarningText>
            )}
          </Pane>
        )}
        <Table.Body>
          {!isLoading &&
            !isEmptyRejectedRequests &&
            rejectedRequests.map((request, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.TextCell flexGrow={1}>{request.id}</Table.TextCell>
                  <Table.TextCell>
                    {request.offeredService.title}
                  </Table.TextCell>
                  <Table.TextCell>{request.customer.fullName}</Table.TextCell>
                  <Table.Cell>
                    <ErrorText size={14}>Rejected</ErrorText>
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

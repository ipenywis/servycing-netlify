import { MinimalSpinner } from "components/loadingSpinner/minimal";
import { Pane } from "components/pane";
import {
  BlackText,
  ErrorText,
  InfoText,
  MutedText,
  SuccessText,
  WarningText,
} from "components/text";
import { Table } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import offeredServicesService from "services/offeredServicesService";
import { OFFERED_SERVICE_STATUS } from "types/offeredService";
import { IPendingServiceRequest } from "types/pendingServiceRequest";

import { setPendingServiceRequests } from "../actions";
import { SectionContainer } from "../common";
import { makeSelectPendingServiceRequests } from "../selectors";

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

export function PendingRequestsSection(props: IPendingRequestsSectionProps) {
  const { pendingRequests } = useSelector(stateSelector);
  const { setPendingRequests } = actionDispatch(useDispatch());
  const [isLoading, setLoading] = useState(false);

  const isEmptyPendingRequests =
    !pendingRequests || (pendingRequests && pendingRequests.length === 0);

  const fetchedPendingRequests = async () => {
    setLoading(true);
    const pendingRequests = await offeredServicesService
      .getCustomerAllPendingServicesRequests()
      .catch((err) => {
        console.log("Err: ", err);
      });

    if (pendingRequests) setPendingRequests(pendingRequests);

    setLoading(false);
  };

  useEffect(() => {
    fetchedPendingRequests();
  }, []);

  return (
    <SectionContainer>
      <BlackText size={19} bold>
        Your Services Requests
      </BlackText>
      <MutedText size={12} marginBottom="1em">
        View and Manage all requests coming from customers for your offered
        services.
      </MutedText>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Id</Table.TextHeaderCell>
          <Table.TextHeaderCell>Service</Table.TextHeaderCell>
          <Table.TextHeaderCell>Specialist</Table.TextHeaderCell>
          <Table.TextHeaderCell>Status</Table.TextHeaderCell>
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
                  <Table.TextCell>{request.id}</Table.TextCell>
                  <Table.TextCell>
                    {request.offeredService.title}
                  </Table.TextCell>
                  <Table.TextCell>
                    {request.offeredService.specialist.fullName}
                  </Table.TextCell>
                  <Table.Cell>
                    {isPending && <InfoText size={14}>Pending</InfoText>}
                    {isWorkingOn && (
                      <SuccessText size={14}>Working on</SuccessText>
                    )}
                    {isRejected && <ErrorText size={14}>Rejected</ErrorText>}
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </SectionContainer>
  );
}

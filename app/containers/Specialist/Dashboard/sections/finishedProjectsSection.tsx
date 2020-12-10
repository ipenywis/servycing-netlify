import { IconButton, Menu, Popover, Position, Table } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import offeredServicesService from "services/offeredServicesService";
import { IOfferedService, OFFERED_SERVICE_STATUS } from "types/offeredService";
import {
  setFinishedProjects,
  setOfferedServices,
  setPendingServiceRequests,
  setRejectedServiceRequests,
} from "../actions";
import {
  makeSelectFinishedProjects,
  makeSelectOfferedServices,
  makeSelectPendingServiceRequests,
  makeSelectRejectedServiceRequests,
} from "../selectors";
import {
  DEFAULT_FINISHED_SERVICES_LOAD_RANGE,
  DEFAULT_OFFERED_SERVICES_LOAD_RANGE,
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
import {
  FINISHED_PROJECT_STATUS,
  IFinishedProject,
} from "types/finishedProject";
import { finished } from "stream";
import { usePagination } from "components/usePagination";
import { Pagination } from "components/pagination";

interface IFinishedProjectsSectionProps {}

const stateSelector = createSelector(
  makeSelectFinishedProjects,
  (finishedProjects) => ({
    finishedProjects,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setFinishedProjects: (requests: IFinishedProject[]) =>
    dispatch(setFinishedProjects(requests)),
});

interface IMenuProps {
  request: IPendingServiceRequest;
}

export function FinishedProjectsSection(props: IFinishedProjectsSectionProps) {
  const { finishedProjects } = useSelector(stateSelector);
  const { setFinishedProjects } = actionDispatch(useDispatch());
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const [loadRange, showPagination, pageCount, page, setPage] = usePagination(
    0,
    count,
    DEFAULT_FINISHED_SERVICES_LOAD_RANGE
  );

  const isEmptyFinishedProjects =
    !finishedProjects || (finishedProjects && finishedProjects.length === 0);

  const fetchedFinishedProjects = async () => {
    setLoading(true);
    const finishedProjectsWithCount = await offeredServicesService
      .getSpecialistAllFinishedProjects(loadRange)
      .catch((err) => {
        console.log("Err: ", err);
      });

    if (finishedProjectsWithCount) {
      setCount(finishedProjectsWithCount.count);
      setFinishedProjects(finishedProjectsWithCount.finishedServices);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchedFinishedProjects();
  }, []);

  useEffect(() => {
    fetchedFinishedProjects();
  }, [page]);

  return (
    <SectionContainer>
      <BlackText size={19} bold>
        Finished Services Projects
      </BlackText>
      <MutedText size={12} marginBottom="1em">
        View all your finished services projects for customer.
      </MutedText>
      <Table minHeight="16em">
        <Table.Head>
          <Table.TextHeaderCell flexGrow={1}>Id</Table.TextHeaderCell>
          <Table.TextHeaderCell>Service</Table.TextHeaderCell>
          <Table.TextHeaderCell>Customer</Table.TextHeaderCell>
          <Table.TextHeaderCell>Status</Table.TextHeaderCell>
        </Table.Head>
        {(isLoading || isEmptyFinishedProjects) && (
          <Pane alignCenter marginTop="5%">
            {isLoading && <MinimalSpinner />}
            {!isLoading && isEmptyFinishedProjects && (
              <WarningText size={14}>
                You have no Finished Projects yet!
              </WarningText>
            )}
          </Pane>
        )}
        <Table.Body>
          {!isLoading &&
            !isEmptyFinishedProjects &&
            finishedProjects.map((project, idx) => {
              const isPending =
                project.status === FINISHED_PROJECT_STATUS.PENDING;
              const isAccepted =
                project.status === FINISHED_PROJECT_STATUS.ACCEPTED;
              const isRejected =
                project.status === FINISHED_PROJECT_STATUS.REJECTED;

              return (
                <Table.Row key={idx}>
                  <Table.TextCell flexGrow={1}>{project.id}</Table.TextCell>
                  <Table.TextCell>
                    {project.offeredService.title}
                  </Table.TextCell>
                  <Table.TextCell>{project.customer.fullName}</Table.TextCell>
                  <Table.Cell>
                    {isPending && <InfoText size={14}>Pending</InfoText>}
                    {isAccepted && (
                      <SuccessText size={14}>Accepted</SuccessText>
                    )}
                    {isRejected && <ErrorText size={14}>Rejected</ErrorText>}
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

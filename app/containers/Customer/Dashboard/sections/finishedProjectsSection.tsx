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
} from "../actions";
import {
  makeSelectFinishedProjects,
  makeSelectOfferedServices,
  makeSelectPendingServiceRequests,
} from "../selectors";
import { DEFAULT_OFFERED_SERVICES_LOAD_RANGE } from "../constants";
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

interface IFinishedProjectsSectionProps {}

const stateSelector = createSelector(
  makeSelectFinishedProjects,
  (finishedProjects) => ({
    finishedProjects,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setFinishedProjects: (projects: IFinishedProject[]) =>
    dispatch(setFinishedProjects(projects)),
});

interface IMenuProps {
  project: IFinishedProject;
}

function RenderRowMenu(props: IMenuProps) {
  const { project } = props;
  const { finishedProjects } = useSelector(stateSelector);
  const { setFinishedProjects } = actionDispatch(useDispatch());

  const updatePendingRequest = (
    id: string,
    newProjectData: IFinishedProject
  ) => {
    const updatedProjects = finishedProjects.map((project) => {
      if (project.id === id) return { ...newProjectData };
      else return project;
    });

    setFinishedProjects(updatedProjects);
  };

  const acceptPendingRequest = async () => {
    const acceptedPendingRequest = await offeredServicesService
      .specialistAcceptPendingRequest(request.id)
      .catch((err) => {
        console.log("Error accepting: ", err);
      });

    if (acceptedPendingRequest)
      updatePendingRequest(request.id, acceptedPendingRequest);
  };

  const rejectPendingRequest = async () => {
    const rejectedPendingRequest = await offeredServicesService
      .specialistRejectPendingRequest(request.id)
      .catch((err) => {
        console.log("Error rejecting: ", err);
      });

    if (rejectedPendingRequest)
      updatePendingRequest(request.id, rejectedPendingRequest);
  };

  return (
    <Menu>
      <Menu.Group>
        <Menu.Item intent="success" onSelect={acceptPendingRequest}>
          Accept
        </Menu.Item>
        <Menu.Item intent="danger" onSelect={rejectPendingRequest}>
          Reject
        </Menu.Item>
      </Menu.Group>
    </Menu>
  );
}

export function FinishedProjectsSection(props: IFinishedProjectsSectionProps) {
  const { finishedProjects } = useSelector(stateSelector);
  const { setFinishedProjects } = actionDispatch(useDispatch());
  const [isLoading, setLoading] = useState(false);

  const isEmptyFinishedProjects =
    !finishedProjects || (finishedProjects && finishedProjects.length === 0);

  const fetchFinishedProjects = async () => {
    setLoading(true);
    const finishedProjects = await offeredServicesService
      .getSpecialistPendingServiceRequests()
      .catch((err) => {
        console.log("Err: ", err);
      });

    if (finishedProjects) setFinishedProjects(finishedProjects);

    setLoading(false);
  };

  useEffect(() => {
    fetchFinishedProjects();
  }, []);

  return (
    <SectionContainer>
      <BlackText size={19} bold>
        Pending Services Requests
      </BlackText>
      <MutedText size={12} marginBottom="1em">
        View and Manage all requests coming from customers for your offered
        services.
      </MutedText>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell flexGrow={1}>Id</Table.TextHeaderCell>
          <Table.TextHeaderCell>Service</Table.TextHeaderCell>
          <Table.TextHeaderCell>Customer</Table.TextHeaderCell>
          <Table.TextHeaderCell>Status</Table.TextHeaderCell>
          <Table.TextHeaderCell>More</Table.TextHeaderCell>
        </Table.Head>
        {(isLoading || isEmptyFinishedProjects) && (
          <Pane alignCenter marginTop="5%">
            {!isEmptyFinishedProjects && isLoading && <MinimalSpinner />}
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
                  <Table.Cell>
                    {isPending && (
                      <Popover
                        content={<RenderRowMenu project={project} />}
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
    </SectionContainer>
  );
}

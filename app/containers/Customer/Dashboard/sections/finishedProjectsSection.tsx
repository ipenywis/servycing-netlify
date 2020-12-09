import { IconButton, Menu, Popover, Position, Table } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import offeredServicesService from "services/offeredServicesService";
import {
  setActiveTab,
  setFinishedProjects,
  setToReviewService,
} from "../actions";
import { makeSelectFinishedProjects } from "../selectors";
import { DASHBOARD_SECTION_TAB } from "../constants";
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
  setActiveTab: (tab: DASHBOARD_SECTION_TAB) => dispatch(setActiveTab(tab)),
  setToReviewService: (service: IFinishedProject) =>
    dispatch(setToReviewService(service)),
});

interface IMenuProps {
  project: IFinishedProject;
}

function RenderActionMenu(props: IMenuProps) {
  const { project } = props;
  const { finishedProjects } = useSelector(stateSelector);
  const { setFinishedProjects } = actionDispatch(useDispatch());

  const updateFinishedProject = (
    id: string,
    newProjectData: IFinishedProject
  ) => {
    const updatedProjects = finishedProjects.map((project) => {
      if (project.id === id) return { ...newProjectData };
      else return project;
    });

    setFinishedProjects(updatedProjects);
  };

  const acceptFinishedProject = async () => {
    const acceptedFinishedProject = await offeredServicesService
      .customerAcceptFinishedService(project.id)
      .catch((err) => {
        console.log("Error accepting: ", err);
      });

    if (acceptedFinishedProject)
      updateFinishedProject(project.id, acceptedFinishedProject);
  };

  const rejectFinishedProject = async () => {
    const rejectedFinishedProject = await offeredServicesService
      .customerRejectFinishedService(project.id)
      .catch((err) => {
        console.log("Error rejecting: ", err);
      });

    if (rejectedFinishedProject)
      updateFinishedProject(project.id, rejectedFinishedProject);
  };

  return (
    <Menu>
      <Menu.Group>
        <Menu.Item intent="success" onSelect={acceptFinishedProject}>
          Accept
        </Menu.Item>
        <Menu.Item intent="danger" onSelect={rejectFinishedProject}>
          Reject
        </Menu.Item>
      </Menu.Group>
    </Menu>
  );
}

function RenderReviewMenu(props: IMenuProps) {
  const { project } = props;
  const { setActiveTab, setToReviewService } = actionDispatch(useDispatch());

  const alreadyReviewd =
    project &&
    project.reviews.some((r) => r.customer.id === project.customer.id);

  const goToLeaveReviewSection = () => {
    setToReviewService(project);
    setActiveTab(DASHBOARD_SECTION_TAB.LEAVE_NEW_REVIEW);
  };

  if (alreadyReviewd)
    return (
      <GreyText
        size={14}
        marginTop="1em"
        marginLeft="1em"
        marginRight="1em"
        marginBottom="1em"
      >
        You already reviewed this project!
      </GreyText>
    );

  return (
    <Menu>
      <Menu.Group>
        <Menu.Item
          intent="none"
          disabled={true}
          onSelect={goToLeaveReviewSection}
        >
          Leave a Review
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
      .getCustomerAllFinishedProjects()
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
        Your Finished Projects
      </BlackText>
      <MutedText size={12} marginBottom="1em">
        View and Accept or Reject your requested services by specialists.
      </MutedText>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell flexGrow={1}>Id</Table.TextHeaderCell>
          <Table.TextHeaderCell flexGrow={2}>Service</Table.TextHeaderCell>
          <Table.TextHeaderCell>Specialist</Table.TextHeaderCell>
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
                  <Table.TextCell flexGrow={2}>
                    {project.offeredService.title}
                  </Table.TextCell>
                  <Table.TextCell>
                    {project.offeredService.specialist.fullName}
                  </Table.TextCell>
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
                        content={<RenderActionMenu project={project} />}
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
                      <Popover
                        content={<RenderReviewMenu project={project} />}
                        position={Position.BOTTOM_RIGHT}
                      >
                        <IconButton
                          icon="more"
                          appearance="minimal"
                          height={24}
                        />
                      </Popover>
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

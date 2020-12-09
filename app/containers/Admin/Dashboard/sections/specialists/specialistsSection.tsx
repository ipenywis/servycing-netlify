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
  setOfferedServicesCount,
  setSpecialists,
  setToUpdateOfferedService,
  setToUpdateSpecialist,
} from "../../actions";
import {
  makeSelectOfferedServices,
  makeSelectOfferedServicesCount,
  makeSelectSpecialists,
} from "../../selectors";
import {
  DASHBOARD_SECTION_TAB,
  DEFAULT_OFFERED_SERVICES_LOAD_RANGE,
} from "../../constants";
import styled from "styles/styled-components";
import { BlackText, MutedText, WarningText } from "components/text";
import { SectionContainer } from "../../common";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { MinimalSpinner } from "components/loadingSpinner/minimal";
import { wait } from "utils/common";
import { Pane } from "components/pane";
import { VerticalWrapper } from "components/verticalWrapper";
import { Marginer } from "components/marginer";
import { closePopupByClickOutside } from "types/common";
import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import { ILoadRangeOptions } from "types/pagination";
import { ISpecialist } from "types/specialist";
import specialistService from "services/specialistService";
import { Seperator } from "components/lineSeperator";
import { Avatar } from "components/avatar";

interface ISpecialistsProps {}

const stateSelector = createSelector(makeSelectSpecialists, (specialists) => ({
  specialists,
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setSpecialists: (specialists: ISpecialist[]) =>
    dispatch(setSpecialists(specialists)),
  setToUpdateSpecialist: (specialist: ISpecialist | null) =>
    dispatch(setToUpdateSpecialist(specialist)),
  setActiveTab: (tab: DASHBOARD_SECTION_TAB) => dispatch(setActiveTab(tab)),
});

interface IMenuProps {
  specialist: ISpecialist;
}

function RenderRowMenu(props: IMenuProps) {
  const { specialist } = props;
  const { specialists } = useSelector(stateSelector);
  const {
    setActiveTab,
    setSpecialists,
    setToUpdateSpecialist,
  } = actionDispatch(useDispatch());
  const [isDeleting, setDeleting] = useState(false);

  const goToUpdateSection = () => {
    setToUpdateSpecialist(specialist);
    setActiveTab(DASHBOARD_SECTION_TAB.UPDATE_SPECIALIST);
  };

  const deleteSpecialistsFromState = (id: string) => {
    const updatedSpecialists = specialists.filter((service) => {
      return service.id !== id;
    });

    setSpecialists(updatedSpecialists);
  };

  const deleteSpecialist = async () => {
    setDeleting(true);
    const deleted = await specialistService
      .delete(specialist.id)
      .catch((err) => {
        console.log("Error: ", err);
      });

    if (deleted) deleteSpecialistsFromState(specialist.id);

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
                All associated services will be deleted!
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

export function SpecialistsSection(props: ISpecialistsProps) {
  const { specialists } = useSelector(stateSelector);
  const { setSpecialists, setActiveTab } = actionDispatch(useDispatch());
  const [isLoading, setLoading] = useState(false);
  const [loadRange, setLoadRange] = useState<ILoadRangeOptions | null>(
    DEFAULT_OFFERED_SERVICES_LOAD_RANGE
  );

  const isEmptyOfferedServices =
    !specialists || (specialists && specialists.length === 0);

  const fetchSpecialists = async () => {
    setLoading(true);
    const specialists = await specialistService
      .getSpecialists()
      .catch((err) => {
        console.log("Err: ", err);
      });

    if (specialists) {
      setSpecialists(specialists);
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
    fetchSpecialists();
  }, []);

  return (
    <SectionContainer>
      <BlackText size={19} bold>
        Specialists
      </BlackText>
      <MutedText size={12} marginBottom="1em">
        All of offered services by all specialist are here, you can view, update
        or delete.
      </MutedText>
      <Button
        size={14}
        text="Add New Specialist"
        buttonTheme={ButtonTheme.FULL_MINIMAL_BLUE}
        onClick={() => setActiveTab(DASHBOARD_SECTION_TAB.ADD_NEW_SPECIALIST)}
      />
      <Table>
        <Table.Head>
          <Table.TextHeaderCell flexGrow={0.5}>Avatar</Table.TextHeaderCell>
          <Table.TextHeaderCell>Id</Table.TextHeaderCell>
          <Table.TextHeaderCell>Full Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Email</Table.TextHeaderCell>
          <Table.TextHeaderCell>Rating</Table.TextHeaderCell>
          <Table.TextHeaderCell>Short Bio</Table.TextHeaderCell>
          <Table.TextHeaderCell>More</Table.TextHeaderCell>
        </Table.Head>
        {(isLoading || isEmptyOfferedServices) && (
          <Pane alignCenter marginTop="5%">
            {isLoading && !isEmptyOfferedServices && <MinimalSpinner />}
            {isEmptyOfferedServices && !isLoading && (
              <WarningText>You haven't offered any services yet</WarningText>
            )}
          </Pane>
        )}
        <Table.Body>
          {!isLoading &&
            !isEmptyOfferedServices &&
            specialists.map((specialist, idx) => (
              <Table.Row key={idx}>
                <Table.Cell flexGrow={0.5}>
                  <Avatar name={specialist.fullName} size={29} />
                </Table.Cell>
                <Table.TextCell>{specialist.id}</Table.TextCell>
                <Table.TextCell>{specialist.fullName}</Table.TextCell>
                <Table.TextCell>{specialist.email}</Table.TextCell>
                <Table.TextCell>{specialist.rating}</Table.TextCell>
                <Table.TextCell isNumber>{specialist.shortBio}</Table.TextCell>
                <Table.Cell>
                  <Popover
                    content={<RenderRowMenu specialist={specialist} />}
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

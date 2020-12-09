import { Marginer } from "components/marginer";
import { Tab, Tablist } from "evergreen-ui";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import styled from "styles/styled-components";
import { setActiveTab } from "./actions";
import { DASHBOARD_SECTION_TAB } from "./constants";
import { FinishedProjectsSection } from "./sections/finishedProjectsSection";
import { LeaveReviewSection } from "./sections/leaveReviewSection";
import { PendingRequestsSection } from "./sections/pendingServicesRequests";
import { makeSelectActiveTab } from "./selectors";

interface ISectionsManagerProps {}

const ManagerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const stateSelector = createSelector(makeSelectActiveTab, (activeTab) => ({
  activeTab,
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setActiveTab: (tab: DASHBOARD_SECTION_TAB) => dispatch(setActiveTab(tab)),
});

function Tabs() {
  const { activeTab } = useSelector(stateSelector);
  const { setActiveTab } = actionDispatch(useDispatch());

  return (
    <Tablist>
      {Object.values(DASHBOARD_SECTION_TAB).map((tab, idx) => {
        if (tab === DASHBOARD_SECTION_TAB.LEAVE_NEW_REVIEW) return null;

        return (
          <Tab
            key={idx}
            isSelected={activeTab === tab}
            onSelect={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        );
      })}
    </Tablist>
  );
}

function RenderSection() {
  const { activeTab } = useSelector(stateSelector);
  switch (activeTab) {
    case DASHBOARD_SECTION_TAB.FINISHED_PROJECTS:
      return <FinishedProjectsSection />;
    case DASHBOARD_SECTION_TAB.LEAVE_NEW_REVIEW:
      return <LeaveReviewSection />;
    case DASHBOARD_SECTION_TAB.PENDING_SERVICE_REQUESTS:
      return <PendingRequestsSection />;
    default:
      return <></>;
  }
}

export function SectionsManager(props: ISectionsManagerProps) {
  return (
    <ManagerContainer>
      <Tabs />
      <Marginer direction="vertical" margin="2em" />
      <RenderSection />
    </ManagerContainer>
  );
}

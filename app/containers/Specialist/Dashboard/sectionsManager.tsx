import { Marginer } from "components/marginer";
import { Tab, Tablist } from "evergreen-ui";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import styled from "styles/styled-components";
import { setActiveTab } from "./actions";
import { DASHBOARD_SECTION_TAB } from "./constants";
import { AddNewServiceSection } from "./sections/addNewServiceSection";
import { OfferedServicesSection } from "./sections/offeredServicesSection";
import { PendingRequestsSection } from "./sections/pendingRequestsSection";
import { UpdateServiceSection } from "./sections/updateServiceSection";
import {
  makeSelectActiveTab,
  makeSelectToUpdateOfferedService,
} from "./selectors";

interface ISectionsManagerProps {}

const ManagerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const stateSelector = createSelector(
  makeSelectActiveTab,
  makeSelectToUpdateOfferedService,
  (activeTab, toUpdateOfferedService) => ({
    activeTab,
    toUpdateOfferedService,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setActiveTab: (tab: DASHBOARD_SECTION_TAB) => dispatch(setActiveTab(tab)),
});

function Tabs() {
  const { activeTab } = useSelector(stateSelector);
  const { setActiveTab } = actionDispatch(useDispatch());

  return (
    <Tablist>
      {Object.values(DASHBOARD_SECTION_TAB).map((tab, idx) => {
        //Hide update service section tab
        if (tab === DASHBOARD_SECTION_TAB.UPDATE_SERVICE) return null;
        else
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
    case DASHBOARD_SECTION_TAB.OFFERED_SERVICES:
      return <OfferedServicesSection />;
    case DASHBOARD_SECTION_TAB.PENDING_REQUESTS:
      return <PendingRequestsSection />;
    case DASHBOARD_SECTION_TAB.ADD_NEW_SERVICE:
      return <AddNewServiceSection />;
    case DASHBOARD_SECTION_TAB.UPDATE_SERVICE:
      return <UpdateServiceSection />;
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

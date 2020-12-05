import { Marginer } from "components/marginer";
import { Tab, Tablist } from "evergreen-ui";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import styled from "styles/styled-components";
import { setActiveTab } from "./actions";
import { DASHBOARD_SECTION_TAB } from "./constants";
import { OfferedServicesSection } from "./sections/offeredServicesSection";
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
      {Object.values(DASHBOARD_SECTION_TAB).map((tab, idx) => (
        <Tab
          key={idx}
          isSelected={activeTab === tab}
          onSelect={() => setActiveTab(tab)}
        >
          {tab}
        </Tab>
      ))}
    </Tablist>
  );
}

function RenderSection() {
  const { activeTab } = useSelector(stateSelector);
  switch (activeTab) {
    case DASHBOARD_SECTION_TAB.OVERVIEW:
      return <></>;
    case DASHBOARD_SECTION_TAB.OFFERED_SERVICES:
      return <OfferedServicesSection />;
    case DASHBOARD_SECTION_TAB.PENDING_REQUESTS:
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

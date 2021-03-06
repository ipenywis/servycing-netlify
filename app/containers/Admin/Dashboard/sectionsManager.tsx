import { Marginer } from "components/marginer";
import { Tab, Tablist } from "evergreen-ui";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import styled from "styles/styled-components";
import { setActiveTab } from "./actions";
import { DASHBOARD_SECTION_TAB } from "./constants";
import { AddNewCustomerSection } from "./sections/customers/addNewCustomerSection";
import { CustomersSection } from "./sections/customers/customersSection";
import { UpdateCustomerSection } from "./sections/customers/updateCustomerSection";
import { AddNewServiceSection } from "./sections/offeredServices/addNewServiceSection";
import { OfferedServicesSection } from "./sections/offeredServices/offeredServicesSection";
import { UpdateServiceSection } from "./sections/offeredServices/updateServiceSection";
import { ReviewsSection } from "./sections/reviews/reviewsSection";
import { UpdateReviewSection } from "./sections/reviews/updateReviewSection";
import { AddNewSpecialistSection } from "./sections/specialists/addNewSpecialistSection";
import { SpecialistsSection } from "./sections/specialists/specialistsSection";
import { UpdateSpecialistSection } from "./sections/specialists/updateSpecialistSection";
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
        else if (tab === DASHBOARD_SECTION_TAB.ADD_NEW_SPECIALIST) return null;
        else if (tab === DASHBOARD_SECTION_TAB.UPDATE_SPECIALIST) return null;
        else if (tab === DASHBOARD_SECTION_TAB.ADD_NEW_CUSTOMER) return null;
        else if (tab === DASHBOARD_SECTION_TAB.UPDATE_CUSTOMER) return null;
        else if (tab === DASHBOARD_SECTION_TAB.UPDATE_REVIEW) return null;
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
    case DASHBOARD_SECTION_TAB.UPDATE_SERVICE:
      return <UpdateServiceSection />;
    case DASHBOARD_SECTION_TAB.SPECIALISTS:
      return <SpecialistsSection />;
    case DASHBOARD_SECTION_TAB.ADD_NEW_SPECIALIST:
      return <AddNewSpecialistSection />;
    case DASHBOARD_SECTION_TAB.UPDATE_SPECIALIST:
      return <UpdateSpecialistSection />;
    case DASHBOARD_SECTION_TAB.CUSTOMERS:
      return <CustomersSection />;
    case DASHBOARD_SECTION_TAB.ADD_NEW_CUSTOMER:
      return <AddNewCustomerSection />;
    case DASHBOARD_SECTION_TAB.UPDATE_CUSTOMER:
      return <UpdateCustomerSection />;
    case DASHBOARD_SECTION_TAB.SERVICES_REVIEWS:
      return <ReviewsSection />;
    case DASHBOARD_SECTION_TAB.UPDATE_REVIEW:
      return <UpdateReviewSection />;
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

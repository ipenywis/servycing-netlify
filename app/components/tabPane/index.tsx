import React from 'react';
import styled, { css, theme } from 'styles/styled-components';

export interface ITabPaneProps {
  tabs: string[];
  activeTab: string;
  children: any | any[];

  onSelectTab?: (tab: string) => void;
}

const TabPaneContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TabList = styled.div`
  max-height: 42px;
  width: 100%;
  display: flex;
  border-bottom: 2px solid ${theme.default.mutedBorderColor};
`;

const Tab = styled.div<any>`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 8px;
  height: 42px;
  color: ${theme.default.greyText};
  border-bottom: 2px solid transparent;
  font-weight: 400;
  cursor: pointer;
  transition: all 230ms ease-in-out;

  &:not(:last-of-type) {
    margin-right: 1em;
  }

  ${({ isActive }) =>
    !isActive &&
    css`
      &:hover {
        color: ${theme.default.secondaryText};
      }
    `};

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${theme.default.tertiaryText};
      border-bottom: 2px solid ${theme.default.tertiaryText};
      cursor: default;
    `};
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 1.1em;
`;

export function TabPane(props: ITabPaneProps) {
  const { children, tabs, activeTab, onSelectTab } = props;

  return (
    <TabPaneContainer>
      <TabList>
        {tabs &&
          tabs.map((tab, idx) => (
            <Tab
              key={idx}
              isActive={tab === activeTab}
              onClick={
                tab !== activeTab ? onSelectTab?.bind(null, tab) : undefined
              }
            >
              {tab}
            </Tab>
          ))}
      </TabList>
      <Content>{children}</Content>
    </TabPaneContainer>
  );
}

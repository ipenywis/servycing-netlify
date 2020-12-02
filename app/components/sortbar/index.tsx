import React, { useState } from 'react';
import styled, { theme, css } from 'styles/styled-components';
import { MutedText, DarkText } from 'components/text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBars, faTh } from '@fortawesome/free-solid-svg-icons';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import { Seperator } from 'components/lineSeperator';
import { CourseSort } from 'types/course';
import { Link } from 'components/link';
import { useHistory } from 'react-router-dom';

export interface ISortbarProps {
  title: string;
  items?: ISortItem[];
  active?: CourseSort;
  activeMode?: ViewMode;
  defaultItem?: ISortItem;
  titleLinkTo?: string;
  reloadOnTitleClick?: boolean;

  onClick?: (sort: CourseSort) => void;
  onViewModeClick?: (mode: ViewMode) => void;
}

export interface ISortItem {
  name: string;
}

export type ViewMode = 'card' | 'inline';

const SortbarContainer = styled.div`
  width: 100%;
  min-height: 35px;
  background-color: ${theme.default.componentBackground};
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 0 3px 1px rgba(15, 15, 15, 0.16);
  z-index: 2;
`;

const Title = styled(DarkText)`
  font-size: 14px;
  font-weight: 400;
`;

interface IViewModeIconContainerProps {
  active?: boolean;
}

const ViewModeIconContainer = styled.div<IViewModeIconContainerProps>`
  &:not(:last-of-type) {
    margin-right: 10px;
  }
  font-size: 13px;
  opacity: 0.8;
  color: ${theme.default.mutedText};
  cursor: pointer;
  transition: all 250ms ease-in-out;

  ${({ active }) =>
    active &&
    css`
      color: ${theme.default.secondaryText};
    `};

  &:hover {
    opacity: 0.6;
    color: ${theme.default.secondaryText};
  }
`;

interface ISortingTextProps {
  active?: boolean;
}

const SortingText = styled(MutedText)<ISortingTextProps>`
  font-size: 13px;
  cursor: pointer;

  &:hover {
    color: ${theme.default.tertiaryText};

    svg {
      color: ${theme.default.tertiaryText};
    }
  }

  ${({ active }) =>
    active &&
    css`
      color: ${theme.default.tertiaryText};
      svg {
        color: ${theme.default.tertiaryText};
      }
    `};
`;

const SortingIcon = styled(FontAwesomeIcon)`
  margin-left: 4px;
  color: ${theme.default.tertiaryText};
`;

export function Sortbar(props: ISortbarProps) {
  const { title, items, active, activeMode, titleLinkTo } = props;

  const noSortingItems = !items || items.length === 0;

  const onViewModeClick = mode => {
    props.onViewModeClick && props.onViewModeClick(mode);
  };

  const onSortItemClick = (item: ISortItem) => {
    if (item.name === 'Recent')
      props.onClick && props.onClick(CourseSort.RECENT);
    else if (item.name === 'Popular')
      props.onClick && props.onClick(CourseSort.POPULAR);
  };

  const history = useHistory();

  return (
    <SortbarContainer>
      <HorizontalWrapper>
        <Link to={titleLinkTo || '#'}>
          <Title>{title}</Title>
        </Link>
      </HorizontalWrapper>
      <HorizontalWrapper>
        <HorizontalWrapper>
          <ViewModeIconContainer
            active={activeMode === 'card'}
            onClick={() => onViewModeClick('card')}
          >
            <FontAwesomeIcon icon={faTh} />
          </ViewModeIconContainer>
          <ViewModeIconContainer
            active={activeMode === 'inline'}
            onClick={() => onViewModeClick('inline')}
          >
            <FontAwesomeIcon icon={faBars} />
          </ViewModeIconContainer>
        </HorizontalWrapper>
        <Seperator direction="vertical" spacing="10px" />
        {!noSortingItems &&
          (items as ISortItem[]).map((item, idx) => {
            return (
              <React.Fragment key={`${item.name}-${idx}`}>
                <HorizontalWrapper centerVertically spacing="0">
                  <SortingText
                    active={active && active.toString() === item.name}
                    onClick={onSortItemClick.bind(null, item)}
                    noEffects={false}
                    verticalCenter
                  >
                    <span>{item.name}</span>
                    <SortingIcon icon={faAngleDown} size="xs" />
                  </SortingText>
                </HorizontalWrapper>
                {idx + 1 !== (items as ISortItem[]).length && (
                  <Seperator size="20px" direction="vertical" spacing="14px" />
                )}
              </React.Fragment>
            );
          })}
      </HorizontalWrapper>
    </SortbarContainer>
  );
}

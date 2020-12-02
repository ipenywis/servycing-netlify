import React from 'react';
import styled from 'styles/styled-components';
import { ICardProps, Card } from 'components/card';
import { BlackText } from 'components/text';
import {
  FontAwesomeIconProps,
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';
import Skeleton from 'react-loading-skeleton';

export interface IUnorderedListCardProps extends Partial<ICardProps> {
  items: string[];
  icon?: FontAwesomeIconProps['icon'];
  iconColor?: string;
  isLoading?: boolean;
  loadingSkeletonCount?: number;
}

const UnorderedListCardContainer = styled(Card)`
  width: fit-content;
  display: flex;
  padding: 14px 1em;
  padding-right: 4em;
  min-width: 50%;
  max-width: 7in;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 8px;
`;

const ListItemContainer = styled.div`
  display: flex;
  margin-top: 6px;
`;

const IconContainer = styled.div<IUnorderedListCardProps>`
  font-size: 14px;
  margin-right: 8px;
  margin-top: 0px;
  color: ${({ iconColor }) => iconColor && iconColor};
`;

const ListItem = styled(BlackText)`
  font-size: 15px;
`;

function UnorderedListCard(props: IUnorderedListCardProps) {
  const { items, icon, isLoading, loadingSkeletonCount, ...cardProps } = props;

  const noItems = !items || isLoading || (items && items.length === 0);

  return (
    <UnorderedListCardContainer {...cardProps} titleSize={18}>
      <ItemsContainer>
        {noItems &&
          Array(loadingSkeletonCount)
            .fill('')
            .map(() => <Skeleton width="6em" />)}
        {!noItems &&
          items.map((item, idx) => (
            <ListItemContainer key={idx}>
              {icon && (
                <IconContainer {...props}>
                  <FontAwesomeIcon icon={icon} />
                </IconContainer>
              )}
              <ListItem>{item}</ListItem>
            </ListItemContainer>
          ))}
      </ItemsContainer>
    </UnorderedListCardContainer>
  );
}

UnorderedListCard.defaultProps = {
  loadingSkeletonCount: 4,
};

export { UnorderedListCard };

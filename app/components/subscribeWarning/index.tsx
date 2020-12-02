import React from 'react';
import styled, { theme } from 'styles/styled-components';
import { WhiteText } from 'components/text';

export interface ISubscribeWarningProps {}

const WarningContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${theme.default.dangerLight};
  justify-content: center;
  padding: 9px;
`;

export function SubscribeWarning(props: ISubscribeWarningProps) {
  return (
    <WarningContainer>
      <WhiteText size={13} bold>
        Cheer Up!
      </WhiteText>
      <WhiteText size={11} marginTop={6}>
        You can now Access courses and lessons at Slearn now and learn for a
        single price for life!
      </WhiteText>
    </WarningContainer>
  );
}

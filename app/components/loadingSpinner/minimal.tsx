import React from 'react';
import styled, { keyframes, theme } from 'styles/styled-components';

export interface IMinimalSpinnerProps {
  size: 'sm' | 'md' | 'lg';
}

const LoadingSpin = keyframes`
  100% {
			transform: rotate(360deg)
	}
`;

const MinimalSpinnerWrapper = styled.div`
  pointer-events: none;
  border: 2.3px solid transparent;
  border-color: #eee;
  //border-top-color: #3e67ec;
  border-top-color: ${theme.default.greyText};
  border-radius: 100%;
  animation: ${LoadingSpin} 0.8s linear infinite;
  position: relative;
`;

const SmallSpinner = styled(MinimalSpinnerWrapper)`
  min-width: 12px;
  min-height: 12px;
  //border-width: 0.3px;
`;

const MediumSpinner = styled(MinimalSpinnerWrapper)`
  min-width: 1.2em;
  min-height: 1.2em;
`;

const LargeSpinner = styled(MinimalSpinnerWrapper)`
  min-width: 2em;
  min-height: 2em;
`;

function MinimalSpinner(props: IMinimalSpinnerProps) {
  const { size } = props;

  switch (size) {
    case 'sm':
      return <SmallSpinner />;
    case 'md':
      return <MediumSpinner />;
    case 'lg':
      return <LargeSpinner />;
  }
}

MinimalSpinner.defaultProps = {
  size: 'md',
};

export { MinimalSpinner };

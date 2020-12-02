import React from 'react';
import styled from 'styles/styled-components';
import { Link } from 'components/link';
import ROUTES from 'containers/ROUTES';

export interface IBrandLogoProps {
  size?: number;
}

const LogoContainer = styled.div<IBrandLogoProps>`
  width: ${({ size }) => (size ? `${85 + size}px` : '87px')};
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const LogoText = styled.div<IBrandLogoProps>`
  color: #fff;
  font-weight: 700;
  font-size: ${({ size }) => (size ? `${size}px` : '28px')};
`;

export function BrandLogo(props: IBrandLogoProps) {
  return (
    <LogoContainer {...props}>
      <Link to={ROUTES.homePage} noEffects>
        <LogoText {...props}>Slearn</LogoText>
      </Link>
    </LogoContainer>
  );
}

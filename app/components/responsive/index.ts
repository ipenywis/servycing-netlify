export const screenSizes = {
  mobile: 768,
  tablet: 992,
  laptop: 1324,
  desktop: 2024,
};

export interface IQuerySizeProps {
  isDesktop?: boolean;
  isLaptop?: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
}

export const Device = {
  mobile: `(max-width: ${screenSizes.mobile}px)`,
  tablet: `(max-width: ${screenSizes.tablet}px) and (min-width: ${screenSizes.mobile}px)`,
  desktop: `(min-width: ${screenSizes.laptop}px)`,
};

export const MobileQuery = {
  minWidth: 100,
  maxWidth: screenSizes.mobile,
};

export const TabletQuery = {
  minWidth: screenSizes.mobile,
  maxWidth: screenSizes.tablet,
};

export const LaptopQuery = {
  minWidth: screenSizes.tablet,
  maxWidth: screenSizes.desktop,
};

export const DesktopQuery = {
  minWidth: screenSizes.desktop,
};

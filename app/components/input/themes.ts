import { css, theme } from 'styles/styled-components';

export enum InputTheme {
  MINIMAL_SHADOW = 'MINIMAL_SHADOW',
  MINIMAL_BORDER = 'MINIMAL_BORDER',
  MINIMAL_BORDER_DARK = 'MINIMAL_BORDER_DARK',
  PRIMARY_BORDER = 'PRIMARY_BORDER',
  INLINE_MINIMAL = 'INLINE_MINIMAL',
  MINIMAL_EDITABLE = 'MINIMAL_EDITABLE',
}

interface IInputThemeStyle {
  name: InputTheme;
  transitionDuration?: CSSStyleDeclaration['transitionDuration'];
  after?: Partial<CSSStyleDeclaration>;
  borderRadius?: CSSStyleDeclaration['borderRadius'];
  padding?: CSSStyleDeclaration['padding'];
  normal?: {
    color?: CSSStyleDeclaration['color'];
    backgroundColor?: CSSStyleDeclaration['backgroundColor'];
    border?: CSSStyleDeclaration['border'];
    iconFillColor?: CSSStyleDeclaration['color'];
    boxShadow?: CSSStyleDeclaration['boxShadow'];
    borderTop?: CSSStyleDeclaration['borderTop'];
    borderLeft?: CSSStyleDeclaration['borderLeft'];
    borderRight?: CSSStyleDeclaration['borderRight'];
    borderBottom?: CSSStyleDeclaration['borderBottom'];
  };
  hover?: {
    color?: CSSStyleDeclaration['color'];
    backgroundColor?: CSSStyleDeclaration['backgroundColor'];
    background?: CSSStyleDeclaration['background'];
    border?: CSSStyleDeclaration['border'];
    iconFillColor?: CSSStyleDeclaration['color'];
    filter?: CSSStyleDeclaration['filter'];
    animation?: CSSStyleDeclaration['animation'];
    boxShadow?: CSSStyleDeclaration['boxShadow'];
    borderTop?: CSSStyleDeclaration['borderTop'];
    borderLeft?: CSSStyleDeclaration['borderLeft'];
    borderRight?: CSSStyleDeclaration['borderRight'];
    borderBottom?: CSSStyleDeclaration['borderBottom'];
  };
  focus?: {
    color?: CSSStyleDeclaration['color'];
    backgroundColor?: CSSStyleDeclaration['backgroundColor'];
    background?: CSSStyleDeclaration['background'];
    border?: CSSStyleDeclaration['border'];
    iconFillColor?: CSSStyleDeclaration['color'];
    filter?: CSSStyleDeclaration['filter'];
    animation?: CSSStyleDeclaration['animation'];
    boxShadow?: CSSStyleDeclaration['boxShadow'];
    borderTop?: CSSStyleDeclaration['borderTop'];
    borderLeft?: CSSStyleDeclaration['borderLeft'];
    borderRight?: CSSStyleDeclaration['borderRight'];
    borderBottom?: CSSStyleDeclaration['borderBottom'];
  };
  error?: {
    color?: CSSStyleDeclaration['color'];
    backgroundColor?: CSSStyleDeclaration['backgroundColor'];
    background?: CSSStyleDeclaration['background'];
    border?: CSSStyleDeclaration['border'];
    iconFillColor?: CSSStyleDeclaration['color'];
    filter?: CSSStyleDeclaration['filter'];
    animation?: CSSStyleDeclaration['animation'];
    boxShadow?: CSSStyleDeclaration['boxShadow'];
    borderTop?: CSSStyleDeclaration['borderTop'];
    borderLeft?: CSSStyleDeclaration['borderLeft'];
    borderRight?: CSSStyleDeclaration['borderRight'];
    borderBottom?: CSSStyleDeclaration['borderBottom'];
  };
}

const INPUT_THEMES: IInputThemeStyle[] = [];

/* Predefined Themes */
const MINIMAL_SHADOW: IInputThemeStyle = {
  name: InputTheme.MINIMAL_SHADOW,
  normal: {
    boxShadow: '0 3px 30px -15px rgba(0, 0, 0, 0.28)',
  },
  focus: {
    boxShadow: '0 3px 20px -5px rgba(0, 0, 0, 0.28)',
  },
};

const MINIMAL_BORDER: IInputThemeStyle = {
  name: InputTheme.MINIMAL_BORDER,
  normal: {
    //boxShadow: '0 3px 30px -15px rgba(0, 0, 0, 0.28)',
    boxShadow: ' 0 0 1px 1px rgba(15,15,15,0.15)',
    //border: '1px solid rgba(31, 32, 65, 0.2);',
  },
  focus: {
    //border: '1px solid #3498db',
    boxShadow: '0 0 3px 1px rgba(52, 152, 219, 0.8)',
  },
};

const MINIMAL_BORDER_DARK: IInputThemeStyle = {
  name: InputTheme.MINIMAL_BORDER_DARK,
  normal: {
    //boxShadow: '0 3px 30px -15px rgba(0, 0, 0, 0.28)',
    boxShadow: '0 0 1px 1px rgba(15,15,15,0.15)',
    //border: '1px solid rgba(31, 32, 65, 0.2);',
  },
  focus: {
    //border: '1px solid #3498db',
    boxShadow: '0 0 1px 1px rgba(15,15,15, 0.4)',
  },
  error: {
    boxShadow: `0 0 1px 1px ${theme.default.dangerLight}`,
  },
};

const PRIMARY_BORDER: IInputThemeStyle = {
  name: InputTheme.PRIMARY_BORDER,
  normal: {
    boxShadow: ' 0 0 1px 2px rgba(15,15,15,0.09)',
  },
  focus: {
    boxShadow: '0 0 0px 2px #3eb06fa1',
  },
};

const INLINE_MINIMAL: IInputThemeStyle = {
  name: InputTheme.INLINE_MINIMAL,
  borderRadius: '0',
  padding: '0 0 0 0',
  normal: {
    border: '0',
    borderBottom: `1px solid ${theme.default.secondaryText}`,
  },
  focus: {
    border: '0',
    borderBottom: `1px solid ${theme.default.shinyBlue}`,
  },
  error: {
    border: '0',
    borderBottom: `1px solid ${theme.default.dangerDark} !important`,
  },
};

const MINIMAL_EDITABLE: IInputThemeStyle = {
  name: InputTheme.MINIMAL_EDITABLE,
  padding: '0 0 2px 7px',
  normal: {
    border: '0',
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  focus: {
    border: '0',
    //boxShadow: `0 0 1px 1px ${theme.default.shinyBlue}`,
  },
  error: {
    border: '0',
    borderBottom: `0`,
  },
};

INPUT_THEMES.push(MINIMAL_SHADOW);
INPUT_THEMES.push(MINIMAL_BORDER);
INPUT_THEMES.push(PRIMARY_BORDER);
INPUT_THEMES.push(INLINE_MINIMAL);
INPUT_THEMES.push(MINIMAL_BORDER_DARK);
INPUT_THEMES.push(MINIMAL_EDITABLE);

function applyThemeStyle(currentTheme: IInputThemeStyle) {
  return css`
    border-radius: ${currentTheme.borderRadius};
    padding: ${currentTheme.padding};

    ${
      currentTheme.normal &&
      css`
        color: ${currentTheme.normal.color};
        background-color: ${currentTheme.normal.backgroundColor};
        border: ${currentTheme.normal.border || `2px solid transparent`};
        transition-duration: ${currentTheme.transitionDuration || ''};
        box-shadow: ${currentTheme.normal.boxShadow || ''};
        border-bottom: ${currentTheme.normal.borderBottom};
        border-right: ${currentTheme.normal.borderRight};
        border-top: ${currentTheme.normal.borderTop};
        border-left: ${currentTheme.normal.borderLeft};
      `
    };

    ${
      currentTheme.hover &&
      css`
        &:hover:enabled {
          color: ${currentTheme.hover.color || ''};
          background-color: ${currentTheme.hover.backgroundColor || ''};
          border: ${currentTheme.hover.border || `2px solid transparent`};
          filter: ${currentTheme.hover.filter || ''};
          box-shadow: ${currentTheme.hover.boxShadow};
          border-bottom: ${currentTheme.hover.borderBottom};
          border-right: ${currentTheme.hover.borderRight};
          border-top: ${currentTheme.hover.borderTop};
          border-left: ${currentTheme.hover.borderLeft};
          svg {
            path {
              fill: ${currentTheme.hover.iconFillColor};
            }
          }
        }
      `
    }

    ${
      currentTheme.focus &&
      css`
        &:focus:enabled {
          color: ${currentTheme.focus.color || ''};
          background-color: ${currentTheme.focus.backgroundColor || ''};
          border: ${currentTheme.focus.border || `2px solid transparent`};
          filter: ${currentTheme.focus.filter || ''};
          box-shadow: ${currentTheme.focus.boxShadow};
          border-bottom: ${currentTheme.focus.borderBottom};
          border-right: ${currentTheme.focus.borderRight};
          border-top: ${currentTheme.focus.borderTop};
          border-left: ${currentTheme.focus.borderLeft};
          svg {
            path {
              fill: ${currentTheme.focus.iconFillColor};
            }
          }
        }
      `
    }


    ${({ error }: any) =>
      error &&
      currentTheme.error &&
      css`
        color: ${currentTheme.error.color || ''};
        background-color: ${currentTheme.error.backgroundColor || ''};
        border: ${currentTheme.error.border || `2px solid transparent`};
        filter: ${currentTheme.error.filter || ''};
        box-shadow: ${currentTheme.error.boxShadow};
        border-bottom: ${currentTheme.error.borderBottom};
        border-right: ${currentTheme.error.borderRight};
        border-top: ${currentTheme.error.borderTop};
        border-left: ${currentTheme.error.borderLeft};
        svg {
          path {
            fill: ${currentTheme.error.iconFillColor};
          }
        }
      `}

    & svg {
      path {
        fill: ${currentTheme.normal && currentTheme.normal.iconFillColor};
      }
    }
  `;
}

export function generateInputThemesStyle(activeTheme: InputTheme | undefined) {
  // If no theme specified choose default one
  if (!activeTheme) {
    return applyThemeStyle(INPUT_THEMES[0]);
  }
  // Otherwise, look for the right themeStyle to apply
  for (const themeStyle of INPUT_THEMES) {
    if (themeStyle.name === activeTheme) {
      return applyThemeStyle(themeStyle);
    }
  }
  return css``;
}

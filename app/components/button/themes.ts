import { css, theme } from "styles/styled-components";

export enum ButtonTheme {
  PRIMARY = "PRIMARY",
  PRIMARY_SOLID = "PRIMARY_SOLID",
  PRIMARY_BLACK = "PRIMARY_BLACK",
  PRIMARY_PRIMARY = "PRIMARY_PRIMARY",
  MINIMAL_WHITE = "MINIMAL_WHITE",
  MINIMAL = "MINIMAL",
  BLACK = "BLACK",
  SHINY_GREEN = "SHINY_GREEN",
  BORDERED_BLACK = "BORDERED_BLACK",
  BORDERED_MINIMAL_BLACK = "BORDERED_MINIMAL_BLACK",
  FULL_MINIMAL_BLUE = "FULL_MINIMAL_BLUE",
  FULL_MINIMAL_DANGER = "FULL_MINIMAL_DANGER",
  FULL_MINIMAL_BLACK = "FULL_MINIMAL_BLACK",
  DANGER_SOLID = "DANGER_SOLID",
  DANGER_MINIMAL = "DANGER_MINIMAL",
  BLACK_SOLID = "BLACK_SOLID",
  GREY_SOLID = "GREY_SOLID",
}

interface IButtonThemeStyle {
  name: ButtonTheme;
  transitionDuration?: CSSStyleDeclaration["transitionDuration"];
  after?: Partial<CSSStyleDeclaration>;
  fontWeight?: CSSStyleDeclaration["fontWeight"];
  padding?: CSSStyleDeclaration["padding"];
  margin?: CSSStyleDeclaration["margin"];
  normal: {
    color: CSSStyleDeclaration["color"];
    backgroundColor: CSSStyleDeclaration["backgroundColor"];
    border?: CSSStyleDeclaration["border"];
    iconFillColor?: CSSStyleDeclaration["color"];
    boxShadow?: CSSStyleDeclaration["boxShadow"];
  };
  hover?: {
    color?: CSSStyleDeclaration["color"];
    backgroundColor?: CSSStyleDeclaration["backgroundColor"];
    background?: CSSStyleDeclaration["background"];
    border?: CSSStyleDeclaration["border"];
    iconFillColor?: CSSStyleDeclaration["color"];
    filter?: CSSStyleDeclaration["filter"];
    animation?: CSSStyleDeclaration["animation"];
    boxShadow?: CSSStyleDeclaration["boxShadow"];
    transform?: CSSStyleDeclaration["transform"];
  };
}

const BUTTON_THEMES: IButtonThemeStyle[] = [];

/* Predefined Themes */
const PRIMARY_THEME: IButtonThemeStyle = {
  name: ButtonTheme.PRIMARY,
  transitionDuration: "300ms",
  normal: {
    color: theme.default.primaryText,
    backgroundColor: theme.default.primary,
  },
  hover: {
    border: `2px solid ${theme.default.primary}`,
    backgroundColor: "transparent",
  },
};

const PRIMARY_PRIMARY: IButtonThemeStyle = {
  name: ButtonTheme.PRIMARY_PRIMARY,
  transitionDuration: "300ms",
  normal: {
    color: theme.default.primaryText,
    backgroundColor: theme.default.primary,
  },
  hover: {
    border: `2px solid ${theme.default.primary}`,
    color: theme.default.primary,
    backgroundColor: "transparent",
  },
};

const PRIMARY_SOLID_THEME: IButtonThemeStyle = {
  name: ButtonTheme.PRIMARY_SOLID,
  transitionDuration: "300ms",
  normal: {
    color: theme.default.primaryText,
    backgroundColor: theme.default.primary,
  },
  hover: {
    backgroundColor: theme.default.primaryDark,
  },
};

const PRIMARY_BLACK_THEME: IButtonThemeStyle = {
  name: ButtonTheme.PRIMARY_BLACK,
  transitionDuration: "300ms",
  normal: {
    color: theme.default.primaryText,
    backgroundColor: theme.default.primary,
  },
  hover: {
    border: `2px solid ${theme.default.primary}`,
    backgroundColor: "transparent",
    color: theme.default.secondaryText,
  },
};

const MINIMAL_WHITE: IButtonThemeStyle = {
  name: ButtonTheme.MINIMAL_WHITE,
  padding: "0",
  margin: "0",
  normal: {
    color: theme.default.primaryText,
    backgroundColor: "transparent",
  },
  hover: {
    filter: "contrast(0.7)",
    boxShadow: "none",
  },
};

const MINIMAL: IButtonThemeStyle = {
  name: ButtonTheme.MINIMAL,
  normal: {
    color: theme.default.tertiaryText,
    backgroundColor: "transparent",
  },
  hover: {
    //filter: 'contrast(0.6)',
    boxShadow: "none",
    backgroundColor: theme.default.primary,
    color: theme.default.primaryText,
  },
};

const BLACK_THEME: IButtonThemeStyle = {
  name: ButtonTheme.BLACK,
  transitionDuration: "350ms",
  normal: {
    color: theme.default.primaryText,
    backgroundColor: theme.default.primaryBackground,
  },
  hover: {
    border: `2px solid ${theme.default.primaryBackground}`,
    backgroundColor: "transparent",
    color: theme.default.tertiaryText,
  },
};

const SHINY_GREEN: IButtonThemeStyle = {
  name: ButtonTheme.SHINY_GREEN,
  transitionDuration: "300ms",
  normal: {
    color: theme.default.primaryText,
    backgroundColor: theme.default.shinyPrimary,
    boxShadow: "0px 0px 13m2px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    //transform: 'translateY(1px)',
    //boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.06)',
    filter: "brightness(1.06)",
  },
};

const BORDERED_BLACK_THEME: IButtonThemeStyle = {
  name: ButtonTheme.BORDERED_BLACK,
  transitionDuration: "300ms",
  normal: {
    color: theme.default.secondaryText,
    backgroundColor: "transparent",
    border: `2px solid ${theme.default.primaryBackground}`,
  },
  hover: {
    backgroundColor: theme.default.primaryBackground,
    color: theme.default.primaryText,
  },
};

const BORDERED_MINIMAL_BLACK_THEME: IButtonThemeStyle = {
  name: ButtonTheme.BORDERED_MINIMAL_BLACK,
  transitionDuration: "300ms",
  normal: {
    color: theme.default.secondaryText,
    backgroundColor: "transparent",
    border: `2px solid ${theme.default.primaryBackground}`,
  },
  hover: {
    transform: "translateY(1px)",
    //border: `2px solid ${theme.default.primaryBackground}`,
  },
};

const FULL_MINIMAL_BLUE: IButtonThemeStyle = {
  name: ButtonTheme.FULL_MINIMAL_BLUE,
  normal: {
    color: theme.default.shinyBlue,
    backgroundColor: "transparent",
    border: "0",
  },
  hover: {
    backgroundColor: "transparent",
    filter: "contrast(0.6)",
    border: "0",
    boxShadow: "0",
  },
};

const FULL_MINIMAL_DANGER: IButtonThemeStyle = {
  name: ButtonTheme.FULL_MINIMAL_DANGER,
  fontWeight: "500",
  normal: {
    color: theme.default.dangerLight,
    backgroundColor: "transparent",
    border: "0",
  },
  hover: {
    backgroundColor: "transparent",
    filter: "contrast(0.6)",
    border: "0",
    boxShadow: "0",
  },
};

const FULL_MINIMAL_BLACK: IButtonThemeStyle = {
  name: ButtonTheme.FULL_MINIMAL_BLACK,
  normal: {
    color: theme.default.secondaryText,
    backgroundColor: "transparent",
    border: "0",
  },
  hover: {
    backgroundColor: "transparent",
    filter: "contrast(0.6)",
    border: "0",
    boxShadow: "0",
  },
};

const DANGER_SOLID: IButtonThemeStyle = {
  name: ButtonTheme.DANGER_SOLID,
  transitionDuration: "300ms",
  normal: {
    color: "#fff",
    backgroundColor: theme.default.dangerLight,
  },
  hover: {
    backgroundColor: theme.default.dangerDark,
  },
};

const DANGER_MINIMAL: IButtonThemeStyle = {
  name: ButtonTheme.DANGER_MINIMAL,
  transitionDuration: "300ms",
  normal: {
    color: "#fff",
    backgroundColor: theme.default.dangerLight,
  },
  hover: {
    backgroundColor: "transparent",
    border: `2px solid ${theme.default.dangerLight}`,
    color: theme.default.dangerLight,
  },
};

const BLACK_SOLID: IButtonThemeStyle = {
  name: ButtonTheme.BLACK_SOLID,
  transitionDuration: "300ms",
  normal: {
    color: "#fff",
    backgroundColor: theme.default.secondaryText,
  },
  hover: {
    backgroundColor: "#141414e6",
  },
};

const GREY_SOLID: IButtonThemeStyle = {
  name: ButtonTheme.GREY_SOLID,
  transitionDuration: "300ms",
  normal: {
    color: theme.default.greyText,
    backgroundColor: theme.default.lightMutedBorderColor,
    boxShadow: `0 0 2px ${theme.default.greyText}`,
  },
  hover: {
    filter: "contrast(0.95)",
  },
};

BUTTON_THEMES.push(PRIMARY_THEME);
BUTTON_THEMES.push(PRIMARY_PRIMARY);
BUTTON_THEMES.push(MINIMAL_WHITE);
BUTTON_THEMES.push(MINIMAL);
BUTTON_THEMES.push(PRIMARY_SOLID_THEME);
BUTTON_THEMES.push(PRIMARY_BLACK_THEME);
BUTTON_THEMES.push(BLACK_THEME);
BUTTON_THEMES.push(SHINY_GREEN);
BUTTON_THEMES.push(BORDERED_BLACK_THEME);
BUTTON_THEMES.push(BORDERED_MINIMAL_BLACK_THEME);
BUTTON_THEMES.push(FULL_MINIMAL_BLUE);
BUTTON_THEMES.push(FULL_MINIMAL_DANGER);
BUTTON_THEMES.push(FULL_MINIMAL_BLACK);
BUTTON_THEMES.push(DANGER_SOLID);
BUTTON_THEMES.push(BLACK_SOLID);
BUTTON_THEMES.push(DANGER_MINIMAL);
BUTTON_THEMES.push(GREY_SOLID);

function applyThemeStyle(currentTheme: IButtonThemeStyle) {
  return css`
    font-weight: ${currentTheme.fontWeight};
    padding: ${currentTheme.padding};
    margin: ${currentTheme.margin} !important;
    color: ${currentTheme.normal.color};
    background-color: ${currentTheme.normal.backgroundColor};
    border: ${currentTheme.normal.border || `2px solid transparent`};
    transition-duration: ${currentTheme.transitionDuration || ""};
    box-shadow: ${currentTheme.normal.boxShadow};
    ${currentTheme.hover &&
    css`
      &:hover:enabled {
        color: ${currentTheme.hover.color || ""};
        background-color: ${currentTheme.hover.backgroundColor || ""};
        border: ${currentTheme.hover.border || `2px solid transparent`};
        filter: ${currentTheme.hover.filter || ""};
        box-shadow: ${currentTheme.hover.boxShadow};
        transform: ${currentTheme.hover.transform};
        svg {
          path {
            fill: ${currentTheme.hover.iconFillColor};
          }
        }
      }
    `}
    & svg {
      path {
        fill: ${currentTheme.normal.iconFillColor};
      }
    }
  `;
}

export function generateThemesStyle(activeTheme: ButtonTheme | undefined) {
  // If no theme specified choose default one
  if (!activeTheme) {
    return applyThemeStyle(BUTTON_THEMES[0]);
  }
  // Otherwise, look for the right themeStyle to apply
  for (const themeStyle of BUTTON_THEMES) {
    if (themeStyle.name === activeTheme) {
      return applyThemeStyle(themeStyle);
    }
  }
  return css``;
}

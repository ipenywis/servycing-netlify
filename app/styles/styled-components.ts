import * as styledComponents from "styled-components";

// theme.ts
// your theme variables
export interface IThemeInterface {
  primary: string;
  componentBackground: string;
  componentBackgroundSecondary: string;
}

export const theme = {
  default: {
    primaryText: "#fff",
    secondaryText: "#000000e6",
    tertiaryText: "#000000",
    greyText: "#5F5F5F",
    mutedText: "#b3b3b3",
    lightGreyText: "#dadada",
    superLightGrey: "#f6f8fa",
    lightText: "#f2f2f2",
    shinyBlue: "#316AFF",
    primary: "#3EB06F",
    primaryDark: "#359e63",
    primaryBackground: "#141618",
    secondaryBackground: "#264653",
    lightPrimaryBackground: "#25292d",
    shinyPrimary: "#1ABD5F",
    componentBackground: "#fff",
    componentBackgroundSecondary: "#fff",
    dangerLight: "#EC4C47",
    dangerDark: "#BF0E08",
    shinyYellow: "#f8e114",
    gold: "#e3ce13",
    nightBlue: "#323439",
    mutedBorderColor: "#dedede",
    lightMutedBorderColor: "#eaeaea",
    blueDianne: "#264653",
  },
};
const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;

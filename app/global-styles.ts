import { createGlobalStyle } from 'styles/styled-components';

const GlobalStyle = createGlobalStyle`

  html {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    overflow: auto;
  }

  body {
    min-height: 100% !important;
    width: 100% !important;
    margin: 0 !important;
    
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;

    label {
      font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
    }
  }

  #app {
    background-color: #fafafa;
    height: 100%;
    width: 100%;
    overflow: auto;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;

export default GlobalStyle;

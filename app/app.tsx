/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

// Import all the third party stuff
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import FontFaceObserver from "fontfaceobserver";
import history from "utils/history";
import "sanitize.css/sanitize.css";
import * as OfflinePluginRuntime from "offline-plugin/runtime";

// Import root app
import App from "containers/App";

// Load the favicon and the .htaccess file
import "!file-loader?name=[name].[ext]!./images/favicon.ico";
import "file-loader?name=.htaccess!./.htaccess";

import { HelmetProvider } from "react-helmet-async";

import configureStore from "./configureStore";

// Import i18n messages
import { translationMessages } from "i18n";

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const robotoObserver = new FontFaceObserver("Roboto", {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
robotoObserver.load().then(() => {
  console.info("Roboto Font Loaded!");
  document.body.classList.add("fontLoaded");
});

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById("app") as HTMLElement;

export const ConnectedApp = (props: { App: any; messages: any }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <HelmetProvider>{props.App}</HelmetProvider>
    </ConnectedRouter>
  </Provider>
);
const render = (messages: any) => {
  ReactDOM.render(
    <ConnectedApp App={<App />} messages={messages} />,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(["./i18n"], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!(window as any).Intl) {
  new Promise((resolve) => {
    resolve(import("intl"));
  })
    .then(() =>
      Promise.all([
        import("intl/locale-data/jsonp/en.js"),
        import("intl/locale-data/jsonp/de.js"),
      ])
    )
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === "production") {
  OfflinePluginRuntime.install();
}

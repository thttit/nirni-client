import React from "react";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Theme from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <CssBaseline />
        <App />
      </Theme>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

import * as React from "react";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
import "./style.css";

import App from "./components/App";
import { Provider } from "react-redux";
import { setupStore } from "./components/store/store";

const store = setupStore();
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

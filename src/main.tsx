import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import App from "./App";
import "./index.css";
// ✅ Start MSW before rendering app
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./services/mocks/browser");
    await worker.start();
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
});
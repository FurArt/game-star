import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AlertProvider from "./context/AlertContext";
import GameProvider from "./context/GameProvider";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlertProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </AlertProvider>
  </React.StrictMode>
);

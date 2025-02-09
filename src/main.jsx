import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import ValentineInvite from "./sender.jsx";
import ValentineResponse from "./recipient.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <BrowserRouter> */}
    <Router>
      <Routes>
        <Route path="/" element={<ValentineInvite />} />
        <Route path="/invite/" element={<ValentineResponse />} />
      </Routes>
    </Router>
    {/* </BrowserRouter> */}
  </StrictMode>
);

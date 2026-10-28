import React from "react";
import { createRoot } from "react-dom/client";
import BookingPage from "./BookingPage.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BookingPage />
  </React.StrictMode>
);
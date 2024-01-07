// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import InquiryPage from "./pages/InquiryPage";
import TripDetailsPage from "./pages/TripDetailsPage";
import PaymentPage from "./pages/PaymentPage";
import { Provider } from "react-redux";
import store from "./store/index";
import "./App.css";

// root app component
const App: React.FC = () => {
  return (
    <Provider store={store}>
      {" "}
      {/* 1. wrapped the app with the Provider component and pass the store as a prop */}
      <Router>
        {" "}
        {/* 2. wrapped the app with the Router component */}
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/trip-details/:tripId" element={<TripDetailsPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

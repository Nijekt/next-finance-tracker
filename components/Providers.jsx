"use client";

import React from "react";
import { ToastContainer } from "react-toastify";

import AuthContextProvider from "@/lib/context/auth-context";
import FinanceContextProvider from "@/lib/context/finance-context";
const Providers = ({ children }) => {
  return (
    <AuthContextProvider>
      <FinanceContextProvider>
        <ToastContainer />
        {children}
      </FinanceContextProvider>
    </AuthContextProvider>
  );
};

export default Providers;

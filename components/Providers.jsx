"use client";
import AuthContextProvider from "@/lib/context/auth-context";
import FinanceContextProvider from "@/lib/context/finance-context";
import React from "react";
import { ToastContainer } from "react-toastify";

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

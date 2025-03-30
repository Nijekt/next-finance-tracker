"use client";
import FinanceContextProvider from "@/lib/context/finance-context";
import React from "react";

const Providers = ({ children }) => {
  return <FinanceContextProvider>{children}</FinanceContextProvider>;
};

export default Providers;

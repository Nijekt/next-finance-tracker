"use client";
import React, { createContext, useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const FinanceContext = createContext({
  income: [],
  addIncome: async () => {},
  deleteIncome: async () => {},
});

const FinanceContextProvider = ({ children }) => {
  const [income, setIncome] = useState([]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "income"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data()?.createdAt?.toDate()),
      }));

      setIncome(data);
    })();
  }, []);

  const addIncome = async (newIncome) => {
    try {
      const docRef = await addDoc(collection(db, "income"), newIncome);

      setIncome((prev) => {
        return [...prev, { id: docRef.id, ...newIncome }];
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
  const deleteIncome = async (id) => {
    try {
      await deleteDoc(doc(db, "income", id));

      setIncome((prev) => {
        return prev.filter((income) => income.id !== id);
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
  return (
    <FinanceContext.Provider value={{ income, addIncome, deleteIncome }}>
      {children}
    </FinanceContext.Provider>
  );
};

export default FinanceContextProvider;

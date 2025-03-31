"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth-context";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const FinanceContext = createContext({
  income: [],
  expenses: [],
  addIncome: async () => {},
  deleteIncome: async () => {},
  addExpense: async () => {},
  addCategory: async () => {},
  deleteExpense: async () => {},
  deleteExpenseCategory: async () => {},
});

const FinanceContextProvider = ({ children }) => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const incomeQuery = query(
        collection(db, "income"),
        where("uid", "==", user.uid)
      );

      const docIcnomeSnapshot = await getDocs(incomeQuery);

      const data = docIcnomeSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data()?.createdAt?.toDate()),
      }));

      setIncome(data);

      const expenseQuery = query(
        collection(db, "expenses"),
        where("uid", "==", user.uid)
      );

      const docExpensesSnapshot = await getDocs(expenseQuery);

      const dataExpenses = docExpensesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setExpenses(dataExpenses);
    })();
  }, [user]);

  const deleteExpenseCategory = async (id) => {
    try {
      const docRef = doc(db, "expenses", id);

      await deleteDoc(docRef);

      setExpenses((prev) => {
        const updatedExpenses = prev.filter((expense) => expense.id !== id);
        return [...updatedExpenses];
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteExpense = async (updatedExpense, expenseCategoryId) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);

      await updateDoc(docRef, { ...updatedExpense });

      setExpenses((prev) => {
        const updatedExpenses = [...prev];
        const pos = updatedExpenses.findIndex((expense) => {
          return expense.id === expenseCategoryId;
        });
        updatedExpenses[pos].items = [...updatedExpense.items];
        updatedExpenses[pos].total = updatedExpense.total;

        return updatedExpenses;
      });
    } catch (error) {
      throw error;
    }
  };

  const addCategory = async (category) => {
    try {
      const docSnap = await addDoc(collection(db, "expenses"), {
        uid: user.uid,
        ...category,
        items: [],
      });

      setExpenses((prev) => {
        return [
          ...prev,
          { id: docSnap.id, uid: user.uid, items: [], ...category },
        ];
      });
    } catch (error) {
      throw error;
    }
  };

  const addExpense = async (expenseCategoryId, newExpense) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);

      await updateDoc(docRef, { ...newExpense });

      setExpenses((prev) => {
        const updatedExpenses = [...prev];

        const foundIndex = updatedExpenses.findIndex((expense) => {
          return expense.id === expenseCategoryId;
        });
        updatedExpenses[foundIndex] = { id: expenseCategoryId, ...newExpense };

        return updatedExpenses;
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

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
    <FinanceContext.Provider
      value={{
        income,
        addIncome,
        deleteIncome,
        expenses,
        addExpense,
        addCategory,
        deleteExpense,
        deleteExpenseCategory,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export default FinanceContextProvider;

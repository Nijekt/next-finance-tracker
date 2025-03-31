"use client";
import { useState, useContext, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { currencyFormatter } from "@/lib/utils";
import { FinanceContext } from "@/lib/context/finance-context";
import ExpenseItem from "@/components/ExpenseItem";

import IncomeModal from "@/components/modals/IncomeModal";
import ExpensesModal from "@/components/modals/ExpensesModal";

import { AuthContext } from "@/lib/context/auth-context";
import SignIn from "@/components/SignIn";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpensesModal, setShowAddExpensesModal] = useState(false);
  const { expenses, income } = useContext(FinanceContext);

  const [balance, setBalance] = useState(0);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const newBalance =
      income.reduce((acc, item) => acc + item.amount, 0) -
      expenses.reduce((acc, item) => acc + item.total, 0);

    setBalance(newBalance);
  }, [expenses, income]);

  if (!user) {
    return <SignIn />;
  }

  return (
    <>
      <IncomeModal
        showAddIncomeModal={showAddIncomeModal}
        setShowAddIncomeModal={setShowAddIncomeModal}
      />
      <ExpensesModal
        showAddExpensesModal={showAddExpensesModal}
        setShowAddExpensesModal={setShowAddExpensesModal}
      />

      <main className="container max-w-2xl mx-auto px-6">
        <section className="py-3">
          <div className="text-gray-400 text-md">My Balance</div>
          <h2 className="text-3xl font-bold">{currencyFormatter(balance)}</h2>
        </section>
        <section className="flex gap-2 items-center py-3">
          <button
            onClick={() => setShowAddExpensesModal(true)}
            className="btn btn-primary"
          >
            + Expenses
          </button>
          <button
            onClick={() => setShowAddIncomeModal(true)}
            className="btn btn-primary-outline"
          >
            + Income
          </button>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-3 mt-6">
            {expenses.map((item) => (
              <ExpenseItem key={item.id} expense={item} />
            ))}
          </div>
        </section>

        <section className="py-6">
          <h3 className="text-2xl" id="stats">
            Stats
          </h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              className="w-[100px] h-[100px]"
              data={{
                labels: expenses.map((item) => item.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map((item) => item.total),
                    backgroundColor: expenses.map((item) => item.color),
                    borderColor: ["#18181b"],
                    borderWidth: 2,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}

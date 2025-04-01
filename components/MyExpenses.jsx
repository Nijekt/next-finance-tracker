import React from "react";
import ExpenseItem from "./ExpenseItem";

const MyExpenses = ({ expenses }) => {
  return (
    <section className="py-6">
      <h3 className="text-2xl">My Expenses</h3>
      <div className="flex flex-col gap-3 mt-6">
        {expenses.map((item) => (
          <ExpenseItem key={item.id} expense={item} />
        ))}
      </div>
    </section>
  );
};

export default MyExpenses;

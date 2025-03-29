import React from "react";
import { currencyFormatter } from "@/lib/utils";
const ExpenseItem = ({ title, amount, color }) => {
  return (
    <button>
      <div className="flex items-center justify-between p-4 bg-slate-700 rounded-3xl">
        <div className="flex items-center gap-2">
          <div
            className="w-[25px] h-[25px] rounded-full"
            style={{ backgroundColor: color }}
          />
          <h4>{title}</h4>
        </div>
        <p>{currencyFormatter(amount)}</p>
      </div>
    </button>
  );
};

export default ExpenseItem;

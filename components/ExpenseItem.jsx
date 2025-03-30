import React, { useState } from "react";
import { currencyFormatter } from "@/lib/utils";
import ViewExpenseModal from "./modals/ViewExpenseModal";
const ExpenseItem = ({ expense }) => {
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
  return (
    <>
      <ViewExpenseModal
        isOpen={showViewExpenseModal}
        setIsOpen={setShowViewExpenseModal}
        expense={expense}
      />
      <button onClick={() => setShowViewExpenseModal(true)}>
        <div className="flex items-center justify-between p-4 bg-slate-700 rounded-3xl">
          <div className="flex items-center gap-2">
            <div
              className="w-[25px] h-[25px] rounded-full"
              style={{ backgroundColor: expense.color }}
            />
            <h4>{expense.title}</h4>
          </div>
          <p>{currencyFormatter(expense.total)}</p>
        </div>
      </button>
    </>
  );
};

export default ExpenseItem;

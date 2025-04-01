import React, { useState, useContext, useRef } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import Modal from "../Modal";
import { FinanceContext } from "@/lib/context/finance-context";

const ExpensesModal = ({ showAddExpensesModal, setShowAddExpensesModal }) => {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const titleRef = useRef();
  const colorRef = useRef();

  const { expenses, addExpense, addCategory } = useContext(FinanceContext);

  const addExpenseHandler = async () => {
    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...expense.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    try {
      await addExpense(selectedCategory, newExpense);
      console.log(newExpense);
      setExpenseAmount("");
      setSelectedCategory(null);
      setShowAddExpensesModal();
      toast.success("Expense added successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const addCategoryHandler = async () => {
    const title = titleRef.current.value;
    const color = colorRef.current.value;

    try {
      await addCategory({ title, color, total: 0 });
      setShowAddExpense(false);
      toast.success("Category added successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  console.log("expenses", expenses);

  return (
    <Modal isOpen={showAddExpensesModal} setIsOpen={setShowAddExpensesModal}>
      <div className="input-group">
        <label htmlFor="">Enter an amount</label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter expenses amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
      </div>
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl capitalize">Select expense category</h3>
            <button
              onClick={() => setShowAddExpense(true)}
              className="text-lime-400"
            >
              + New Category
            </button>
          </div>

          {showAddExpense && (
            <div className="flex items-center justify-between">
              <input type="text" placeholder="Enter title" ref={titleRef} />

              <label htmlFor="">Pick Color</label>
              <input type="color" className="w-24 h-10" ref={colorRef} />
              <button
                onClick={addCategoryHandler}
                className="btn btn-primary-outline"
              >
                Create
              </button>
              <button
                onClick={() => setShowAddExpense(false)}
                className="btn btn-danger"
              >
                Cansel
              </button>
            </div>
          )}
          <div className="flex flex-col gap-2 pr-2 max-h-85  overflow-y-auto overflow-x-hidden scrollbar-hidden ">
            {expenses.map((expense) => (
              <button
                key={expense.id}
                onClick={() => setSelectedCategory(expense.id)}
                className="btn-category"
              >
                <div
                  style={{
                    boxShadow: expense.id === selectedCategory && "1px 1px 4px",
                  }}
                  className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{ backgroundColor: expense.color }}
                    />
                    <h4>{expense.title} </h4>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button className="btn btn-primary" onClick={addExpenseHandler}>
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
};

export default ExpensesModal;

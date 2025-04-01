import React, { useContext } from "react";
import { toast } from "react-toastify";

import Modal from "../Modal";

import { currencyFormatter } from "@/lib/utils";
import { FinanceContext } from "@/lib/context/finance-context";

import { FaRegTrashAlt } from "react-icons/fa";

const ViewExpenseModal = ({ isOpen, setIsOpen, expense }) => {
  const { deleteExpense, deleteExpenseCategory } = useContext(FinanceContext);

  const deleteExpenseCategoryHandler = async () => {
    try {
      await deleteExpenseCategory(expense.id);
      toast.success("Expense category deleted successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteExpenseHandler = async (item) => {
    const updatedItems = expense.items.filter((i) => i.id !== item.id);
    try {
      const updatedExpense = {
        items: [...updatedItems],
        total: expense.total - item.amount,
      };

      await deleteExpense(updatedExpense, expense.id);
      toast.success("Expense deleted successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">{expense.title}</h2>
        <button
          onClick={deleteExpenseCategoryHandler}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>

      <div>
        <h3 className="my-4 text-2xl">Expense History</h3>
        <div className="flex flex-col gap-2 pr-2 max-h-110 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {expense.items.map((item) => {
            return (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  {item.createdAt?.toMillis
                    ? new Date(item.createdAt.toMillis()).toISOString()
                    : item.createdAt.toISOString()}
                </div>

                <p className="flex items-center gap-2">
                  {currencyFormatter(item.amount)}
                  <button onClick={() => deleteExpenseHandler(item)}>
                    <FaRegTrashAlt />
                  </button>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ViewExpenseModal;

import React from "react";
import { useRef, useContext } from "react";
import { currencyFormatter } from "@/lib/utils";
import Modal from "@/components/Modal";

import { FinanceContext } from "@/lib/context/finance-context";
import { AuthContext } from "@/lib/context/auth-context";

import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const IncomeModal = ({ showAddIncomeModal, setShowAddIncomeModal }) => {
  const amountRef = useRef(0);
  const descriptionRef = useRef("");
  const { income, addIncome, deleteIncome } = useContext(FinanceContext);
  const { user } = useContext(AuthContext);

  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: Number(amountRef.current.value),
      description: descriptionRef.current.value,
      createdAt: new Date(),
      uid: user.uid,
    };

    try {
      await addIncome(newIncome);
      amountRef.current.value = "";
      descriptionRef.current.value = "";
      toast.success("Income added successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteIncomeHandler = async (id) => {
    try {
      await deleteIncome(id);
      toast.success("Income deleted successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal isOpen={showAddIncomeModal} setIsOpen={setShowAddIncomeModal}>
      <form className="input-group" onSubmit={addIncomeHandler}>
        <div className="input-group">
          <label htmlFor="amout">Income Amount</label>
          <input
            type="number"
            ref={amountRef}
            min={0.001}
            step={0.001}
            placeholder="Enter income amount"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="amout">Description</label>
          <input
            type="text"
            ref={descriptionRef}
            placeholder="Enter description"
            required
          />
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold">Income History</h3>
        <div className="flex flex-col gap-2 pr-2 max-h-60 max-sm:max-h-100 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {income.map((item) => (
            <div className="flex items-center justify-between" key={item.id}>
              <div>
                <p className="font-semibold">{item.description}</p>
                <div className="text-xs">{item.createdAt.toISOString()}</div>
              </div>
              <p className="flex items-center gap-2">
                {currencyFormatter(item.amount)}
                <button
                  onClick={() => {
                    deleteIncomeHandler(item.id);
                  }}
                >
                  {" "}
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default IncomeModal;

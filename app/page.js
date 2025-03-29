"use client";
import { useState, useRef, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { currencyFormatter } from "@/lib/utils";
import Modal from "@/components/Modal";
import ExpenseItem from "@/components/ExpenseItem";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

import { FaRegTrashAlt } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);
const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertaiment",
    amount: 1000,
    color: "yellow",
  },
  {
    id: 2,
    title: "Business",
    amount: 222,
    color: "brown",
  },
  {
    id: 3,
    title: "Gass",
    amount: 2000,
    color: "black",
  },
  {
    id: 4,
    title: "School",
    amount: 3000,
    color: "purple",
  },
];
export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [income, setIncome] = useState([]);
  const amountRef = useRef(0);
  const descriptionRef = useRef("");

  const addIncome = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, "income"), newIncome);

      setIncome((prev) => {
        return [...prev, { id: docRef.id, ...newIncome }];
      });

      amountRef.current.value = "";
      descriptionRef.current.value = "";
    } catch (error) {
      console.log(error.message);
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
    }
  };

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
  console.log(income);
  return (
    <>
      <Modal isOpen={showAddIncomeModal} setIsOpen={setShowAddIncomeModal}>
        <form className="input-group" onSubmit={addIncome}>
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
                    deleteIncome(item.id);
                  }}
                >
                  {" "}
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          ))}
        </div>
      </Modal>
      <main className="container max-w-2xl mx-auto px-6">
        <section className="py-3">
          <div className="text-gray-400 text-md">My Balance</div>
          <h2 className="text-3xl font-bold">{currencyFormatter(100000)}</h2>
        </section>
        <section className="flex gap-2 items-center py-3">
          <button className="btn btn-primary">+ Expenses</button>
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
            {DUMMY_DATA.map((item) => (
              <ExpenseItem
                key={item.id}
                title={item.title}
                amount={item.amount}
                color={item.color}
              />
            ))}
          </div>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              className="w-[100px] h-[100px]"
              data={{
                labels: DUMMY_DATA.map((item) => item.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: DUMMY_DATA.map((item) => item.amount),
                    backgroundColor: DUMMY_DATA.map((item) => item.color),
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

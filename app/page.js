"use client";
import ExpenseItem from "@/components/ExpenseItem";
import { currencyFormatter } from "@/lib/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

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
  return (
    <>
      <main className="container max-w-2xl mx-auto px-6">
        <section className="py-3">
          <div className="text-gray-400 text-md">My Balance</div>
          <h2 className="text-3xl font-bold">{currencyFormatter(100000)}</h2>
        </section>
        <section className="flex gap-2 items-center py-3">
          <button className="btn btn-primary">+ Expenses</button>
          <button className="btn btn-primary-outline">+ Income</button>
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

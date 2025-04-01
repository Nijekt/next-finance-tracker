import React from "react";
import { Doughnut } from "react-chartjs-2";

const Stats = ({ expenses }) => {
  return (
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
  );
};

export default Stats;

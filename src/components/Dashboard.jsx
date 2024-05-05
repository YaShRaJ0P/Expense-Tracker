import React from "react";
import GreenDollar from "../images/dollar-green.png";
import RedDollar from "../images/dollar-red.png";
import BlueDollar from "../images/dollar-blue.png";
import { Doughnut, Line } from "react-chartjs-2";
import "chart.js/auto";
import { useSelector } from "react-redux";
export const Dashboard = () => {
  const totalMoney = useSelector((state) => state.transaction);

  return (
    <>
      <div className="flex flex-col  justify-center items-center h-100vh w-screen">
        <div className="flex flex-row gap-5 flex-wrap">
          <div className="flex flex-row ">
            <div className=" bg-zinc-900 rounded-l-xl px-6 py-2 flex items-center justify-center">
              <img src={GreenDollar} alt="" className="size-10" />
            </div>
            <div className=" bg-stone-950 rounded-r-xl px-10 py-2">
              <h4 className="text-white text-sm font-light">Total Income</h4>
              <h3 className="text-white text-4xl font-black">
                {totalMoney.income}
              </h3>
            </div>
          </div>
          <div className="flex flex-row ">
            <div className=" bg-zinc-900 rounded-l-xl px-6 py-2 flex items-center justify-center">
              <img src={RedDollar} alt="" className="size-10" />
            </div>
            <div className=" bg-stone-950 rounded-r-xl px-10 py-2">
              <h4 className="text-white text-sm font-light">Total Expense</h4>
              <h3 className="text-white text-4xl font-black">
                {totalMoney.expense}
              </h3>
            </div>
          </div>
          <div className="flex flex-row ">
            <div className=" bg-[#1C212A] rounded-l-xl px-6 py-2 flex items-center justify-center">
              <img src={BlueDollar} alt="" className="size-10" />
            </div>
            <div className=" bg-[#151A23] rounded-r-xl px-10 py-2">
              <h4 className="text-white text-sm font-light">Total Balance</h4>
              <h3 className="text-white text-4xl font-black">
                {totalMoney.balance}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-row lg:flex-nowrap flex-wrap mt-6 w-full justify-between px-12 gap-4 ">
          <div className="bg-[#1C212A] rounded-2xl p-5">
            <p className="text-xl font-bold">Expense by Category</p>
            <Doughnut
              data={{
                labels: ["Red", "Blue", "Yellow"],
                datasets: [
                  {
                    label: "My First Dataset",
                    data: [300, 50, 100],
                    backgroundColor: [
                      "rgb(10, 102, 18)",
                      "rgb(54, 162, 235)",
                      "rgb(255, 205, 86)",
                      "rgb(100,100,100)",
                    ],
                    hoverOffset: 4,
                  },
                ],
              }}
            ></Doughnut>
          </div>
          <div className=" w-full  bg-[#1C212A] rounded-2xl p-5">
            <p className="text-xl font-bold">Income Vs Expense</p>
            <div className="grid place-items-center">
              <Line
                style={{ width: "100%" }}
                data={{
                  labels: ["Red", "Blue", "Yellow"],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: "#151A23",
                      borderColor: "rgb(255, 99, 132)",
                      data: [0, 10, 5, 2, 20, 30, 45],
                      borderDashOffset: 3,
                      borderJoinStyle: "round",
                      tension: 0.4,
                    },
                  ],
                  hoverOffset: 4,
                }}
              ></Line>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

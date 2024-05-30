import React from "react";
import GreenDollar from "../images/dollar-green.png";
import RedDollar from "../images/dollar-red.png";
import BlueDollar from "../images/dollar-blue.png";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { useSelector } from "react-redux";
export const Dashboard = () => {
  const transaction = useSelector((state) => state.transaction);
  const category = useSelector((state) => state.category);
  const categoryExpenditure = new Map(
    category.filter((cat) => cat.expenditure).map((cat) => [cat.id, 0])
  );
  transaction.transactions.forEach((txn) => {
    categoryExpenditure.set(
      txn.category,
      parseInt(categoryExpenditure.get(txn.category)) + parseInt(txn.amount)
    );
  });
  const categoryIncome = new Map(
    category.filter((cat) => !cat.expenditure).map((cat) => [cat.id, 0])
  );
  transaction.transactions.forEach((txn) => {
    categoryIncome.set(
      txn.category,
      parseInt(categoryIncome.get(txn.category)) + parseInt(txn.amount)
    );
  });
  return (
    <>
      <div className="flex flex-col justify-center items-center h-100vh w-screen py-4 text-center ">
        <div className="flex flex-row gap-5 flex-wrap">
          <div className="flex flex-row ">
            <div className=" bg-zinc-900 rounded-l-xl px-6 py-2 flex items-center justify-center">
              <img src={GreenDollar} alt="" className="size-10" />
            </div>
            <div className=" bg-stone-950 rounded-r-xl px-10 py-2">
              <h4 className="text-white text-sm font-light">Total Income</h4>
              <h3 className="text-white text-4xl font-black">
                {transaction.income}
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
                {transaction.expense}
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
                {transaction.balance}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-nowrap flex-wrap mt-6 w-full justify-between px-12 gap-4 ">
          <div className="flex flex-row gap-4 w-full justify-around">
            <div className="bg-[#1C212A] rounded-2xl p-5">
              <p className="text-xl font-bold">Expense by Income</p>
              <Doughnut
                data={{
                  labels: category
                    .filter((category) => {
                      return category.expenditure === false;
                    })
                    .map((category) => {
                      return category.title;
                    }),
                  datasets: [
                    {
                      data: Array.from(categoryIncome.values()),
                      backgroundColor: [
                        "#FF6347",
                        "#FFD700",
                        "#1E90FF",
                        "#32CD32",
                        "#8A2BE2",
                        "#FF4500",
                        "#DA70D6",
                        "#20B2AA",
                        "#FF1493",
                        "#00CED1",
                        "#9400D3",
                        "#FF7F50",
                        "#6A5ACD",
                        "#48D1CC",
                        "#FF69B4",
                        "#8B0000",
                        "#00FF7F",
                        "#B22222",
                        "#ADFF2F",
                        "#00BFFF",
                        "#FF8C00",
                        "#FF00FF",
                        "#7FFF00",
                        "#FF6347",
                        "#8A2BE2",
                        "#5F9EA0",
                        "#7CFC00",
                        "#00FA9A",
                        "#BA55D3",
                        "#7B68EE",
                        "#FF4500",
                        "#FFA07A",
                        "#FFD700",
                        "#00FF7F",
                        "#20B2AA",
                        "#1E90FF",
                        "#32CD32",
                        "#FF1493",
                        "#DA70D6",
                        "#00CED1",
                        "#FF69B4",
                        "#8B0000",
                        "#00BFFF",
                        "#ADFF2F",
                        "#9400D3",
                        "#FF7F50",
                        "#6A5ACD",
                        "#48D1CC",
                        "#B22222",
                        "#FF8C00",
                        "#FF00FF",
                        "#7FFF00",
                        "#5F9EA0",
                        "#7CFC00",
                        "#00FA9A",
                        "#BA55D3",
                        "#7B68EE",
                        "#FFA07A",
                        "#20B2AA",
                        "#32CD32",
                        "#FF1493",
                        "#1E90FF",
                        "#FF69B4",
                        "#8A2BE2",
                        "#DA70D6",
                        "#00CED1",
                        "#FF6347",
                        "#FFD700",
                        "#9400D3",
                        "#FF4500",
                        "#7FFF00",
                        "#00BFFF",
                        "#ADFF2F",
                        "#8B0000",
                        "#FF8C00",
                        "#B22222",
                        "#00FF7F",
                        "#48D1CC",
                        "#FF7F50",
                        "#6A5ACD",
                        "#FF00FF",
                        "#7B68EE",
                        "#7CFC00",
                        "#00FA9A",
                        "#BA55D3",
                        "#FFA07A",
                        "#20B2AA",
                        "#1E90FF",
                        "#32CD32",
                        "#FF6347",
                        "#FFD700",
                        "#9400D3",
                        "#FF1493",
                        "#FF4500",
                        "#DA70D6",
                        "#00CED1",
                        "#FF69B4",
                        "#8B0000",
                        "#00FF7F",
                        "#B22222",
                      ],
                      hoverOffset: 4,
                    },
                  ],
                }}
              ></Doughnut>
            </div>
            <div className="bg-[#1C212A] rounded-2xl p-5">
              <p className="text-xl font-bold">Expense by Category</p>
              <Doughnut
                data={{
                  labels: category
                    .filter((category) => {
                      return category.expenditure === true;
                    })
                    .map((category) => {
                      return category.title;
                    }),
                  datasets: [
                    {
                      data: Array.from(categoryExpenditure.values()),
                      backgroundColor: [
                        "#FF6347",
                        "#FFD700",
                        "#1E90FF",
                        "#32CD32",
                        "#8A2BE2",
                        "#FF4500",
                        "#DA70D6",
                        "#20B2AA",
                        "#FF1493",
                        "#00CED1",
                        "#9400D3",
                        "#FF7F50",
                        "#6A5ACD",
                        "#48D1CC",
                        "#FF69B4",
                        "#8B0000",
                        "#00FF7F",
                        "#B22222",
                        "#ADFF2F",
                        "#00BFFF",
                        "#FF8C00",
                        "#FF00FF",
                        "#7FFF00",
                        "#FF6347",
                        "#8A2BE2",
                        "#5F9EA0",
                        "#7CFC00",
                        "#00FA9A",
                        "#BA55D3",
                        "#7B68EE",
                        "#FF4500",
                        "#FFA07A",
                        "#FFD700",
                        "#00FF7F",
                        "#20B2AA",
                        "#1E90FF",
                        "#32CD32",
                        "#FF1493",
                        "#DA70D6",
                        "#00CED1",
                        "#FF69B4",
                        "#8B0000",
                        "#00BFFF",
                        "#ADFF2F",
                        "#9400D3",
                        "#FF7F50",
                        "#6A5ACD",
                        "#48D1CC",
                        "#B22222",
                        "#FF8C00",
                        "#FF00FF",
                        "#7FFF00",
                        "#5F9EA0",
                        "#7CFC00",
                        "#00FA9A",
                        "#BA55D3",
                        "#7B68EE",
                        "#FFA07A",
                        "#20B2AA",
                        "#32CD32",
                        "#FF1493",
                        "#1E90FF",
                        "#FF69B4",
                        "#8A2BE2",
                        "#DA70D6",
                        "#00CED1",
                        "#FF6347",
                        "#FFD700",
                        "#9400D3",
                        "#FF4500",
                        "#7FFF00",
                        "#00BFFF",
                        "#ADFF2F",
                        "#8B0000",
                        "#FF8C00",
                        "#B22222",
                        "#00FF7F",
                        "#48D1CC",
                        "#FF7F50",
                        "#6A5ACD",
                        "#FF00FF",
                        "#7B68EE",
                        "#7CFC00",
                        "#00FA9A",
                        "#BA55D3",
                        "#FFA07A",
                        "#20B2AA",
                        "#1E90FF",
                        "#32CD32",
                        "#FF6347",
                        "#FFD700",
                        "#9400D3",
                        "#FF1493",
                        "#FF4500",
                        "#DA70D6",
                        "#00CED1",
                        "#FF69B4",
                        "#8B0000",
                        "#00FF7F",
                        "#B22222",
                      ],
                      hoverOffset: 4,
                    },
                  ],
                }}
              ></Doughnut>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

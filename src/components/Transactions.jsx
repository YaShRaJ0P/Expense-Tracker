import React, { useState } from "react";
import edit from "../images/edit.png";
import bin from "../images/delete.png";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  editTransaction,
  removeTransaction,
} from "../utils/state/transaction";
import { ref, remove, push, set, update } from "firebase/database";
import { database } from "../utils/firebaseConfig";
export const Transactions = () => {
  const [transaction, setTransaction] = useState({
    id: "",
    amount: "",
    description: "",
    date: "",
    category: "",
    expenditure: false,
  });
  const [newTransaction, setnewTransaction] = useState(false);
  const [editable, seteditable] = useState(false);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);

  const addTransactionFunction = () => {
    setnewTransaction(!newTransaction);
    seteditable(false);
    setTransaction({
      id: "",
      amount: "",
      description: "",
      date: "",
      category: "",
      expenditure: false,
    });
  };
  const categories = useSelector((state) => state.category);
  const transactionLists = useSelector(
    (state) => state.transaction.transactions
  );
  const changeDate = (e) => {
    var d = new Date();
    var newd = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    if (e.target.checked) {
      setTransaction({
        ...transaction,
        date: newd.toISOString().substring(0, 16),
      });
      document.getElementById("Date").disabled = true;
    } else {
      setTransaction({
        ...transaction,
        date: null,
      });
      document.getElementById("Date").disabled = false;
    }
  };
  const removeTransactionFunction = (transaction) => {
    remove(ref(database, "users/" + uid + "/transactions/" + transaction.id));
    dispatch(removeTransaction(transaction));
  };
  const dispatchTransaction = (e) => {
    e.preventDefault();
    setnewTransaction(false);
    const transactionRef = ref(database, "users/" + uid + "/transactions/");
    const newTransactionRef = push(transactionRef);
    if (!editable) {
      set(newTransactionRef, {
        ...transaction,
        id: newTransactionRef.key,
      });
      dispatch(addTransaction({...transaction,id:newTransactionRef.key}));
    } else {
      const transactionRef = ref(
        database,
        "users/" + uid + "/transactions/" + transaction.id
      );
      update(transactionRef, transaction);
      dispatch(editTransaction(transaction));
      seteditable(false);
    }
    setTransaction({
      id: "",
      amount: "",
      description: "",
      date: "",
      category: "",
      expenditure: false,
    });
  };
  const editFunction = (transaction) => {
    seteditable(true);
    setnewTransaction(true);
    setTransaction({
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date,
      category: transaction.category,
      expenditure: transaction.expenditure,
    });
  };

  return (
    <>
      <div className="grid place-items-center w-screen px-24 max-lg:px-8">
        <div className="w-full">
          <div className="flex justify-between flex-row w-[73.8%]">
            <h3 className="font-bold text-lg">
              {newTransaction || editable
                ? "Create a New Transaction"
                : "Transactions"}
            </h3>
            <button
              className={`${
                newTransaction || editable ? "bg-red-500" : "bg-green-500"
              } p-3 ${
                newTransaction || editable
                  ? "hover:bg-red-600"
                  : "hover:bg-green-600"
              } rounded-[3px] font-semibold text-base`}
              onClick={addTransactionFunction}
            >
              {newTransaction || editable ? (
                <span style={{ fontSize: "19px" }}>&#10799;</span>
              ) : (
                <span style={{ fontSize: "19px" }}>+</span>
              )}
              {newTransaction || editable ? " Cancel" : " New Transaction"}
            </button>
          </div>
          <div className="mt-4 w-full flex flex-row gap-4">
            {!(newTransaction || editable) ? (
              <div className="flex flex-col w-full">
                <div>
                  <div className="w-full flex flex-row p-3 font-semibold text-lg bg-[#242B33] rounded-t-[4px] ">
                    <div className="w-1/2">Category</div>
                    <div className="w-1/6">Date</div>
                    <div className="w-1/6">Amount</div>
                    <div className="w-1/6 flex justify-center">Actions</div>
                  </div>
                  <div>
                    {transactionLists?.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="w-full flex flex-row p-3 font-normal text-sm bg-[#151A23] rounded-b-[4px]"
                      >
                        <div className="w-1/2 flex self-center">
                          {
                            categories.find(
                              (cat) => cat.id === transaction.category
                            )?.icon
                          }
                          {
                            categories.find(
                              (cat) => cat.id === transaction.category
                            )?.title
                          }
                        </div>
                        <div className="w-1/6 flex justify-start">
                          {transaction.date?.slice(0, 10)}
                        </div>
                        <div className="w-1/6 flex justify-start">
                          {transaction.amount}
                        </div>
                        <div className="w-1/6 flex self-center gap-3 justify-center">
                          <div>
                            <img
                              src={edit}
                              alt=""
                              width="22px"
                              height="22px"
                              onClick={() => editFunction(transaction)}
                            />
                          </div>
                          <div>
                            <img
                              src={bin}
                              alt=""
                              width="24px"
                              height="24px"
                              onClick={() =>
                                removeTransactionFunction(transaction)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div></div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-full p-8 gap-2 bg-[#222B38]">
                <form
                  className="flex gap-2 flex-col"
                  onSubmit={(e) => dispatchTransaction(e)}
                >
                  <div className="flex flex-col ">
                    <div className="flex flex-row justify-between">
                      <label htmlFor="Date">Date</label>
                      <div className="flex flex-row gap-2 justify-center items-center">
                        <input
                          type="checkbox"
                          name="Now"
                          id="Now"
                          onChange={changeDate}
                        />
                        <label htmlFor="Now">Now</label>
                      </div>
                    </div>
                    <input
                      required
                      value={transaction.date}
                      onChange={(e) => {
                        setTransaction({
                          ...transaction,
                          date: e.target.value,
                        });
                      }}
                      type="datetime-local"
                      name="Date"
                      id="Date"
                      className=" placeholder-shown:text-white w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2"
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="Category">Category</label>
                    <select
                      defaultValue=""
                      required
                      onChange={(e) => {
                        setTransaction({
                          ...transaction,
                          category: e.target.value,
                          expenditure: categories.find(
                            (category) => category.id === e.target.value
                          ).expenditure,
                        });
                      }}
                      value={transaction.category}
                      name="Category"
                      id="Category"
                      className=" w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2"
                    >
                      <option value="" disabled hidden>
                        Select a Category
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.icon}&nbsp; {category.title}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {category.expenditure ? "🔴" : "🟢"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="Amount">Amount</label>
                    <input
                      required
                      value={transaction.amount}
                      onChange={(e) =>
                        setTransaction({
                          ...transaction,
                          amount: e.target.value,
                        })
                      }
                      type="number"
                      name="Amount"
                      id="Amount"
                      onKeyDown={(evt) =>
                        ["e", "E", "+", "-"].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      className=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="Note">Note</label>
                    <textarea
                      value={transaction.description}
                      onChange={(e) =>
                        setTransaction({
                          ...transaction,
                          description: e.target.value,
                        })
                      }
                      name="Note"
                      id="Note"
                      className=" resize-y w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2"
                    ></textarea>
                  </div>
                  <div>
                    <button className="bg-green-600 px-2 py-1 hover:bg-green-700 rounded-[3px] font-semibold text-base">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
            <div className="w-1/3 bg-[#151A23] grid place-items-center ">
              <lord-icon
                src="https://cdn.lordicon.com/yrbmguoo.json"
                trigger="loop"
                delay="600"
                colors="primary:white"
                style={{ width: "150px", height: "150px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

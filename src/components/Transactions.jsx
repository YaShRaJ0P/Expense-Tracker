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
  const [showDescription, setShowDescription] = useState(null);
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
      dispatch(addTransaction({ ...transaction, id: newTransactionRef.key }));
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

  const handleTransactionClick = (transaction) => {
    setShowDescription(transaction.id);
  };

  const closeDescriptionModal = () => {
    setShowDescription(null);
  };

  return (
    <div className="grid place-items-center w-screen px-4 lg:px-24">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="flex justify-between flex-row w-full items-center">
          <h3 className="font-bold text-xl text-gray-300">
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
            } rounded-lg font-semibold text-white text-base`}
            onClick={addTransactionFunction}
          >
            {newTransaction || editable ? (
              <span className="text-2xl">&#10799;</span>
            ) : (
              <span className="text-2xl">+</span>
            )}
            {newTransaction || editable ? " Cancel" : " New Transaction"}
          </button>
        </div>
        <div className="mt-4 w-full flex flex-row gap-4">
          {!(newTransaction || editable) ? (
            <div className="flex flex-col w-full">
              <div>
                <div className="w-full flex flex-row p-4 font-semibold text-lg bg-gray-800 text-gray-300 rounded-t-lg justify-around">
                  <div className="w-2/5">Category</div>
                  <div className="w-1/5">Date</div>
                  <div className="w-1/5">Amount</div>
                  <div className="w-1/5">Actions</div>
                </div>
                <div>
                  {transactionLists?.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="w-full flex flex-row p-4 font-normal text-sm bg-gray-900 text-gray-400 rounded-b-lg justify-around hover:bg-gray-700 hover:cursor-pointer"
                      onClick={() => handleTransactionClick(transaction)}
                    >
                      <div className="w-2/5 flex self-center">
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
                      <div className="w-1/5 flex justify-start">
                        {transaction.date?.slice(0, 10)}
                      </div>
                      <div className="w-1/5 flex justify-center">
                        {transaction.amount}
                      </div>
                      <div className="w-1/5 flex self-center gap-3 justify-start">
                        <div>
                          <img
                            src={edit}
                            alt=""
                            width="22px"
                            height="22px"
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              editFunction(transaction);
                            }}
                          />
                        </div>
                        <div>
                          <img
                            src={bin}
                            alt=""
                            width="24px"
                            height="24px"
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTransactionFunction(transaction);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full p-8 gap-4 bg-gray-800 rounded-lg">
              <form
                className="flex gap-4 flex-col"
                onSubmit={(e) => dispatchTransaction(e)}
              >
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between">
                    <label htmlFor="Date" className="text-gray-300">
                      Date
                    </label>
                    <div className="flex flex-row gap-2 justify-center items-center">
                      <input
                        type="checkbox"
                        name="Now"
                        id="Now"
                        onChange={changeDate}
                        className="accent-green-500"
                      />
                      <label htmlFor="Now" className="text-gray-300">
                        Now
                      </label>
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
                    className="w-full bg-gray-700 text-white rounded-md border border-gray-600 p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="Category" className="text-gray-300">
                    Category
                  </label>
                  <select
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
                <div className="flex flex-col">
                  <label htmlFor="Amount" className="text-gray-300">
                    Amount
                  </label>
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
                    className="w-full bg-gray-700 text-white rounded-md border border-gray-600 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="Note" className="text-gray-300">
                    Note
                  </label>
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
                    className="w-full bg-gray-700 text-white rounded-md border border-gray-600 p-2"
                  ></textarea>
                </div>
                <div>
                  <button className="bg-green-600 px-4 py-2 hover:bg-green-700 rounded-md font-semibold text-white">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      {showDescription && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-4 rounded-lg w-11/12 max-w-md">
            <h3 className="text-white text-lg font-semibold mb-4">
              Transaction Description
            </h3>
            <p className="text-gray-300">
              {
                transactionLists.find(
                  (transaction) => transaction.id === showDescription
                ).description
              }
            </p>
            <button
              className="bg-red-500 px-4 py-2 mt-4 hover:bg-red-600 rounded-md font-semibold text-white"
              onClick={closeDescriptionModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

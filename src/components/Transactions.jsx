import React, { useRef, useState } from "react";
import edit from "../images/edit.png";
import bin from "../images/delete.png";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction, editTransaction, removeTransaction } from "../utils/transaction";
export const Transactions = () => {
    const [newTransaction, setnewTransaction] = useState(false);
    const [editable, seteditable] = useState(false);
    const [id, setid] = useState(null);
    const TitleRef = useRef(null);
    const AmountRef = useRef(null)
    const DescriptionRef = useRef(null);
    const DateRef = useRef(null);
    const CategoryRef = useRef(null);
    const dispatch = useDispatch();
    const addTransactionFunction = () => {
        setnewTransaction(!newTransaction);
        seteditable(false);
    };
    const category = useSelector(state => state.category);
    const transaction = useSelector(state => state.transaction);
    const changeDate = (e) => {
        var d = new Date();
        var newd = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
        if (e.target.checked) {
            document.getElementById("Date").value = newd.toISOString().substring(0, 16);
            document.getElementById("Date").disabled = true;
        }
        else {
            document.getElementById("Date").value = null;
            document.getElementById("Date").disabled = false;
        }
    }
    const removeTransactionFunction = (id) => {
        dispatch(removeTransaction(id));
    }
    const dispatchTransaction = (e) => {
        e.preventDefault();
        setnewTransaction(false);
        if (!editable) dispatch(addTransaction({ date: DateRef.current.value, amount: AmountRef.current.value, description: DescriptionRef.current.value, title: TitleRef.current.value, category: CategoryRef.current.value }));
        else {
            dispatch(editTransaction({ title: TitleRef.current.value, amount: AmountRef.current.value, description: DescriptionRef.current.value, date: DateRef.current.value, category: CategoryRef.current.value, id: id }));
            seteditable(false);
        }
    }
    return (
        <div className="grid place-items-center w-screen px-24 max-lg:px-8">
            <div className="w-full">
                <div className="flex justify-between flex-row w-[73.8%]">
                    <h3 className="font-bold text-lg">{newTransaction || editable ? "Create a New Transaction" : "Transactions"}</h3>
                    <button
                        className={`bg-${newTransaction || editable ? "red" : "green"}-500 p-3 hover:bg-${newTransaction || editable ? "red" : "green"
                            }-600 rounded-[3px] font-semibold text-base`}
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
                                    {transaction.map((transaction) => (
                                        <div key={transaction.id} className="w-full flex flex-row p-3 font-normal text-sm bg-[#151A23]">
                                            <div className="w-1/2 flex self-center">{transaction.title}</div>
                                            <div className="w-1/6 flex justify-start">
                                                {transaction.date.slice(0, 10)}
                                            </div>
                                            <div className="w-1/6 flex justify-start">
                                                {transaction.amount}
                                            </div>
                                            <div className="w-1/6 flex self-center gap-3 justify-center">
                                                <div>
                                                    <img src={edit} alt="" width="22px" height="22px" onClick={() => { seteditable(true); setnewTransaction(true); setid(transaction.id) }} />
                                                </div>
                                                <div>
                                                    <img src={bin} alt="" width="24px" height="24px" onClick={() => removeTransactionFunction(transaction.id)} />
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
                            <form className="flex gap-2 flex-col" onSubmit={(e) => dispatchTransaction(e)}>
                                <div className="flex flex-col ">
                                    <div>
                                        <label htmlFor="Title">Title</label>
                                        <input required ref={TitleRef} name="Title" id="Title" type="text" className=" w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2" ></input>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <label htmlFor="Date">Date</label>
                                        <div>
                                            <input type="checkbox" name="Now" id="Now" onChange={changeDate} />
                                            <label htmlFor="Now">Now</label>
                                        </div>
                                    </div>
                                    <input required ref={DateRef} type="datetime-local" name="Date" id="Date" className=" placeholder-shown:text-white w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2" />
                                </div>
                                <div className="flex flex-col ">
                                    <label htmlFor="Category">Category</label>
                                    <select required ref={CategoryRef} name="Category" id="Category" className=" w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2">
                                        {category.map((category) => (
                                            <option key={category.id} value={category.title} >
                                                {category.icon} {category.title}{"                             "}
                                                {category.expenditure ? "🔴" : "🟢"}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col ">
                                    <label htmlFor="Amount">Amount</label>
                                    <input required ref={AmountRef} type="number" name="Amount" id="Amount" onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                        className=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2" />
                                </div>
                                <div>
                                    <label htmlFor="Note">Note</label>
                                    <textarea ref={DescriptionRef} name="Note" id="Note" className=" resize-y w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2" ></textarea>
                                </div>
                                <div>
                                    <button className="bg-green-500 px-2 py-1 hover:bg-green-600 rounded-[3px] font-semibold text-base">Submit</button>
                                </div>
                            </form>
                        </div>
                    )}
                    <div className="w-1/3 bg-[#151A23] grid place-items-center">
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
    );
};

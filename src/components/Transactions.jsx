import React, { useState } from "react";
import edit from "../images/edit.png";
import bin from "../images/delete.png";
import "../index.css";
export const Transactions = () => {
    const [newTransaction, setnewTransaction] = useState(false);
    const [income, setincome] = useState(true)
    const addTransaction = () => {
        setnewTransaction(!newTransaction);
    };
    const changeDate = (e) => {
        var d = new Date();
        var newd = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
        if (e.target.checked) {
            document.getElementById("Date").value = newd.toISOString().substring(0,16);
            document.getElementById("Date").disabled=true;
        }
        else{
            document.getElementById("Date").value = null;
            document.getElementById("Date").disabled=false;
        }
    }
    return (
        <div className="grid place-items-center w-screen px-24 max-lg:px-8">
            <div className="w-full">
                <div className="flex justify-between flex-row w-[73.8%]">
                    <h3 className="font-bold text-lg">{newTransaction ? "Create a New Transaction" : "Transactions"}</h3>
                    <button
                        className={`bg-${newTransaction ? "red" : "green"}-500 p-3 hover:bg-${newTransaction ? "red" : "green"
                            }-600 rounded-[3px] font-semibold text-base`}
                        onClick={addTransaction}
                    >
                        {newTransaction ? (
                            <span style={{ fontSize: "19px" }}>&#10799;</span>
                        ) : (
                            <span style={{ fontSize: "19px" }}>+</span>
                        )}
                        {newTransaction ? " Cancel" : " New Transaction"}
                    </button>
                </div>
                <div className="mt-4 w-full flex flex-row gap-4">
                    {!newTransaction ? (
                        <div className="flex flex-col w-full">
                            <div>
                                <div className="w-full flex flex-row p-3 font-semibold text-lg bg-[#242B33] rounded-t-[4px] ">
                                    <div className="w-1/2">Category</div>
                                    <div className="w-1/6">Date</div>
                                    <div className="w-1/6">Amount</div>
                                    <div className="w-1/6 flex justify-center">Actions</div>
                                </div>
                                <div>
                                    <div className="w-full flex flex-row p-3 font-normal text-sm bg-[#151A23]">
                                        <div className="w-1/2 flex self-center">Transaction</div>
                                        <div className="w-1/6 flex justify-start">
                                            16-Jan-2024
                                        </div>
                                        <div className="w-1/6 flex justify-start">
                                            <div className="bg-red-500 rounded-[4px] px-3 pb-[4px] w-18">
                                                Expense
                                            </div>
                                        </div>
                                        <div className="w-1/6 flex self-center gap-3 justify-center">
                                            <div>
                                                <img src={edit} alt="" width="22px" height="22px" />
                                            </div>
                                            <div>
                                                <img src={bin} alt="" width="24px" height="24px" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-row p-3 font-normal text-sm bg-[#151A23]">
                                        <div className="w-3/5 flex self-center">Transaction</div>
                                        <div className="w-1/5 flex justify-start">
                                            <div className="bg-red-500 rounded-[4px] px-3 pb-[4px] w-18">
                                                Expense
                                            </div>
                                        </div>
                                        <div className="w-1/5 flex self-center">
                                            <div>
                                                <img src="" alt="" />
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-row p-3 font-normal text-sm bg-[#151A23]">
                                        <div className="w-3/5 flex self-center">Transaction</div>
                                        <div className="w-1/5 flex justify-start">
                                            <div className="bg-red-500 rounded-[4px] px-3 pb-[4px] w-18">
                                                Expense
                                            </div>
                                        </div>
                                        <div className="w-1/5 flex self-center">
                                            <div>
                                                <img src="" alt="" />
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-row p-3 font-normal text-sm bg-[#151A23]">
                                        <div className="w-3/5 flex self-center">Transaction</div>
                                        <div className="w-1/5 flex justify-start">
                                            <div className="bg-red-500 rounded-[4px] px-3 pb-[4px] w-18">
                                                Expense
                                            </div>
                                        </div>
                                        <div className="w-1/5 flex self-center">
                                            <div>
                                                <img src="" alt="" />
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-row p-3 font-normal text-sm bg-[#151A23]">
                                        <div className="w-3/5 flex self-center">Transaction</div>
                                        <div className="w-1/5 flex justify-start">
                                            <div className="bg-red-500 rounded-[4px] px-3 pb-[4px] w-18">
                                                Expense
                                            </div>
                                        </div>
                                        <div className="w-1/5 flex self-center">
                                            <div>
                                                <img src="" alt="" />
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col w-full p-8 gap-2 bg-[#222B38]">
                            <div className="flex flex-row">
                                <button onClick={() => { setincome(true) }} className={`w-1/2 bg-${income ? 'white' : '[#151A23]'} text-${!income ? 'white' : '[#151A23]'} py-1 rounded-l-sm border-white border-2 flex justify-center align-items-center`}>Expense</button>
                                <button onClick={() => { setincome(false) }} className={`w-1/2 bg-${!income ? 'white' : '[#151A23]'} text-${income ? 'white' : '[#151A23]'} py-1 rounded-r-sm border-white border-2 flex justify-center align-items-center`}>Income</button>
                            </div>
                            <form action="" className="flex  gap-2 flex-col">
                                <div className="flex flex-col ">
                                    <div className="flex flex-row justify-between">
                                        <label htmlFor="Date">Date</label>
                                        <div>
                                            <input type="checkbox" name="Now" id="Now" onChange={changeDate} />
                                            <label htmlFor="Now">Now</label>
                                        </div>
                                    </div>
                                    <input type="datetime-local" name="Date" id="Date" className=" placeholder-shown:text-white w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2" />
                                </div>
                                <div className="flex flex-col ">
                                    <label htmlFor="Category">Category</label>
                                    <select name="Category" id="Category" className=" w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2">
                                        <option value="Food" className=" w-full bg-[#212429] hover:bg-slate-950 border-white border-[1px] text-white p-2">Food</option>
                                        <option value="Travel" className=" w-full bg-[#212429] hover:bg-slate-950 border-white border-[1px] text-white p-2">Travel</option>
                                    </select>
                                </div>
                                <div className="flex flex-col ">
                                    <label htmlFor="Amount">Amount</label>
                                    <input type="number" name="Amount" id="Amount" onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                        className=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2" />
                                </div>
                                <div>
                                    <label htmlFor="Note">Note</label>
                                    <textarea name="Note" id="Note" className=" resize-y w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2" ></textarea>
                                </div>
                                <div>
                                    <button onClick={(e) => { e.preventDefault() }} className="bg-green-500 px-2 py-1 hover:bg-green-600 rounded-[3px] font-semibold text-base">Submit</button>
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

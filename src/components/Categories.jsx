import React, { useState } from "react";
import edit from "../images/edit.png";
import bin from "../images/delete.png";
export const Categories = () => {
    const [newCategory, setnewCategory] = useState(false);
    const [income, setincome] = useState(true)
    const addCategory = () => {
        setnewCategory(!newCategory);
    };
    return (
        <div className="grid place-items-center w-screen px-24 max-lg:px-8">
            <div className="w-full">
                <div className="flex justify-between flex-row w-3/5">
                    <h3 className="font-bold text-lg">{newCategory ? "Create a New Category" : "Categories"}</h3>
                    <button
                        className={`bg-${newCategory ? "red" : "green"}-500 p-3 hover:bg-${newCategory ? "red" : "green"
                            }-600 rounded-[3px] font-semibold text-base`}
                        onClick={addCategory}
                    >
                        {newCategory ? (
                            <span style={{ fontSize: "19px" }}>&#10799;</span>
                        ) : (
                            <span style={{ fontSize: "19px" }}>+</span>
                        )}
                        {newCategory ? " Cancel" : " New Category"}
                    </button>
                </div>
                <div className="mt-4 w-full flex flex-row gap-4">
                    {!newCategory ? (
                        <div className="flex flex-col w-3/5">
                            <div>
                                <div className="w-full flex flex-row p-3 font-semibold text-lg bg-[#242B33] rounded-t-[4px] ">
                                    <div className="w-3/5">Category</div>
                                    <div className="w-1/5 px-4">Type</div>
                                    <div className="w-1/5 flex justify-center">Actions</div>
                                </div>
                                <div>
                                    <div className="w-full flex flex-row p-3 font-normal text-sm bg-[#151A23]">
                                        <div className="w-3/5 flex self-center">Category</div>
                                        <div className="w-1/5 flex justify-start">
                                            <div className="bg-red-500 rounded-[4px] px-3 pb-[4px] w-18">
                                                Expense
                                            </div>
                                        </div>
                                        <div className="w-1/5 flex self-center gap-3 justify-center">
                                            <div>
                                                <img src={edit} alt="" width="22px" height="22px" />
                                            </div>
                                            <div>
                                                <img src={bin} alt="" width="24px" height="24px" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-row p-3 font-normal text-sm bg-[#151A23]">
                                        <div className="w-3/5 flex self-center">Category</div>
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
                                        <div className="w-3/5 flex self-center">Category</div>
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
                                        <div className="w-3/5 flex self-center">Category</div>
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
                                        <div className="w-3/5 flex self-center">Category</div>
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
                        <div className="flex flex-col w-3/5 p-8 gap-6 bg-[#222B38]">
                            <div className="flex flex-row">
                                <button onClick={() => { setincome(true) }} className={`w-1/2 bg-${income ? "white" : "[#151A23]"} text-${!income ? "white" : "[#151A23]"} py-1 rounded-l-sm border-white border-2 flex justify-center align-items-center`}>Expense</button>
                                <button onClick={() => { setincome(false) }} className={`w-1/2 bg-${!income ? "white" : "[#151A23]"} text-${income ? "white" : "[#151A23]"} py-1 rounded-r-sm border-white border-2 flex justify-center align-items-center`}>Income</button>
                            </div>
                            <form action="" className="flex  gap-6 flex-col">

                                <div className="flex flex-col ">
                                    <label htmlFor="Title">Title</label>
                                    <input type="text" name="Title" id="Title" className="w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2" />
                                </div>
                                <div>
                                    <label htmlFor="Icon">Icon</label>
                                    <input type="text" name="Icon" id="Icon" className="w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2" />
                                </div>
                                <div>
                                    <button onClick={(e) => { e.preventDefault() }} className="bg-green-500 px-2 py-1 hover:bg-green-600 rounded-[3px] font-semibold text-base">Submit</button>
                                </div>
                            </form>
                        </div>
                    )}
                    <div className="w-2/5 bg-[#151A23] grid place-items-center">
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

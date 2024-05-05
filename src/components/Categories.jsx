import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import edit from "../images/edit.png";
import bin from "../images/delete.png";
import { addCategory, editCategory, removeCategory } from "../utils/category";
import app from "../utils/firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
export const Categories = () => {
    const [newCategory, setnewCategory] = useState(false);
    const [expenditure, setexpenditure] = useState(true);
    const [editable, seteditable] = useState(false);
    const [id, setid] = useState("");
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const addCategoryFunction = () => {
        setnewCategory(!newCategory);
        seteditable(false);
    };
    const removeCategoryFunction = (id) => {
        dispatch(removeCategory(id));
    }
    const dispatchCategory = async (e) => {
        const db = getDatabase(app);
        e.preventDefault();
        if (!title.trim() || !icon.trim()) {
            return;
        }
        setnewCategory(false);
        if (!editable) {
            const newDocRef = push(ref(db, "categories"));
            set(newDocRef, {
                title: title,
                icon: icon,
                expenditure: expenditure
            }).then(() => {
                alert("Category added successfully");
            }).catch((error) => {
                alert("Error occured");
            })
            dispatch(addCategory({ title: title, icon: icon, expenditure: expenditure }));
        } else {
            dispatch(editCategory({ title: title, icon: icon, expenditure: expenditure, id: id }));
            seteditable(false);
        }

    }
    return (<>
        <div className="grid place-items-center w-screen px-24 max-lg:px-8">
            <div className="w-full">
                <div className="flex justify-between flex-row w-3/5">
                    <h3 className="font-bold text-lg">{newCategory || editable ? "Create a New Category" : "Categories"}</h3>
                    <button
                        className={`${newCategory || editable ? "bg-red-500" : "bg-green-500"} p-3 ${newCategory || editable ? "hover:bg-red-600" : "hover:bg-green-600"} rounded-[3px] font-semibold text-base`}
                        onClick={() => { addCategoryFunction() }}
                    >
                        {newCategory || editable ? (
                            <span style={{ fontSize: "19px" }}>&#10799;</span>
                        ) : (
                            <span style={{ fontSize: "19px" }}>+</span>
                        )}
                        {newCategory || editable ? " Cancel" : " New Category"}
                    </button>
                </div>
                <div className="mt-4 w-full flex flex-row gap-4">
                    {!(newCategory || editable) ? (
                        <div className="flex flex-col w-3/5">
                            <div>
                                <div className="w-full flex flex-row p-3 font-semibold text-lg bg-[#242B33] rounded-t-[4px] ">
                                    <div className="w-3/5">Category</div>
                                    <div className="w-1/5 px-4">Type</div>
                                    <div className="w-1/5">Actions</div>
                                </div>
                                <div>
                                    {category.map((e) => (
                                        <div key={e.id} className="w-full flex flex-row p-3 font-normal text-sm bg-[#151A23]">
                                            <div className="w-3/5 flex self-center">
                                                <div>{e.icon}</div>
                                                <div>{e.title}</div>
                                            </div>
                                            <div className="w-1/5 flex justify-start">
                                                <div className={`bg-${e.expenditure ? "red" : "green"}-500 rounded-[4px] px-3 pb-[4px] w-18`}>
                                                    {e.expenditure ? "Expense" : "Income"}
                                                </div>
                                            </div>
                                            <div className="w-1/5 flex self-center gap-3 justify-center">
                                                <div>
                                                    <img src={edit} alt="" width="22px" height="22px" onClick={() => { seteditable(true); setnewCategory(true); setid(e.id) }} />
                                                </div>
                                                <div>
                                                    <img src={bin} alt="" width="24px" height="24px" onClick={() => removeCategoryFunction(e.id)} />
                                                </div>
                                            </div>
                                        </div>)
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col w-3/5 p-8 gap-6 bg-[#222B38]">
                            <div className="flex flex-row">
                                <button onClick={() => { setexpenditure(true) }} className={`w-1/2 ${expenditure ? "bg-white" : "bg-[#151a23]"} ${expenditure ? "text-[#151a23]" : "text-white"} py-1 rounded-l-sm border-white border-2 flex justify-center items-center`}>Expense</button>
                                <button onClick={() => { setexpenditure(false) }} className={`w-1/2 ${expenditure ? "bg-[#151a23]" : "bg-white"} ${expenditure ? "text-white" : "text-[#151a23]"} py-1 rounded-r-sm border-white border-2 flex justify-center items-center`}>Income</button>
                            </div>
                            <form className="flex gap-6 flex-col" onSubmit={(e) => dispatchCategory(e)}>
                                <div className="flex flex-col ">
                                    <label htmlFor="Title">Title</label>
                                    <input required value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="Title" id="Title" className="w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2" />
                                </div>
                                <div>
                                    <label htmlFor="Icon">Icon</label>
                                    <input required value={icon} onChange={(e) => setIcon(e.target.value)} type="text" name="Icon" id="Icon" className="w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2" />
                                </div>
                                <div className="flex flex-row w-full justify-between">
                                    <input type="submit" value="Submit" className="bg-green-600 cursor-pointer px-2 py-1 hover:bg-green-700 rounded-[3px] font-semibold text-base" />
                                    <div className={`${expenditure ? "bg-red-500" : "bg-green-500"} rounded-[4px] px-3 flex items-center w-18`}>
                                        {expenditure ? "Expense" : "Income"}
                                    </div>
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
    </>
    );
};

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import edit from "../images/edit.png";
import bin from "../images/delete.png";
import { addCategory, editCategory, removeCategory } from "../utils/category";
export const Categories = () => {
    const [newCategory, setnewCategory] = useState(false);
    const [expenditure, setexpenditure] = useState(true);
    const [editable, seteditable] = useState(false);
    const [id, setid] = useState(null);
    const TitleRef = useRef(null);
    const IconRef = useRef(null);
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const addCategoryFunction = () => {
        setnewCategory(!newCategory);
        seteditable(false);
    };
    const removeCategoryFunction = (id) => {
        dispatch(removeCategory(id));
    }
    const dispatchCategory = (e) => {
        e.preventDefault();
        if (!TitleRef.current.value.trim() || !IconRef.current.value.trim()) {
            return;
        }
        setnewCategory(false);
        if (!editable) dispatch(addCategory({ title: TitleRef.current.value, icon: IconRef.current.value, expenditure: expenditure }));
        else {
            dispatch(editCategory({ title: TitleRef.current.value, icon: IconRef.current.value, expenditure: expenditure, id: id }));
            seteditable(false);
        }
    }
    return (
        <div className="grid place-items-center w-screen px-24 max-lg:px-8">
            <div className="w-full">
                <div className="flex justify-between flex-row w-3/5">
                    <h3 className="font-bold text-lg">{newCategory || editable ? "Create a New Category" : "Categories"}</h3>
                    <button
                        className={`bg-${newCategory || editable ? "red" : "green"}-500 p-3 hover:bg-${newCategory || editable ? "red" : "green"
                            }-600 rounded-[3px] font-semibold text-base`}
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
                                <button onClick={() => { setexpenditure(true) }} className={`w-1/2 bg-${expenditure ? "[#ffffff]" : "[#151a23]"} text-${expenditure ? "[#151a23]" : "[#ffffff]"} py-1 rounded-l-sm border-white border-2 flex justify-center items-center`}>Expense</button>
                                <button onClick={() => { setexpenditure(false) }} className={`w-1/2 bg-${expenditure ? "[#151a23]" : "[#ffffff]"} text-${expenditure ? "[#ffffff]" : "[#151a23]"} py-1 rounded-r-sm border-white border-2 flex justify-center items-center`}>Income</button>
                            </div>
                            <form className="flex gap-6 flex-col" onSubmit={(e) => dispatchCategory(e)}>
                                <div className="flex flex-col ">
                                    <label htmlFor="Title">Title</label>
                                    <input required ref={TitleRef} type="text" name="Title" id="Title" className="w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2" />
                                </div>
                                <div>
                                    <label htmlFor="Icon">Icon</label>
                                    <input required ref={IconRef} type="text" name="Icon" id="Icon" className="w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2" />
                                </div>
                                <div>
                                    <input type="submit" value="Submit" className="bg-green-500 cursor-pointer px-2 py-1 hover:bg-green-600 rounded-[3px] font-semibold text-base" />
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

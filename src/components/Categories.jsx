import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  editCategory,
  removeCategory,
} from "../utils/state/category";
import edit from "../images/edit.png";
import bin from "../images/delete.png";
import { push, ref, remove, set, update } from "firebase/database";
import { database } from "../utils/firebaseConfig";

export const Categories = () => {
  const [category, setCategory] = useState({
    id: "",
    title: "",
    icon: "",
    expenditure: false,
  });
  const [newCategory, setNewCategory] = useState(false);
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  const uid = useSelector((state) => state.user.uid);
  const addCategoryFunction = () => {
    setNewCategory(!newCategory);
    setEditable(false);
  };

  const removeCategoryFunction = (id) => {
    remove(ref(database, "users/" + uid + "/categories/" + id));
    dispatch(removeCategory(id));
  };

  const dispatchCategory = async (e) => {
    e.preventDefault();
    if (!category.title.trim() || !category.icon.trim()) {
      return;
    }
    setNewCategory(false);
    const categoriesRef = ref(database, "users/" + uid + "/categories");
    const newCategoryRef = push(categoriesRef);

    if (!editable) {
      setCategory({
        ...category,
        id: newCategoryRef.key,
      });
      dispatch(addCategory(category));
      set(newCategoryRef, {
        ...category,
        id: newCategoryRef.key,
      });
      setCategory({ id: "", title: "", icon: "", expenditure: false });
    } else {
      const categoryRef = ref(
        database,
        "users/" + uid + "/categories/" + category.id
      );
      update(categoryRef, category);
      dispatch(editCategory(category));
      setEditable(false);
      setCategory({ id: "", title: "", icon: "", expenditure: false });
    }
  };

  const editCategoryFunction = (e) => {
    setEditable(true);
    setNewCategory(true);
    setCategory({
      id: e.id,
      title: e.title,
      icon: e.icon,
      expenditure: e.expenditure,
    });
  };

  return (
    <div className="grid place-items-center w-screen px-24 max-lg:px-8">
      <div className="w-full">
        <div className="flex justify-between flex-row w-3/5">
          <h3 className="font-bold text-lg">
            {newCategory || editable ? "Create a New Category" : "Categories"}
          </h3>
          <button
            className={`${
              newCategory || editable ? "bg-red-500" : "bg-green-500"
            } p-3 ${
              newCategory || editable
                ? "hover:bg-red-600"
                : "hover:bg-green-600"
            } rounded-[3px] font-semibold text-base`}
            onClick={addCategoryFunction}
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
                <div className="w-full flex flex-row p-3 font-semibold text-lg bg-[#242B33] rounded-t-[4px]">
                  <div className="w-3/5">Category</div>
                  <div className="w-1/5 px-4">Type</div>
                  <div className="w-1/5">Actions</div>
                </div>
                <div>
                  {categories.map((e) => (
                    <div
                      key={e.id}
                      className="w-full flex flex-row p-3 font-normal text-sm bg-[#151A23]"
                    >
                      <div className="w-3/5 flex self-center">
                        <div>{e.icon}</div>
                        <div>{e.title}</div>
                      </div>
                      <div className="w-1/5 flex justify-start">
                        <div
                          className={`bg-${
                            e.expenditure ? "red" : "green"
                          }-500 rounded-[4px] px-3 pb-[4px] w-18`}
                        >
                          {e.expenditure ? "Expense" : "Income"}
                        </div>
                      </div>
                      <div className="w-1/5 flex self-center gap-3 justify-center">
                        <div>
                          <img
                            src={edit}
                            alt=""
                            width="22px"
                            height="22px"
                            onClick={() => {
                              editCategoryFunction(e);
                            }}
                          />
                        </div>
                        <div>
                          <img
                            src={bin}
                            alt=""
                            width="24px"
                            height="24px"
                            onClick={() => removeCategoryFunction(e.id)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-3/5 p-8 gap-6 bg-[#222B38]">
              <div className="flex flex-row">
                <button
                  onClick={() =>
                    setCategory({ ...category, expenditure: true })
                  }
                  className={`w-1/2 ${
                    category.expenditure ? "bg-white" : "bg-[#151a23]"
                  } ${
                    category.expenditure ? "text-[#151a23]" : "text-white"
                  } py-1 rounded-l-sm border-white border-2 flex justify-center items-center`}
                >
                  Expense
                </button>
                <button
                  onClick={() =>
                    setCategory({ ...category, expenditure: false })
                  }
                  className={`w-1/2 ${
                    category.expenditure ? "bg-[#151a23]" : "bg-white"
                  } ${
                    category.expenditure ? "text-white" : "text-[#151a23]"
                  } py-1 rounded-r-sm border-white border-2 flex justify-center items-center`}
                >
                  Income
                </button>
              </div>
              <form className="flex gap-6 flex-col" onSubmit={dispatchCategory}>
                <div className="flex flex-col">
                  <label htmlFor="Title">Title</label>
                  <input
                    required
                    value={category.title}
                    onChange={(e) =>
                      setCategory({ ...category, title: e.target.value })
                    }
                    type="text"
                    name="Title"
                    id="Title"
                    className="w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2"
                  />
                </div>
                <div>
                  <label htmlFor="Icon">Icon</label>
                  <input
                    required
                    value={category.icon}
                    onChange={(e) =>
                      setCategory({ ...category, icon: e.target.value })
                    }
                    type="text"
                    name="Icon"
                    id="Icon"
                    className="w-full bg-[#212429] rounded-sm border-white border-[1px] text-white p-2"
                  />
                </div>
                <div className="flex flex-row w-full justify-between">
                  <input
                    type="submit"
                    value="Submit"
                    className="bg-green-600 cursor-pointer px-2 py-1 hover:bg-green-700 rounded-[3px] font-semibold text-base"
                  />
                  <div
                    className={`${
                      category.expenditure ? "bg-red-500" : "bg-green-500"
                    } rounded-[4px] px-3 flex items-center w-18`}
                  >
                    {category.expenditure ? "Expense" : "Income"}
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
  );
};

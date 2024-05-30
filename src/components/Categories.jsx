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
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  const uid = useSelector((state) => state.user.uid);

  const toggleForm = () => {
    setIsEditing(!isEditing);
    setCategory({ id: "", title: "", icon: "", expenditure: false });
  };

  const handleRemoveCategory = (id) => {
    remove(ref(database, `users/${uid}/categories/${id}`));
    dispatch(removeCategory(id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.title.trim() || !category.icon.trim()) return;

    const categoriesRef = ref(database, `users/${uid}/categories`);
    const newCategoryRef = push(categoriesRef);

    if (category.id) {
      const categoryRef = ref(
        database,
        `users/${uid}/categories/${category.id}`
      );
      await update(categoryRef, category);
      dispatch(editCategory(category));
    } else {
      setCategory({ ...category, id: newCategoryRef.key });
      await set(newCategoryRef, { ...category, id: newCategoryRef.key });
      dispatch(addCategory({ ...category, id: newCategoryRef.key }));
    }

    toggleForm();
  };

  const handleEditCategory = (category) => {
    setCategory(category);
    setIsEditing(true);
  };

  return (
    <div className="grid place-items-center w-screen px-24 max-lg:px-8 text-white">
      <div className="w-full">
        <div className="flex justify-between flex-row w-3/5">
          <h3 className="font-bold text-lg ">
            {isEditing ? "Edit Category" : "Categories"}
          </h3>
          <button
            className={`p-3 rounded-[3px] font-semibold text-base ${
              isEditing
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={toggleForm}
          >
            {isEditing ? (
              <span>&#10799; Cancel</span>
            ) : (
              <span>+ New Category</span>
            )}
          </button>
        </div>
        <div className="mt-4 w-full flex flex-row gap-4">
          {!isEditing ? (
            <div className="flex flex-col w-3/5">
              <div>
                <div className="w-full flex flex-row p-3 font-semibold text-lg bg-[#242B33] rounded-t-[4px]">
                  <div className="w-3/5 ">Category</div>
                  <div className="w-1/5 px-4 ">Type</div>
                  <div className="w-1/5 ">Actions</div>
                </div>
                <div className="bg-[#151A23] rounded-b-[4px]">
                  {categories.map((e) => (
                    <div
                      key={e.id}
                      className="w-full flex flex-row p-3 font-normal text-sm "
                    >
                      <div className="w-3/5 flex self-center">
                        <div className="mr-2">{e.icon}</div>
                        <div>{e.title}</div>
                      </div>
                      <div className="w-1/5 flex justify-start">
                        <div
                          className={`rounded-[4px] px-3 pb-[4px] w-18 ${
                            e.expenditure ? "bg-red-500" : "bg-green-500"
                          }`}
                        >
                          {e.expenditure ? "Expense" : "Income"}
                        </div>
                      </div>
                      <div className="w-1/5 flex self-center gap-3 justify-center">
                        <img
                          src={edit}
                          alt="Edit"
                          width="22px"
                          height="22px"
                          onClick={() => handleEditCategory(e)}
                          className="cursor-pointer"
                        />
                        <img
                          src={bin}
                          alt="Delete"
                          width="24px"
                          height="24px"
                          onClick={() => handleRemoveCategory(e.id)}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-3/5 p-8 gap-6 bg-[#222B38] rounded-md">
              <div className="flex flex-row">
                <button
                  onClick={() =>
                    setCategory({ ...category, expenditure: true })
                  }
                  className={`w-1/2 py-1 rounded-l-sm border-2 flex justify-center items-center ${
                    category.expenditure
                      ? "bg-white text-[#151a23]"
                      : "bg-[#151a23] text-white"
                  } border-white`}
                >
                  Expense
                </button>
                <button
                  onClick={() =>
                    setCategory({ ...category, expenditure: false })
                  }
                  className={`w-1/2 py-1 rounded-r-sm border-2 flex justify-center items-center ${
                    category.expenditure
                      ? "bg-[#151a23] text-white"
                      : "bg-white text-[#151a23]"
                  } border-white`}
                >
                  Income
                </button>
              </div>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
                    className="w-full bg-[#212429] rounded-sm border-2 border-white  p-2"
                  />
                </div>
                <div className="flex flex-col">
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
                    className="w-full bg-[#212429] rounded-sm border-2 border-white  p-2"
                  />
                </div>
                <div className="flex flex-row w-full justify-between items-center">
                  <input
                    type="submit"
                    value="Submit"
                    className="bg-green-600 cursor-pointer px-4 py-2 hover:bg-green-700 rounded-[3px] font-semibold text-base"
                  />
                  <div
                    className={`rounded-[4px] px-3 py-1 ${
                      category.expenditure ? "bg-red-500" : "bg-green-500"
                    }`}
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

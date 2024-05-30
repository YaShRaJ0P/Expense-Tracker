import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/state/userSlice";
import { auth } from "../utils/firebaseConfig";
import { emptyCategory } from "../utils/state/category";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authentication } from "./Authentication";
import { Navbar } from "./Navbar";
import { Dashboard } from "./Dashboard";
import { Categories } from "./Categories";
import { Transactions } from "./Transactions";
import { fetchCategoryData } from "../utils/fetch/fetchCategory";
import { fetchTransactionData } from "../utils/fetch/fetchTransaction";

export const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        await fetchCategoryData(dispatch, uid);
        await fetchTransactionData(dispatch, uid);
      } else {
        dispatch(removeUser());
        dispatch(emptyCategory());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const user = useSelector((state) => state.user);
  return (
    <div className="bg-[#0F1219] min-h-screen w-full flex flex-row">
      <BrowserRouter>
        {user ? <Navbar /> : null}

        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Authentication />} />
          {user && (
            <>
              <Route path="/categories" element={<Categories />} />
              <Route path="/transactions" element={<Transactions />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

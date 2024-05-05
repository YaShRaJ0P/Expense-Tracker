import { Transactions } from "./Transactions";
import { Dashboard } from "./Dashboard";
import { Categories } from "./Categories";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Authentication } from "./Authentication";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebaseConfig";
import { Navbar } from "./Navbar";

export const Body = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = auth.currentUser;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
      } else {
        dispatch(removeUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  return (
    <div className="bg-[#0F1219] min-h-screen w-full flex flex-row">
      <BrowserRouter>
        <Routes>
          {!user ? (
            <Route path="/" element={<Authentication />} />
          ) : (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/transactions" element={<Transactions />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

import React, { useState } from "react";
import logo from "../images/logo.png";
import arrow from "../images/arrow.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { removeUser } from "../utils/state/userSlice";
import { emptyCategory } from "../utils/state/category";
import { emptyTransaction } from "../utils/state/transaction";

export const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(true);

  const signOutFunction = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser({}));
        dispatch(emptyCategory({}));
        dispatch(emptyTransaction({}));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navOpenFunction = () => {
    setNavOpen(!navOpen);
  };

  return (
    <nav
      className={`p-6 ${
        navOpen ? "w-1/5" : "w-[8%]"
      }text-center sticky top-0 h-screen flex flex-col justify-between text-white border-r-[1px] border-gray-500 border-opacity-40 border-dashed transition-all duration-300 `}
    >
      <div className="flex flex-col gap-10 h-4/5">
        <div
          className={`flex ${
            navOpen ? "justify-between" : "justify-center"
          } items-center`}
        >
          <img
            src={logo}
            alt="Logo"
            className={`w-8 h-8 transition-all duration-300 ${
              !navOpen && "hidden"
            }`}
          />
          <img
            src={arrow}
            alt="Toggle"
            className={`w-6 h-6 transform transition-transform duration-300 cursor-pointer ${
              navOpen ? "rotate-180" : "rotate-0"
            }`}
            onClick={navOpenFunction}
          />
        </div>
        <div
          className={`flex items-center rounded-lg py-3 ${
            navOpen
              ? "px-6 bg-[#002bbb] justify-between"
              : "bg-transparent justify-center"
          } transition-all duration-300`}
        >
          <img src={logo} alt="User" className="w-8 h-8" />
          <div
            className={`font-bold text-xl ${
              !navOpen && "hidden"
            } transition-all duration-300`}
          >
            {user.displayName}
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center">
          <NavItem
            id="dashboard"
            to="/"
            navOpen={navOpen}
            iconSrc="https://cdn.lordicon.com/fkaukecx.json"
            label="Dashboard"
          />
          <NavItem
            id="categories"
            to="/categories"
            navOpen={navOpen}
            iconSrc="https://cdn.lordicon.com/jnikqyih.json"
            label="Categories"
          />
          <NavItem
            id="transactions"
            to="/transactions"
            navOpen={navOpen}
            iconSrc="https://cdn.lordicon.com/gjjvytyq.json"
            label="Transactions"
          />
        </div>
      </div>
      <button
        className="w-full bg-blue-700 text-white font-semibold px-3 py-2 text-base rounded-md transition-all duration-300 hover:bg-blue-600"
        onClick={signOutFunction}
      >
        Sign Out
      </button>
    </nav>
  );
};

const NavItem = ({ id, to, navOpen, iconSrc, label }) => (
  <div
    id={id}
    className="flex w-full items-center justify-center font-semibold gap-2 px-5 cursor-pointer"
  >
    <Link to={to}>
      <div className="flex items-center gap-2">
        <lord-icon
          src={iconSrc}
          trigger="loop-on-hover"
          colors="primary:#ABA49E"
          target={`#${id}`}
          className="w-8 h-8"
        ></lord-icon>
        <p
          className={`inline-block ${
            !navOpen && "hidden"
          } transition-all duration-300`}
        >
          {label}
        </p>
      </div>
    </Link>
  </div>
);

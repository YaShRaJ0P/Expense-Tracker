import { useState } from "react";
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
  const [navOpen, setNavOpen] = useState(true);
  const navOpenFunction = () => {
    setNavOpen(!navOpen);
  };
  return (
    <nav
      className={`p-6 ${
        navOpen ? "w-1/5" : "w-[8%]"
      } items-center transition-all flex flex-col justify-between text-white border-r-[1px] border-gray-500 border-opacity-40 border-dashed`}
    >
      <div className=" h-4/5 flex flex-col gap-10">
        <div
          className={`flex ${
            navOpen ? "justify-between" : "justify-center"
          } items-center h-6 w-full`}
        >
          <img
            src={logo}
            alt=""
            className={`w-8 h-8 ${!navOpen && "hidden"} `}
          />
          <img
            src={arrow}
            alt=""
            className={`w-6 h-6 ${
              navOpen ? "rotate-180" : "rotate-0"
            } cursor-pointer`}
            onClick={() => navOpenFunction()}
          />
        </div>
        <div
          className={`w-full ${
            navOpen ? "bg-[#002bbb]" : "bg-transparent"
          } flex flex-row rounded-lg ${navOpen && "px-6"} py-3 ${
            navOpen ? "justify-between" : "justify-center"
          } items-center`}
        >
          <div>
            <img src={logo} alt="" className="w-8 h-8" />
          </div>
          <div className={`font-bold text-xl ${!navOpen ? "hidden" : ""} `}>
            {user.displayName}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            id="dashboard"
            className=" flex w-full items-center flex-row font-semibold gap-2 px-5 cursor-pointer"
          >
            <Link to="/">
              <div className="flex flex-row items-center gap-2">
                <lord-icon
                  src="https://cdn.lordicon.com/fkaukecx.json"
                  trigger="loop-on-hover"
                  colors="primary:#ABA49E"
                  target="#dashboard"
                  className="w-8 h-8"
                ></lord-icon>
                <p className={`inline-block ${!navOpen && "hidden"}`}>
                  Dashboard
                </p>
              </div>
            </Link>
          </div>
          <div
            id="categories"
            className=" flex w-full items-center flex-row font-semibold gap-2 px-5 cursor-pointer"
          >
            <Link to="/categories">
              <div className="flex flex-row items-center gap-2">
                <lord-icon
                  src="https://cdn.lordicon.com/jnikqyih.json"
                  trigger="loop-on-hover"
                  colors="primary:#ABA49E"
                  target="#categories"
                  className="w-8 h-8"
                ></lord-icon>
                <p className={`inline-block ${!navOpen && "hidden"}`}>
                  Categories
                </p>
              </div>
            </Link>
          </div>
          <div
            id="transactions"
            className=" flex w-full items-center flex-row font-semibold gap-2 px-5 cursor-pointer"
          >
            <Link to="/transactions">
              <div className="flex flex-row items-center gap-2">
                <lord-icon
                  src="https://cdn.lordicon.com/gjjvytyq.json"
                  trigger="loop-on-hover"
                  colors="primary:#ABA49E"
                  target="#transactions"
                  className="w-8 h-8"
                ></lord-icon>
                <p
                  className={`inline-block self-center ${!navOpen && "hidden"}`}
                >
                  Transactions
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <button
        className="flex w-[-webkit-fill-available] justify-center items-center bg-blue-700 text-white font-semibold px-3 py-2 text-base rounded-md"
        onClick={() => signOutFunction()}
      >
        Sign Out
      </button>
    </nav>
  );
};

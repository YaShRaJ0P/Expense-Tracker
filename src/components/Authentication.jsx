import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, database } from "../utils/firebaseConfig";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/state/userSlice";
import { push, ref, set } from "firebase/database";
import { fetchCategoryData } from "../utils/fetch/fetchCategory";

export const Authentication = () => {
  const dispatch = useDispatch();
  const [isSignUp, setisSignUp] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");

  const SignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: username,
        photoURL: "https://example.com/jane-q-user/profile.jpg",
      });
      const { uid, email: userEmail, displayName } = auth.currentUser;
      dispatch(addUser({ uid, email: userEmail, displayName }));
      await set(ref(database, "users/" + uid), {
        username: username,
      });
      const categoriesRef = await ref(
        database,
        "users/" + user.uid + "/categories/"
      );

      const categoriesData = {
        [push(categoriesRef).key]: {
          title: "Food",
          icon: "🍚",
          expenditure: true,
        },
        [push(categoriesRef).key]: {
          title: "Office",
          icon: "🏢",
          expenditure: false,
        },
        [push(categoriesRef).key]: {
          title: "Travel",
          icon: "✈️",
          expenditure: true,
        },
        [push(categoriesRef).key]: {
          title: "Education",
          icon: "📚",
          expenditure: true,
        },
        [push(categoriesRef).key]: {
          title: "Freelancing",
          icon: "🎬",
          expenditure: false,
        },
      };

      await set(categoriesRef, categoriesData);

      fetchCategoryData(dispatch, uid);
    } catch (error) {
      console.log(error);
    }
  };

  const SignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-1/2 bg-black rounded-md flex flex-col items-center justify-center gap-2 p-10">
        {isSignUp && (
          <div className="flex flex-col w-3/5">
            <label
              htmlFor="Username"
              className='"block text-sm font-medium leading-6 '
            >
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setusername(e.target.value)}
              type="text"
              name="Username"
              id="Username"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
        )}
        <div className="flex flex-col w-3/5">
          <label
            htmlFor="EmailId"
            className='"block text-sm font-medium leading-6 '
          >
            Email Id
          </label>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            name="EmailId"
            id="EmailId"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
          />
        </div>
        <div className="flex flex-col w-3/5">
          <label
            htmlFor="Password"
            className='"block text-sm font-medium leading-6 '
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            name="Password"
            id="Password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
          />
        </div>
        <button
          onClick={isSignUp ? () => SignUp() : () => SignIn()}
          type="submit"
          className="w-1/2 mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        {isSignUp ? (
          <p className="font-semibold text-sm ">
            Already a User?{" "}
            <button
              onClick={() => setisSignUp(false)}
              className=" underline text-indigo-600 cursor-pointer"
            >
              SignIn.
            </button>
          </p>
        ) : (
          <p className="font-semibold text-sm ">
            New User?{" "}
            <button
              onClick={() => setisSignUp(true)}
              className=" underline text-indigo-600 cursor-pointer"
            >
              SignUp.
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

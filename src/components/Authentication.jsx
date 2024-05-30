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
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

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

      const categoriesRef = ref(database, "users/" + user.uid + "/categories/");
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
      console.error(error);
    }
  };

  const SignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold text-white">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isSignUp ? SignUp() : SignIn();
          }}
          className="flex flex-col gap-4"
        >
          {isSignUp && (
            <div className="flex flex-col">
              <label
                htmlFor="Username"
                className="block text-sm font-medium text-gray-300"
              >
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="Username"
                id="Username"
                className="block w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
          <div className="flex flex-col">
            <label
              htmlFor="EmailId"
              className="block text-sm font-medium text-gray-300"
            >
              Email Id
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="EmailId"
              id="EmailId"
              className="block w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="Password"
              id="Password"
              autoComplete="true"
              className="block w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          {isSignUp ? (
            <>
              Already a user?{" "}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-indigo-400 font-medium hover:underline"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              New user?{" "}
              <button
                onClick={() => setIsSignUp(true)}
                className="text-indigo-400 font-medium hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

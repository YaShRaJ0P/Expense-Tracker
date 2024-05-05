import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../utils/firebaseConfig";
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice';
import { useNavigate } from "react-router-dom";

export const Authentication = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignUp, setisSignUp] = useState(false);
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [username, setusername] = useState("")
    
    const SignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: username, photoURL: "https://example.com/jane-q-user/profile.jpg"
                }).then(() => {
                    const { uid, email, displayName } = auth.currentUser;
                    dispatch(addUser({ uid: uid, email: email, displayName: displayName }))
                    navigate("/categories");
                }).catch((error) => {
                    console.log(error);
                });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    const SignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
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
                            onChange={e => setusername(e.target.value)}
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
                        onChange={e => setemail(e.target.value)}
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
                        onChange={e => setpassword(e.target.value)}
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
                        Already a User? <button onClick={() => setisSignUp(false)} className=" underline text-indigo-600 cursor-pointer">SignIn</button>
                    </p>
                ) : (

                    <p className="font-semibold text-sm ">
                        New User? <button onClick={() => setisSignUp(true)} className=" underline text-indigo-600 cursor-pointer">SignUp.</button>
                    </p>
                )}
            </div>
        </div >
    );
};

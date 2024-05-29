// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// Initialize Firebase Authentication and get a reference to the service

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGsc59CBRijLtILy-LQyDZCU9DvTHr758",
  authDomain: "expensee-3d192.firebaseapp.com",
  databaseURL:
    "https://expensee-3d192-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "expensee-3d192",
  storageBucket: "expensee-3d192.appspot.com",
  messagingSenderId: "1003024618556",
  appId: "1:1003024618556:web:61cb79754ef44e0de79f39",
  measurementId: "G-VJCLEBR650",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
const analytics = getAnalytics(app);
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Authentication state persistence set to 'local'");
  })
  .catch((error) => {
    console.error("Error setting authentication state persistence:", error);
  });

export default app;

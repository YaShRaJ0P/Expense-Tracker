import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);

setPersistence(auth, browserLocalPersistence);

export { auth, database };
export default app;

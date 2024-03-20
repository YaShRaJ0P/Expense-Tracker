import "./App.css";
import { Transactions } from "./components/Transactions";
import { Dashboard } from "./components/Dashboard";
import { Navbar } from "./components/Navbar";
import { Categories } from "./components/Categories";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Categories />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
function App() {
  return (
    <div className="bg-[#0F1219] min-h-screen w-full flex flex-row">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

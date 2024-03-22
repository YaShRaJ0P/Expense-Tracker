import "./App.css";
import { Transactions } from "./components/Transactions";
import { Dashboard } from "./components/Dashboard";
import { Navbar } from "./components/Navbar";
import { Categories } from "./components/Categories";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <div className="bg-[#0F1219] min-h-screen w-full flex flex-row">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;

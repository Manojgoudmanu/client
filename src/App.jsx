import { useState, useEffect, createContext } from "react";
import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "./App.css";
import "./Home.css";
import Home from "./Home";
import "./Footer.css";
import Welcome from "./Welcome";
import Signup from "./Signup";
import Login from "./Login";
 
import Add from "./Add";
import Income from "./Income";
import Expense from "./Expense";
import Statics from "./Statics";
import Profile from "./Profile";
import AccountInfo from "./AccountInfo";
import PrivacyPolicy from "./PrivacyPolicy";
import SecurityCode from "./SecurityCode";
import Logout from "./Logout";
import Help from "./Help";
import Notifications from "./NotificationCard";

export const fetchdata = createContext();

function App() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  let [count, setCount] = useState(0);
  let [routes, setRoutes] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate(location.pathname, { replace: true }); // Stay on the same page
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate, location]);

  useEffect(() => {
    if (user) {
      
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      console.log("❌ User logged out or null");
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (user && user.email) {
      axios
        .get(`http://localhost:3003/transactions/${user.email}`)
        .then((resp) => {
          setTransactions(resp.data);
        })
        .catch((error) => console.error("Error fetching transactions:", error));
    }
  }, [user, count]);

  return (
    <div>
      <fetchdata.Provider
        value={{ transactions, setTransactions, user, setUser, count, setCount, routes, setRoutes }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
           

          {/* Protected Routes: Redirect to Welcome if not logged in */}
          <Route path="/homepage" element={user ? <Home /> : <Navigate to="/" />} />
          <Route path="/addexpense" element={user ? <Add /> : <Navigate to="/" />} />
          <Route path="/income" element={user ? <Income /> : <Navigate to="/" />} />
          <Route path="/expense" element={user ? <Expense /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
          <Route path="/account-info" element={user ? <AccountInfo /> : <Navigate to="/" />} />
          <Route path="/privacy-policy" element={user ? <PrivacyPolicy /> : <Navigate to="/" />} />
          <Route path="/security-code" element={user ? <SecurityCode /> : <Navigate to="/" />} />
          <Route path="/help" element={user ? <Help /> : <Navigate to="/" />} />
          <Route path="/logout" element={user ? <Logout /> : <Navigate to="/" />} />
          <Route path="/statics" element={user ? <Statics /> : <Navigate to="/" />} />
          <Route path="/notifications" element={user ? <Notifications /> : <Navigate to="/" />} />
        </Routes>
      </fetchdata.Provider>
    </div>
  );
}

export default App;

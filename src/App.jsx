import { useState, createContext } from "react";


import Footer from "./Footer";


import "./App.css";
import "./Home.css"
import Home from "./Home";
import "./Footer.css";
import Welcome from "./Welcome";
import Signup from "./Signup";
import Login from "./login";
import Forgot from "./Forgot";
import { Route ,Routes} from "react-router-dom";
import Add from "./Add";
import Income from "./Income";
import Expense from "./Expense";

import Profile from "./Profile";
import AccountInfo from "./AccountInfo";
import PrivacyPolicy from "./PrivacyPolicy";
import SecurityCode from "./SecurityCode";
import Logout from "./Logout";
import Help from "./Help";
import Notifications from "./NotificationCard"




export const fetchdata = createContext();

function App() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
   


  return (
    <fetchdata.Provider
      value={{ balance, setBalance, transactions, setTransactions }}
    >
    
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/homepage" element={<Home />}></Route>
          <Route path="/addexpense" element = {<Add />}></Route>
          <Route path="/income" element = {<Income />}></Route>
          <Route path="/expense" element={<Expense />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
           <Route path="/account-info" element={<AccountInfo />} />
           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
           <Route path="/security-code" element={<SecurityCode />} />
           <Route path="/help" element={<Help />} />
           <Route path="/logout" element={<Logout />} />
           
          <Route path="/notifications" element={<Notifications />}></Route>
        
        </Routes>
       
    </fetchdata.Provider>
  );
}

export default App;

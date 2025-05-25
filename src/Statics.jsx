import React, { useContext, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchdata } from "./App";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import "./Statics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Statics = () => {
  const { transactions } = useContext(fetchdata);
  const nav = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // Function to group transactions by month
  const generateMonthlyReport = () => {
    const report = {};
    transactions.forEach(({ title, amount, money, date }) => {
      const transactionDate = new Date(date);// formats the date into js format
      const month = transactionDate.getMonth() + 1;// js months starts with 0 so we add one to it 
      if (month === selectedMonth) {
        const key = `${title}-${money}`;
        if (report[key]) {
          report[key].total += Number(amount);
        } else {
          report[key] = { title, money, total: Number(amount), date };// it will be in this format like "title-money = {title:"",money="",total:"" }"
        }
      }
    });
    console.log(Object.values(report))
    return Object.values(report);// this will return obj into an array fromat by ignoring all the keys by only taking the values
  };

  const monthlyReport = generateMonthlyReport();

  // Sort transactions by date
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Extract unique sorted dates as labels
  const labels = [...new Set(
    sortedTransactions.map(({ date }) => new Date(date).toLocaleDateString("en-GB"))
  )];

  const incomeData = labels.map((date) => {
    const total = sortedTransactions
      .filter((t) => new Date(t.date).toLocaleDateString("en-GB") === date && t.money === "Income")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);
    return total;
  });

  const expenseData = labels.map((date) => {
    const total = sortedTransactions
      .filter((t) => new Date(t.date).toLocaleDateString("en-GB") === date && t.money === "expense")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);
    return total;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Expense",
        data: expenseData,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="staticspage">
      <FontAwesomeIcon icon={faAnglesLeft} className="btp" onClick={() => nav("/homepage")} />
      <h2>Statistics</h2>

      {/* Chart Section */}
      <div className="chart-container">
        <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      {/* Report Section */}
      <div className="report-section">
        <h3>Monthly Report</h3>
        <select className="month-selector" onChange={(e) => setSelectedMonth(Number(e.target.value))} value={selectedMonth}>
          {[...Array(12)].map((_, i) => (// creating array(12) and placing into an [...array(12)] and spreading them to map over them
            <option key={i + 1} value={i + 1}>{new Date(2025, i).toLocaleString("en-US", { month: "long" })}</option>// but also we can hard code this in the form of jan feb an all
          ))}
        </select>
          {/* also we can hard code like this    <option value="1">January</option>
    <option value="2">February</option>
    <option value="3">March</option>
    <option value="4">April</option>
    <option value="5">May</option>
    <option value="6">June</option>
    <option value="7">July</option>
    <option value="8">August</option>
    <option value="9">September</option>
    <option value="10">October</option>
    <option value="11">November</option>
    <option value="12">December</option> this will also works manojs code !!
    !! */}

        <div className="reportcontainer"> 
          {console.log(monthlyReport)}
          {monthlyReport.length > 0 ? (
            monthlyReport.map(({ title, money, total, date }) => (// as monthly report concist of 3 paramets so we use 3 as arguments in maping function
              <div key={title + money} className={money === "Income" ? "reportincome" : "reportexpense"}>
                <p>{title}:    ₹{total}--{date}</p>
              </div>
            ))
          ) : (
            <p>No transactions for this month.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statics;

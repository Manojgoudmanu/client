import React, { useContext, useRef, useState } from "react";
import "./income.css";
import { fetchdata } from "./App";


const Income = () => {

  const {transactions,setTransactions} = useContext(fetchdata)
  const dateref = useRef();
  const titleref = useRef();
  const amountref = useRef();
  

  const handlesubmit = (e)=>{
    e.preventDefault()
    const newincome = {
      date:(dateref.current.value),
      title:(titleref.current.value),
      amount:(amountref.current.value),
      color:"green",
      sign:"+",
      money:"Income"
    }
    setTransactions([...transactions,newincome])
    console.log(transactions)
    dateref.current.value= ""
    titleref.current.value=""
    amountref.current.value=""
  }


  






  return (
    <form onSubmit={handlesubmit} className="add-section">
      <h2 style={{color:"white"}}>Add Money</h2>

      <input type="date" className="input-field" ref={dateref} required />

      <h4>Money Title</h4>
      <input type="text" className="input-field" ref={titleref} required/>

      <h4>Amount</h4>
      <input type="number" className="input-field" min="0.00" step="0.01" ref={amountref} required/>

      
      
      
    

      <button className="add-income">Add Money</button>
    </form>
  );
};

export default Income;

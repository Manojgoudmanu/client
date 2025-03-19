import React, { useContext, useRef, useState } from "react";
import "./Expense.css";
import { fetchdata } from "./App";


const Expense = () => {
 const {transactions,setTransactions} = useContext(fetchdata);



  const dateref = useRef()
  const titleref = useRef()
  const amountref = useRef()
 

  const handlesubmit = (e)=>{
    e.preventDefault()
    const newexpense = {
    date:(dateref.current.value),
    title:(titleref.current.value),
    amount:(amountref.current.value),
    color:"red",
    sign:"-",
    money:"Expense"
    }
    setTransactions([...transactions,newexpense])

    console.log(typeof(newexpense.amount))
    dateref.current.value= ""
    titleref.current.value =""
    amountref.current.value=""
    




  }
  
 
  

 

  return (<>
  
    <form onSubmit={handlesubmit} className="add-section">
      <h2 style={{color:"white"}}>Add Expense</h2>
      <h4>Date</h4>
      <input type="date" className="input-field" ref={dateref} required/>

      <h4>Expense Title</h4>
      <input type="text" className="input-field" ref={titleref} required/>

      <h4>Amount</h4>
      <input type="number" className="input-field" min="0.00" step="0.01" ref={amountref} required/>

   
     

      <button type="submit" className="add-income">Add Expense</button>
    </form>
    </>
  );
};

export default Expense;

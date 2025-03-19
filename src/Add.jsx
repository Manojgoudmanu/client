import React, { useContext } from 'react'
import Footer from './Footer'
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faReceipt,faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchdata } from './App';
import { useNavigate } from 'react-router-dom';
import "./Add.css";

const Add = () => {
  const {transactions,setTransactions} = useContext(fetchdata)
  const navigate = useNavigate()
  console.log(transactions,"add page transactions")

  const deletehandler = (index)=>{
    const updatedtrans = [...transactions];
    updatedtrans.splice(index,1)
    setTransactions(updatedtrans)

    console.log("deleted")

  }

  




  return (
    <div>
       <div className="add-container">
            <div className="add-form">
                <h1>Add</h1>
                <div className="buttons">
                    <button className="income" onClick={() => navigate('/income')}>
                        <FontAwesomeIcon icon={faWallet} className="icon" /> Add Income
                    </button>
                    <button className="expense" onClick={()=>navigate('/Expense')}>
                        <FontAwesomeIcon icon={faReceipt} className="icon" /> Add Expense
                    </button>
                </div>
                <h3>Last Added</h3>
                <div className="transactions">
                    {transactions.length > 0 ? (
                        transactions.map((ts, index) => (
                            <div key={index} className={`transaction-item ${ts.money === "Income" ? "incomebox":"expensebox"}`}>
                                <div>
                                   
                                    <p className="transaction-name">{ts.title}</p>
                                    <p className="transaction-date">{ts.date}</p>
                                </div>
                                <p className={`transaction-amount ${ts.color}`}>{ts.sign}{ts.amount}</p>
                                <button className='deletebutton' onClick={deletehandler}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        ))
                    ) : (
                        <p>No transactions added yet.</p>
                    )}
                </div>
            </div>
        </div>

      
       <Footer />
    </div>
    
  )
}

export default Add
import React, { useContext } from 'react'
import { fetchdata } from './App'
import Footer from './Footer'
import { faTrash,faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 


const Home = () => {
    const {balance,setBalance,transactions,setTransactions} = useContext(fetchdata)
    const deletehandler = (index)=>{
      const updatedtrans = [...transactions];
      updatedtrans.splice(index,1)
      setTransactions(updatedtrans)
  
      console.log("deleted")
  
    }

    const sumincome = ()=>{
      return transactions.filter((item)=>item.money === "Income").reduce((sum,item)=>sum + Number(item.amount),0)//reduce(accumiltor,currentvalue)=>{},inititalvalue
    }
    const sumexpense = ()=>{
      return transactions.filter((ts)=>ts.money === "Expense").reduce((sum,item)=> sum + Number(item.amount),0)
    }
   const totalbalance =()=> sumincome() - sumexpense();
    
  return (
    <section id="container">
    <main>
      <h1>Expence tracker</h1>
    <div>
         <div>
         <div id="firstbox">
          <div>
            <h3>Total Balance</h3>
            <span>💰{totalbalance()}<FontAwesomeIcon icon={faIndianRupeeSign} /></span>
          </div>

          <div>
            <h3>INCOME</h3>
            <span id="expence">💵{sumincome()}
            <FontAwesomeIcon icon={faIndianRupeeSign} />
            </span>
          </div>

          <div>
            <h3>EXPENSE</h3>
            <span id="balance">💸{sumexpense()}<FontAwesomeIcon icon={faIndianRupeeSign} /> </span>
          </div>
        </div>
        
    </div>
    <div>
         <section id="transactionlist">
          {console.log(transactions,"kjbjb")}
                  <h3>Transactions</h3>
                 <div className="transactions">
                                  {transactions.length > 0 ? (
                                      transactions.map((ts, index) => (
                                          <div key={index} className="transaction-item">
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
               
                
                </section>
    </div>
    </div>
    </main>
    <Footer />
    </section>
    
  )
}

export default Home
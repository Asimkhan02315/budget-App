
import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Budget from './components/Budget';

function App() {

  const [budgetdata, setBudgetData] = useState([])
  const [refresh, setRefresh] = useState(true);
  const [totalBudget, setTotalBudget] = useState()
  const [incomeBudget, setIncomeBudget] = useState(0)
  const [outcomeBudget, setOutcomeBudget] = useState(0)

  useEffect(() => {

    axios.get('http://localhost:5000/income')
      .then((res) => {
        console.log(res.data)
        setBudgetData(res.data)

        let total = res.data.reduce((acc, value) => (acc + parseInt(value.amount)), 0)
        setTotalBudget(total)
        let incomeTotal = 0;
        res.data.reduce((acc, value) => {
          if (acc?.type == 'income') {
            incomeTotal += parseInt(acc.amount)
          } else if (value?.type == 'income') {
            incomeTotal += parseInt(value.amount)
          }
        })
        setIncomeBudget(incomeTotal)
        setOutcomeBudget(total - incomeTotal)

      })
  }, [refresh])


  return (
    <>

      <div className="container mt-3 bg-info">
        <h1>My Budget</h1>
        <div className='row mt-3'>
          <div className='col-sm'>
            <span>Total Budget: Rs.{totalBudget}</span>
          </div>
          <div className='col-sm'>
            <span>Total Income: +Rs.{incomeBudget}</span>
          </div>
          <div className='col-sm'>
            <span>Total Outcome: -Rs.{outcomeBudget}</span>
          </div>
        </div>
      </div>



      <div className='container mt-3'>


        <table className="table" border={'2'}>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Type</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>

          {budgetdata && budgetdata?.map((value, index) => {
            return (

              <tbody>
                <tr>
                  <th scope="row" key={index}>{index + 1}</th>
                  <td>{value.type}</td>
                  <td>{value.amount}</td>
                  <td>{value.date}</td>
                </tr>
              </tbody>
            )
          })}
        </table>
        <Budget refresh={refresh} setRefresh={setRefresh} />
      </div>

    </>
  );
}

export default App;
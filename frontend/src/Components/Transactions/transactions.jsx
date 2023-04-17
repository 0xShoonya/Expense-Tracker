import React, { useState } from "react";
import axios from "axios"
import IncomeForm from "../Forms/incomeForm";
import ExpenseForm from "../Forms/expenseForm";
import "./transactions.css"

function Transactions() {
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  const handleIncomeSubmit = async (income) => {
    try {
      const response = await axios.post('http://localhost:3700/api/v1/add-income', income);
      setIncomeList([...incomeList, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExpenseSubmit = async (expense) => {
    try {
        const response = await axios.post('http://localhost:3700/api/v1/add-expense', expense);
        setExpenseList([...expenseList, response.data]);
      } catch (error) {
        console.error(error);
      }
  };

  const handleIncomeDelete = async (index) => {
    try {
      const idToDelete = incomeList[index]._id;
      await axios.delete(`http://localhost:3700/api/v1/delete-income/${idToDelete}`);
      const updatedList = [...incomeList];
      updatedList.splice(index, 1);
      setIncomeList(updatedList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExpenseDelete = (index) => {
    const updatedList = [...expenseList];
    updatedList.splice(index, 1);
    setExpenseList(updatedList);
  };

  const handleIncomeEdit = async (index, updatedIncome) => {
    try {
      const idToUpdate = incomeList[index]._id;
      const response = await axios.put(`http://localhost:3700/update-income/${idToUpdate}`, updatedIncome);
      const updatedList = [...incomeList];
      updatedList[index] = response.data;
      setIncomeList(updatedList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExpenseEdit = (index, updatedExpense) => {
    const updatedList = [...expenseList];
    updatedList[index] = updatedExpense;
    setExpenseList(updatedList);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h3>Add Income</h3>
          <IncomeForm onSubmit={handleIncomeSubmit} />
          <hr />
          <h3>Income List</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {incomeList.map((income, index) => (
                <tr key={index}>
                  <td>{income.date}</td>
                  <td>{income.category}</td>
                  <td>{income.amount}</td>
                  <td>{income.description}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleIncomeDelete(index)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary btn-sm ml-2"
                      onClick={() => handleIncomeEdit(index, income)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h3>Add Expense</h3>
          <ExpenseForm onSubmit={handleExpenseSubmit} />
          <hr />
          <h3>Expense List</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenseList.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.date}</td>
                  <td>{expense.category}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.description}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleExpenseDelete(index)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary btn-sm ml-1"
                      onClick={() => handleExpenseEdit(index, expense)}
                      >
                      Edit
                      </button>
                      </td>
                      </tr>
                      ))}
                      </tbody>
                      </table>
                      </div>
                      </div>
                      <div className="row">
                      <div className="col-md-6">
                      <h3>Monthly Table</h3>
                      {/* Add code for Monthly Table */}
                      </div>
                      <div className="col-md-6">
                      <h3>Yearly Table</h3>
                      {/* Add code for Yearly Table */}
                      </div>
                      </div>
                      </div>
                      );
                      }
                      
                      export default Transactions;
                      
                      
                      
                      
                      
                      

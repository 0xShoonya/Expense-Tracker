import React, { useState } from "react";

const IncomeForm = ({ onSubmit }) => {
  const [income, setIncome] = useState({
    date: "",
    category: "",
    amount: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setIncome((prevIncome) => ({ ...prevIncome, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(income);
    setIncome({
      date: "",
      category: "",
      amount: "",
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="income-date">Date:</label>
        <input
          type="date"
          id="income-date"
          name="date"
          value={income.date}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="income-category">Category:</label>
        <select
          id="income-category"
          name="category"
          value={income.category}
          onChange={handleInputChange}
          className="form-control"
        >
          <option value="">-- Select Category --</option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="stocks">Stocks</option>
          <option value="others">Others</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="income-amount">Amount:</label>
        <input
          type="number"
          id="income-amount"
          name="amount"
          value={income.amount}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="income-description">Description:</label>
        <input
          type="text"
          id="income-description"
          name="description"
          value={income.description}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};

export default IncomeForm;

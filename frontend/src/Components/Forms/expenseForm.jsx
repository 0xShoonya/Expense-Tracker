import React, { useState } from "react";

function ExpenseForm(props) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("food");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({ date, category, amount, description });
    setDate("");
    setCategory("food");
    setAmount("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <select
          className="form-control"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          required
        >
          <option value="food">Food</option>
          <option value="rent">Rent</option>
          <option value="transportation">Transportation</option>
          <option value="others">Others</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
      </div>
      <div className="form-group">
        <label>Amount:</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;

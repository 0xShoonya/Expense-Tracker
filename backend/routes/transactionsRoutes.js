const express = require("express");
const router = express.Router();

const {
  addIncome,
  deleteIncome,
  getIncome,
} = require("../controllers/incomeController");

const {
  addExpense,
  deleteExpense,
  getExpense,
} = require("../controllers/expenseControllers");
const isAuthenticated = require("../middlewares/auth");

router
  .post("/add-income", isAuthenticated, addIncome)
  .get("/get-income", isAuthenticated, getIncome)
  .delete("/delete-income/:id", isAuthenticated, deleteIncome);

router
  .post("/add-expense", isAuthenticated, addExpense)
  .get("/get-expense", isAuthenticated, getExpense)
  .delete("/delete-expense/:id", isAuthenticated, deleteExpense);

module.exports = router;

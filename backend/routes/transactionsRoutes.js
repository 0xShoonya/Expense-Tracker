const express = require("express");
const router = express.Router();

const {
  addIncome,
  deleteIncome,
  getIncome,
  editIncome,
  monthlyIncomeExpense,
} = require("../controllers/transactionControllers");

const {
  addExpense,
  deleteExpense,
  getExpense,
} = require("../controllers/transactionControllers");
const isAuthenticated = require("../middlewares/auth");

router
  .post("/add-income", isAuthenticated, addIncome)
  .get("/get-income", isAuthenticated, getIncome)
  .delete("/delete-income/:id", isAuthenticated, deleteIncome)
  .put("/edit-income/:id", isAuthenticated, editIncome);

router
  .post("/add-expense", isAuthenticated, addExpense)
  .get("/get-expense", isAuthenticated, getExpense)
  .delete("/delete-expense/:id", isAuthenticated, deleteExpense);

router.get("/monthly-income-expense", isAuthenticated, monthlyIncomeExpense);

module.exports = router;

const Expense = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;

    //validatons ...
    if (!amount || !category || !date || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const expense = await Expense.create({
      amount,
      category,
      date,
      description,
    });
    res.status(201).json({ message: "Expense added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add Expense." });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expense = await Expense.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    await expense.destroy();
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

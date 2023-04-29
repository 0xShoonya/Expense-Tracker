const { Op } = require("sequelize");
const Expense = require("../models/expenseModel");
const Income = require("../models/incomeModel");
const sequelize = require("../util/database");

exports.addExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;

    //validatons ...
    if (!amount || !category || !date || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userId = req.user.dataValues.id;
    const expense = await Expense.create({
      amount,
      category,
      date,
      description,
      userId,
    });
    res.status(201).json({ expense, message: "Expense added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add Expense." });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const userId = req.user.dataValues.id;
    const expense = await Expense.findAll({
      where: {
        userId: userId,
      },
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

exports.addIncome = async (req, res) => {
  try {
    const { date, category, amount, description } = req.body;

    //validatons ...
    if (!amount || !category || !date || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userId = req.user.dataValues.id;

    const income = await Income.create({
      amount,
      date,
      category,
      description,
      userId,
    });
    res.status(201).json({ income });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add income." });
  }
};

exports.getIncome = async (req, res) => {
  try {
    const userId = req.user.dataValues.id;
    // console.log(req.user.datavalues.id);
    const income = await Income.findAll({
      where: {
        userId: userId,
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(income);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByPk(req.params.id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    await income.destroy();
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editIncome = async (req, res) => {
  const { id } = req.params;
  const { amount, date, category, description } = req.body;

  try {
    const income = await Income.findByPk(id);

    income.amount = amount;
    income.date = date;
    income.category = category;
    income.description = description;

    await income.save();

    res.status(200).json(income);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.monthlyIncomeExpense = async (req, res) => {
  try {
    console.log(req.query.month);
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);
    console.log(month);
    console.log(year);

    const income = await Income.findOne({
      attributes: [[sequelize.fn("sum", sequelize.col("amount")), "total"]],
      where: {
        userId: req.user.dataValues.id,
        date: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn("MONTH", sequelize.col("date")),
              parseInt(month)
            ),
            sequelize.where(
              sequelize.fn("YEAR", sequelize.col("date")),
              parseInt(year)
            ),
          ],
        },
      },
    });

    const expense = await Expense.findOne({
      attributes: [[sequelize.fn("sum", sequelize.col("amount")), "total"]],
      where: {
        userId: req.user.dataValues.id,
        date: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn("MONTH", sequelize.col("date")),
              parseInt(month)
            ),
            sequelize.where(
              sequelize.fn("YEAR", sequelize.col("date")),
              parseInt(year)
            ),
          ],
        },
      },
    });

    const totalIncome = income.dataValues.total || 0;
    const totalExpense = expense.dataValues.total || 0;

    res.json({ totalIncome, totalExpense });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const Income = require("../models/incomeModel");

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

const Income = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
  try {
    //validatons ...

    const { amount, category, date, description } = req.body;
    const income = await Income.create({ amount, category, date, description });
    res.status(201).json({ message: "Income added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add income." });
  }
};

exports.getIncome = async(req, res) => {

  try {
    
  } catch (error) {
    
  }
}
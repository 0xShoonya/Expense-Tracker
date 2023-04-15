const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Income = require("./incomeModel");
const Expense = require("./expenseModel");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
    },
  },
  { freezeTableName: true }
);

User.hasMany(Expense, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Expense.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Income, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Income.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = User;

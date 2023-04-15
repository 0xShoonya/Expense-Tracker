const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Income = sequelize.define(
  "income",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.TEXT,
    },
    // Define foreign key to associate income with user
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  },
  {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  }
);

// Define association with User model
// Income.belongsTo(User);

module.exports = Income;

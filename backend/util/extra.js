// Authentication routes
app.post("/api/v1/auth/register", authController.register);
app.post("/api/v1/auth/login", authController.login);

// Income routes
app.get("/api/v1/incomes", authMiddleware, incomeController.getAllIncomes);
app.post("/api/v1/incomes", authMiddleware, incomeController.createIncome);

// Expense routes
app.get("/api/v1/expenses", authMiddleware, expenseController.getAllExpenses);
app.post("/api/v1/expenses", authMiddleware, expenseController.createExpense);

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // extract the JWT token from the Authorization header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: no token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Authentication failed: invalid token" });
    }
    req.user = decoded.user;
    next();
  });
};

module.exports = authMiddleware;

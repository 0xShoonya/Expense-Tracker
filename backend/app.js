const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./util/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Route imports
const userRoutes = require("./routes/userRoutes");
const transactionsRoutes = require("./routes/transactionsRoutes");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1", transactionsRoutes);

const PORT = process.env.PORT;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

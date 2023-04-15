const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();

exports.signUpUser = async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;

    // Check if the passwords match
    if (password !== confirm_password) {
      return res.status(400).send("Passwords do not match");
    }

    // Check if the email already exists in the database
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).send("Email already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); //10 salt rounds

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.logInUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide an email and a password" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and sign a JWT token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set token as HttpOnly cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    // Return token to the client
    return res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.logOutUser = async (req, res) => {
  // Clear token cookie
  res.clearCookie("token");
  // Send response to client
  res.status(200).json({ message: "Logged out successfully" });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // 4. Generate a password reset token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // 5. Set the password reset token and expiry time on the user's record in the database
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3 * 60 * 60 * 1000;
  await user.save();

  // 6. Send an email to the user with instructions for resetting their password
  const resetUrl = `http://${req.headers.host}/reset-password/${resetToken}`;
  // Send email here

  // 7. Send a response to the client with a success message
  res
    .status(200)
    .json({ message: "An email has been sent with further instructions" });
};

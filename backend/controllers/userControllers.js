const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
const sendMail = require("../util/sendMail");

dotenv.config();

//signup user
exports.signUpUser = async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
      return res.status(400).send("Passwords do not match");
    }

    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).send("Email already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); //10 salt rounds

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

//login user
exports.logInUser = async (req, res) => {
  const { email, password } = req.body;

  //validations
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide an email and a password" });
  }

  try {
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

//log out user
exports.logOutUser = async (req, res) => {
  // Clear token cookie
  res.clearCookie("token");
  // Send response to client
  res.status(200).json({ message: "Logged out successfully" });
};

//forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Generate a password reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //  Set the password reset token and expiry time on the user's record in the database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3 * 60 * 60 * 1000;
    await user.save();

    // Send an email to the user with instructions for resetting their password
    const resetUrl = `http://${req.headers.host}/api/v1/users/reset-password/${resetToken}`;

    // Send email
    sendMail(
      email,
      "Reset password",
      `Click the link to reset your password: ${resetUrl}`
    );

    res
      .status(200)
      .json({ message: "An email has been sent with further instructions" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//reset password
exports.resetPassword = async (req, res) => {
  try {
    // Get the password reset token from the request params
    const { token } = req.params;

    // Find the user with the password reset token and check if it has expired
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      // If the token is invalid or has expired, return an error message
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired" });
    }

    // Update the user's password with the new password from the request body
    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res
      .status(200)
      .json({ message: "Your password has been successfully reset" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register user
const registerUser = async (req, res) => {
  try {
    // Get data from frontend
    const { name, email, password } = req.body;

    // Check if all fields exist
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to DB
    await user.save();

    // Send success response
    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
};
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  const { name, email, password, phone_number } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with the same email already exists' });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
      phone_number,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ success: true, message: 'Signed up successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to sign up' });
  }
};

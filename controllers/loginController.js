const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/Login');
const bcrypt = require('bcrypt');
const axios = require('axios');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Validate the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Make an external API call to fetch the message string
    const response = await axios.get('https://api.catboys.com/catboy');
    const message = response.data.message;

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, config.secretKey, { expiresIn: config.expiresIn });

    return res.status(200).json({ success: true, message, token });
  } catch (error) {
    return res.status(500).json({ success: false ,message: 'Failed to login'});
  }
};

module.exports = {
  loginUser,
};

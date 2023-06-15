const User = require('../models/Login');

exports.editPhoneNumber = async (req, res) => {
  const { phone_number } = req.body;
  const userId = req.userId;

  try {
    // Retrieve the user's information from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false,
         message: 'User not found\n' });
    }

    // Update the user's phone number
    user.phone_number = phone_number;

    // Save the updated user information
    await user.save();

    return res.status(200).json({ success: true, message: 'Phone number changed/added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

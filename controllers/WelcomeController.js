const Welcome = require('../models/Welcome');

exports.getWelcomeMessage = (req, res) => {
  const welcomeMessage = {
    success: true,
    message: "API successfully called",
  };

  const formattedResponse = JSON.stringify(welcomeMessage, null, 2);
 res.status(200).send(formattedResponse);
};

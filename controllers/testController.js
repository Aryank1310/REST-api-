const Test = require('../models/test');
const User = require('../models/users');

exports.submitTest = async (req, res) => {
  const { userId, testId, questionId, answers } = req.body;

  try {
    // Check if the user has already taken the test
    const existingUser = await User.findById(userId);
    if (existingUser.testScores.some(score => score.testId === testId)) {
      return res.status(400).json({ success: false, message: 'User has already taken the test' });
    }

    // Retrieve the test from the database
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    // Calculate the score based on the user's answers and correct answers from the test
    let score = 0;
    for (let i = 0; i < questionId.length; i++) {
      const question = test.questions.find(q => q.questionId === questionId[i]);
      if (question) {
        const correctAnswers = question.correctAnswers;
        const userAnswers = answers[i];
        if (compareArrays(correctAnswers, userAnswers)) {
          score++;
        }
      }
    }

    // Store the user's responses and test details
    existingUser.testScores.push({ testId, score });
    await existingUser.save();

    // Send the response
    return res.status(200).json({ success: true, userId, testId, score });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Helper function to compare arrays
const compareArrays = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (!arr2.includes(arr1[i])) {
      return false;
    }
  }

  
  return true;
};


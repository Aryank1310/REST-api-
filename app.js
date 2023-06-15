const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://aryank1310:RdXLgEB8yiyeNopF@questionnaire.iyad2az.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  //Middleware
const express = require('express');
const app = express();

app.use(express.json());

// Routes
const welcomeRoutes = require('./routes/welcome');
const signupRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const editRoutes = require('./routes/editphone');
const testRoutes = require('./routes/testRoutes');


//Register Routes
app.use('/api/welcome', welcomeRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/editphone', editRoutes);
app.use('/api/submit-test', testRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
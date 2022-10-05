const signupServices = require('../services/signup');

const signup = async (req, res) => {
  const { user_name, birth_date, height, phone_number } = req.body;
  try {
    if (typeof user_name !== 'string') {
      const err = new Error('user_name must be a string');
      err.status = 400;
      throw err;
    }
    if (typeof birth_date !== 'string') {
      const err = new Error('birth_date must be a string');
      err.status = 400;
      throw err;
    }
    if (typeof height !== 'number') {
      const err = new Error('height must be a number');
      err.status = 400;
      throw err;
    }
    if (typeof phone_number !== 'string') {
      const err = new Error('phone_number must be a string');
      err.status = 400;
      throw err;
    }
    await signupServices.signup(user_name, birth_date, height, phone_number);
    res.status(201).json({ message: 'User SignUp Success' });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
};

module.exports = { signup };

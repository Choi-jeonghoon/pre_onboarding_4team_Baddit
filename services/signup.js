const signupDao = require('../models/signup');

const signup = async (user_name, birth_date, height, phone_number) => {
  const phonenumberCheck = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  if (phonenumberCheck.test(phone_number)) {
    phone_number = phone_number.split('-').join('');
  }
  if (
    !(
      phone_number.split('').length === 10 ||
      phone_number.split('').length === 11
    )
  ) {
    const err = new Error(
      'Length of phone_number is must be between 10 and 11'
    );
    err.status = 400;
    throw err;
  }
  await signupDao.signup(user_name, birth_date, height, phone_number);
};

module.exports = { signup };

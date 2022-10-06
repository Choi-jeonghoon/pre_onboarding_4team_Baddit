const signupServices = require('../services/signup');

const signup = async (req, res) => {
  const { user_name, birth_date, height, phone_number } = req.body;

  try {
    const hasKey = {
      user_name: false,
      birth_date: false,
      height: false,
      phone_number: false,
    };

    /** 받아온 데이터에 키 + 벨류 값이 존재하는지 확인하는 코드 */
    const requireKey = Object.keys(hasKey);

    Object.entries(req.body).forEach(([key, value]) => {
      if (requireKey.includes(key) && value) {
        hasKey[key] = true;
      }
    });

    /** 받아온 데이터에 키 + 벨류 값이 없을때 에러를 표시해주는 코드 */
    const hasKeyArray = Object.entries(hasKey);
    for (let i = 0; i < hasKeyArray.length; i++) {
      const [key, value] = hasKeyArray[i];
      if (!value) {
        const err = new Error(`${key} must be entered`);
        err.status = 400;
        throw err;
      }
    }

    /** 받아온 데이터의 타입을 확인해서 틀렸으면 에러를 표시해주는 코드 */
    Object.entries(req.body).forEach(([key, value]) => {
      if (key === 'height') {
        if (typeof value !== 'number') {
          const err = new Error(`${key} must be a number`);
          err.status = 400;
          throw err;
        }
      } else {
        if (typeof value !== 'string') {
          const err = new Error(`${key} must be a string`);
          err.status = 400;
          throw err;
        }
      }
    });

    await signupServices.signup(user_name, birth_date, height, phone_number);
    res.status(201).json({ message: 'User SignUp Success' });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err.message);
  }
};

module.exports = { signup };

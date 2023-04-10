const User = require('../models/user.model');
const accountNumberRandom = require('../numberRandom');

exports.register = async (req, res) => {
  try {
    const { name, password } = req.body;

    const accountNumber = accountNumberRandom();

    const amount = 1000;

    const user = await User.create({
      name,
      password,
      accountNumber,
      amount,
    });

    res.status(201).json({
      status: 'success',
      message: 'The user  created succesfull',
      user: {
        id: user.id,
        name: user.name,
        accountNumber: user.accountNumber,
        amount: user.amount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { accountNumber, password } = req.body;

    const user = await User.findOne({
      where: {
        accountNumber,
        status: true,
        password,
      },
    });

    if (!user) {
      return res.status(404).json({
        estatus: 'error',
        message: `incorrect  User data not found , 404`,
      });
    }

    return res.json({
      status: 'success',
      message: 'logged in User Welcome  the proyect bank',
      user: {
        id: user.id,
        name: user.name,
        accountNumber: user.accountNumber,
        amount: user.amount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
      error,
    });
  }
};

exports.getHistory = async (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'transfer history completed',
  });
};

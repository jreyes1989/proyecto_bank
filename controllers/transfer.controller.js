const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');

exports.getTransfer = async (req, res) => {
  try {
    const { amount, accountNumber, senderUserId } = req.body;
    const userReceiver = await User.findOne({
      where: {
        status: true,
        accountNumber,
      },
    });

    const receiverUserId = userReceiver.id;

    const userMakeTransfer = await User.findOne({
      where: {
        status: true,
        id: senderUserId,
      },
    });

    if (amount > userMakeTransfer) {
      return res.status(400).json({
        status: 'error',
        message: 'there is something that is not working in the client request',
      });
    }

    if (receiverUserId === senderUserId) {
      return res.status(400).json({
        status: 'error',
        message: 'there is something that is not working in the client request',
      });
    }

    const newAmountUserMakeTransfer = userMakeTransfer.amount - amount;
    const newAmountUserReceiver = userReceiver.amount + amount;

    await userMakeTransfer.update({
      amount: newAmountUserMakeTransfer,
    });

    await userReceiver.update({
      amount: newAmountUserReceiver,
    });

    await Transfer.create({
      amount,
      senderUserId,
      receiverUserId: userReceiver.id,
    });

    res.status(200).json({
      status: 'success',
      message: 'Transfer successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
      error,
    });
  }
};

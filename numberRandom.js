const accountNumberRandom = () => {
  let accountN = [];

  for (let i = 0; i < 10; i++) {
    accountN.push(Math.floor(Math.random() * 10));
  }

  return Number(accountN.join(''));
};

module.exports = accountNumberRandom;

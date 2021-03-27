const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

const getUniqueRandomNumbers = (length, min, max) => {
  const arr = [];
  while (arr.length < length) {
    const number = getRandomInt(min, max);
    if (arr.indexOf(number) === -1) arr.push(number);
  }
  return arr;
};

const isEscEvent = (evt) => evt.key === ('Escape' || 'Esc');

export {
  getUniqueRandomNumbers,
  getRandomInt,
  isEscEvent
};

const ESC_KEYDOWN = ['Escape', 'Esc'];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

const getUniqueRandomNumbers = (length, min, max) => {
  const arr = [];
  while (arr.length < length) {
    const number = getRandomInt(min, max);
    if (arr.indexOf(number) === -1) {
      arr.push(number)
    }
  }
  return arr;
};

const isEscEvent = (evt) => {

  return (evt.key === ESC_KEYDOWN[0] || evt.key === ESC_KEYDOWN[1]);
};

export {
  getUniqueRandomNumbers,
  getRandomInt,
  isEscEvent
};

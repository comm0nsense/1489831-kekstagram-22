const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

// Может в последующих домках нужна - длина коммента и т.п.
// const checkStringLength = (string, length) => string.length <= length;
// checkStringLength; // for ESLint Validation


const getUniqueRandomNumbers = (length, min, max) => {
  let arr = [];
  while (arr.length < length) {
    const number = getRandomInt(min, max);
    if (arr.indexOf(number) === -1) arr.push(number);
  }
  return arr;
}
// Функция возвращающает случайное значение из массива
const getRandomArrayElement = (array) => {
  const randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
}

export {
  getUniqueRandomNumbers,
  getRandomArrayElement,
  getRandomInt,
  isEscEvent
};

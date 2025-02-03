const keyCode = {
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  TAB: 'Tab'
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => ++lastGeneratedId;
};

const numDecline = (number, nominative, genitiveSingular, genitivePlural) => {
  const mod10 = number % 10;
  const mod100 = number % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `${number} ${nominative}`; // 1 яблоко
  } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${number} ${genitiveSingular}`; // 2,3,4 яблока
  } else {
    return `${number} ${genitivePlural}`; // 5-20, 25, 30 яблок
  }
};

const isEscapeKey = (event) => event.key === keyCode.ESCAPE;
const isEnterKey = (event) => event.key === keyCode.ENTER;
const isTabKey = (event) => event.key === keyCode.TAB;

const clearElement = (element) => {
  element.innerHTML = '';
};

export {
  getRandomInteger,
  getRandomArrayElement,
  createIdGenerator,
  isEscapeKey,
  isEnterKey,
  isTabKey,
  clearElement,
  numDecline
};

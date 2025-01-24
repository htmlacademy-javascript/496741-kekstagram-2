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
  clearElement
};

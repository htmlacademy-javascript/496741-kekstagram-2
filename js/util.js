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

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

const isTabKey = (evt) => evt.key === 'Tab';

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

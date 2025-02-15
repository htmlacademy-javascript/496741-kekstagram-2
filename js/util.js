const TIMEOUT_DEFAULT_DELAY = 500;
const keyCode = {
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  TAB: 'Tab'
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

function debounce (callback, timeoutDelay = TIMEOUT_DEFAULT_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export {
  isEscapeKey,
  isEnterKey,
  isTabKey,
  clearElement,
  numDecline,
  debounce
};

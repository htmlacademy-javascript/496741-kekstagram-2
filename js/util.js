const TIMEOUT_DEFAULT_DELAY = 500;
const keyCode = {
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  TAB: 'Tab'
};

const changeEndingNoun = (number, nominative, genitiveSingular, genitivePlural) => {
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

const shuffleArray = (photos) => {
  const shuffledPhotos = photos.slice();
  for (let i = shuffledPhotos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledPhotos[i], shuffledPhotos[j]] = [shuffledPhotos[j], shuffledPhotos[i]]; // Меняем элементы местами
  }
  return shuffledPhotos;
};

const isEscapeKey = (event) => event.key === keyCode.ESCAPE;

const clearElement = (element) => {
  element.innerHTML = '';
};

const debounce = (callback, timeoutDelay = TIMEOUT_DEFAULT_DELAY) => {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, timeoutDelay);
  };
};


export {
  isEscapeKey,
  clearElement,
  changeEndingNoun,
  debounce,
  shuffleArray
};

const ALERT_SHOW_TIME = 5000;

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '20px';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {
  isEscapeKey,
  isEnterKey,
  isTabKey,
  clearElement,
  numDecline,
  showAlert
};

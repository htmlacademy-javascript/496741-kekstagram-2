function checkLength(inputString, length) {
  return inputString.length <= length;
}

function checkForPalindrome(inputString) {

  const newString = inputString.replaceAll(' ', '').toLowerCase();
  let i = 0;

  while (i <= (newString.length / 2 - 1)) {
    if (newString[i] !== newString[newString.length - 1 - i]) {
      return false;
    }
    i++;
  }

  return true;
}

function getNumberFromString(inputString) {
  const newString = inputString.toString();
  let number = '';
  for (let i = 0; i < newString.length; i++) {
    number += isNaN(parseInt(newString[i], 10)) ? '' : newString[i];
  }
  return parseInt(number, 10);
}

checkLength('случайная строка', 18);
checkLength('случайная строка', 0);
checkForPalindrome('Топот');
checkForPalindrome('Не палиндром');
checkForPalindrome('Лёша на полке клопа нашёл ');
getNumberFromString('2023 год');
getNumberFromString('ECMAScript 2022');
getNumberFromString('1 кефир, 0.5 батона');
getNumberFromString('агент 007');
getNumberFromString('а я томат');
getNumberFromString(2023);
getNumberFromString(-1);
getNumberFromString(1.5);

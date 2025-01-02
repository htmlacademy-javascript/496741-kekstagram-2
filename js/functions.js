function checkLength(string, length) {
  return string.length <= length;
}

function checkForPalindrome(string) {

  const newString = string.replaceAll(' ', '').toLowerCase();
  let i = 0;

  while (i <= (newString.length / 2 - 1)) {
    if (newString[i] !== newString[newString.length - 1 - i]) {
      return false;
    }
    i++;
  }

  return true;
}

function getNumberFromString(string) {
  const NEW_STRING = string.toString();
  let number = '';
  for (let i = 0; i < NEW_STRING.length; i++) {
    number += isNaN(parseInt(NEW_STRING[i], 10)) ? '' : NEW_STRING[i];
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

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

checkLength('случайная строка', 18);
checkLength('случайная строка', 0);
checkForPalindrome('Топот');
checkForPalindrome('Не палиндром');
checkForPalindrome('Лёша на полке клопа нашёл ');

const checkLength = (inputString, length) => inputString.length <= length;

const checkForPalindrome = (inputString) => {

  const newString = inputString.replaceAll(' ', '').toLowerCase();
  let i = 0;

  while (i <= (newString.length / 2 - 1)) {
    if (newString[i] !== newString[newString.length - 1 - i]) {
      return false;
    }
    i++;
  }

  return true;
};

const getNumberFromString = (inputString) => {

  const newString = inputString.toString();
  let number = '';
  for (let i = 0; i < newString.length; i++) {
    number += isNaN(parseInt(newString[i], 10)) ? '' : newString[i];
  }
  return parseInt(number, 10);
};

const parseTime = (hours) => {
  const arrayHours = hours.split(':');
  return arrayHours[0] * 60 + Number(arrayHours[1]);
};

const isMeetingInWorkingHours = (
  startWorkingTime,
  endWorkingTime,
  startMeetingTime,
  durationOfMeeting
) => {
  const startWorkingInMinutes = parseTime(startWorkingTime);
  const endWorkingInMinutes = parseTime(endWorkingTime);
  const startMeetingInMinutes = parseTime(startMeetingTime);

  return startWorkingInMinutes <= startMeetingInMinutes
    && (startMeetingInMinutes + durationOfMeeting) <= endWorkingInMinutes;
};

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
isMeetingInWorkingHours('08:00', '17:30', '14:00', 90);
isMeetingInWorkingHours('8:0', '10:0', '8:0', 120);
isMeetingInWorkingHours('08:00', '14:30', '14:00', 90);
isMeetingInWorkingHours('14:00', '17:30', '08:0', 90);
isMeetingInWorkingHours('8:00', '17:30', '08:00', 900);

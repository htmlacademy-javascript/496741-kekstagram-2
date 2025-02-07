const RESIZING_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const imgElement = document.querySelector('.img-upload__preview img');

let currenScaleValue = parseFloat(scaleValueElement.value.replace('%', ''));

const onSmallerButtonClick = () => {
  if (currenScaleValue > MIN_SCALE_VALUE) {
    currenScaleValue = currenScaleValue - RESIZING_STEP;
    scaleValueElement.value = `${currenScaleValue}%`;
    imgElement.style.transform = `scale(${currenScaleValue * 0.01})`;
  }
};

const onBiggerButtonClick = () => {
  if (currenScaleValue < MAX_SCALE_VALUE) {
    currenScaleValue = currenScaleValue + RESIZING_STEP;
    scaleValueElement.value = `${currenScaleValue}%`;
    imgElement.style.transform = `scale(${currenScaleValue * 0.01})`;
  }
};

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

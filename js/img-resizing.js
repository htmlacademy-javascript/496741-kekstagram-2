const RESIZING_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const imgElement = document.querySelector('.img-upload__preview img');

let currenScaleValue = parseFloat(scaleValueElement.value);

const getScaleValue = (scaleValue) => {
  scaleValueElement.value = `${scaleValue}%`;
  imgElement.style.transform = `scale(${scaleValue * 0.01})`;
};

const resetScaleValue = () => getScaleValue(MAX_SCALE_VALUE);

const configureImgResizing = () => {
  const pressTheButton = (isIncrease) => {
    if (isIncrease && currenScaleValue < MAX_SCALE_VALUE) {
      currenScaleValue += RESIZING_STEP;
    }

    if (!isIncrease && currenScaleValue > MIN_SCALE_VALUE) {
      currenScaleValue -= RESIZING_STEP;
    }

    getScaleValue(currenScaleValue);
  };

  const onSmallerButtonClick = () => pressTheButton(false);

  const onBiggerButtonClick = () => pressTheButton(true);

  smallerButtonElement.addEventListener('click', onSmallerButtonClick);
  biggerButtonElement.addEventListener('click', onBiggerButtonClick);
};

export { configureImgResizing, resetScaleValue };

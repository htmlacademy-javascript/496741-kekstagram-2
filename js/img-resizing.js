const RESIZING_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const configureImgResizing = () => {
  const smallerButtonElement = document.querySelector('.scale__control--smaller');
  const biggerButtonElement = document.querySelector('.scale__control--bigger');
  const scaleValueElement = document.querySelector('.scale__control--value');
  const imgElement = document.querySelector('.img-upload__preview img');

  let currenScaleValue = parseFloat(scaleValueElement.value.replace('%', ''));

  const pressTheButton = (isIncrease) => {
    if (isIncrease && currenScaleValue < MAX_SCALE_VALUE) {
      currenScaleValue += RESIZING_STEP;
    } else if (!isIncrease && currenScaleValue > MIN_SCALE_VALUE) {
      currenScaleValue -= RESIZING_STEP;
    }

    scaleValueElement.value = `${currenScaleValue}%`;
    imgElement.style.transform = `scale(${currenScaleValue * 0.01})`;
  };

  const onSmallerButtonClick = (evt) => pressTheButton(evt.target === biggerButtonElement);

  const onBiggerButtonClick = (evt) => pressTheButton(evt.target === biggerButtonElement);

  smallerButtonElement.addEventListener('click', onSmallerButtonClick);
  biggerButtonElement.addEventListener('click', onBiggerButtonClick);
};

export { configureImgResizing };

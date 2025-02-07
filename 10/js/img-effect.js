const wrapperElement = document.querySelector('.img-upload__wrapper');
const sliderElement = wrapperElement.querySelector('.effect-level__slider');
const sliderFieldsetElement = wrapperElement.querySelector('.img-upload__effect-level');
const sliderInputElement = wrapperElement.querySelector('.effect-level__value');
const imgElement = wrapperElement.querySelector('.img-upload__preview img');
const effectsListElement = wrapperElement.querySelector('.effects__list');


const imgEffects = {
  chrome: {
    getFilter(value) {
      return `grayscale(${value})`;
    },
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    getFilter(value) {
      return `sepia(${value})`;
    },
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    getFilter(value) {
      return `invert(${value}%)`;
    },
    min: 0,
    max: 100,
    step: 1
  },
  phobos: {
    getFilter(value) {
      return `blur(${value}px)`;
    },
    min: 0,
    max: 3,
    step: 0.1,
  },
  heat: {
    getFilter(value) {
      return `brightness(${value})`;
    },
    min: 1,
    max: 3,
    step: 0.1,
  }
};

noUiSlider.create(sliderElement, {
  start:0,
  connect: 'lower',
  range: {
    min: 0,
    max: 1
  },
  step: 0.1,
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  }
});

sliderFieldsetElement.classList.add('hidden');

sliderElement.noUiSlider.on('update', () => {
  sliderInputElement.value = sliderElement.noUiSlider.get();
});

const onEffectsListChange = (evt) => {
  const effect = evt.target.value;

  if (effect === 'none') {
    sliderFieldsetElement.classList.add('hidden');
  } else {

    sliderFieldsetElement.classList.remove('hidden');

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: imgEffects[effect].min,
        max: imgEffects[effect].max
      },
      start: imgEffects[effect].max,
      step: imgEffects[effect].step
    });

    sliderElement.noUiSlider.on('update', () => {
      imgElement.style.filter = imgEffects[effect].getFilter(sliderInputElement.value);
    });
  }
};

effectsListElement.addEventListener('change', onEffectsListChange);

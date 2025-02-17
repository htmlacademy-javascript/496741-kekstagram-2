const ORIGINAL_EFFECT = 'none';
const MAX_SCALE_VALUE = 1;

const wrapperElement = document.querySelector('.img-upload__wrapper');
const sliderElement = wrapperElement.querySelector('.effect-level__slider');
const sliderFieldsetElement = wrapperElement.querySelector('.img-upload__effect-level');
const sliderInputElement = wrapperElement.querySelector('.effect-level__value');
const imgElement = wrapperElement.querySelector('.img-upload__preview img');
const effectsListElement = wrapperElement.querySelector('.effects__list');

const removeFilter = () => {
  sliderFieldsetElement.classList.add('hidden');
  imgElement.style.removeProperty('filter');
};

const removeImgEffect = () => {
  imgElement.style.transform = `scale(${MAX_SCALE_VALUE})`;
  removeFilter();
};

const getImgEffect = () => {

  const imgEffects = {
    none: {
      min: 0,
      max: 1,
      step: 0.1,
    },
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
    start: imgEffects[ORIGINAL_EFFECT].min,
    connect: 'lower',
    range: {
      min: imgEffects[ORIGINAL_EFFECT].min,
      max: imgEffects[ORIGINAL_EFFECT].max
    },
    step: imgEffects[ORIGINAL_EFFECT].step,
    format: {
      to: (value) => Number(value),
      from: (value) => parseFloat(value),
    }
  });

  const addFilter = (effect) => {
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
  };

  removeFilter();

  sliderElement.noUiSlider.on('update', () => {
    sliderInputElement.value = sliderElement.noUiSlider.get();
  });

  const onEffectsListChange = (evt) => {
    const effect = evt.target.value;

    if (effect === ORIGINAL_EFFECT) {
      removeFilter();
    } else {
      addFilter(effect);
    }
  };

  effectsListElement.addEventListener('change', onEffectsListChange);
};

export { getImgEffect, removeImgEffect };

/* global noUiSlider:readonly */
import { imageUploadForm } from './upload-image.js';

const image = document.querySelector('.img-upload__preview');
const effectsList = document.querySelector('.img-upload__effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectsSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

const effects = {
  none: {
    filter: 'none',
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'grayscale',
    unit: '',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'sepia',
    unit: '',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    filter: 'brightness',
    unit: '',
  },
};

const onEffectLevelChange = (filter) => {
  // console.log(filter);
  effectsSlider.noUiSlider.updateOptions({
    range: {
      min: effects[filter].min,
      max: effects[filter].max,
    },
    step: effects[filter].step,
    start: effects[filter].max,
  });

  effectsSlider.noUiSlider.on('update', (values, handle) => {
    // console.log(values[handle]);
    effectLevelValue.setAttribute('min', `${effects[filter].min}`);
    effectLevelValue.setAttribute('max', `${effects[filter].max}`);
    effectLevelValue.setAttribute('step', `${effects[filter].step}`);
    effectLevelValue.value = values[handle];
    const effectFilter = effects[filter].filter;
    const effectUnit = effects[filter].unit;
    image.style.filter = `${effectFilter}(${effectLevelValue.value}${effectUnit})`;
  });
};

const onEffectsListChange = (evt) => {
  image.className = 'img-upload__preview';
  const effect = evt.target.value;
  image.classList.add(`effects__preview--${effect}`);
  if (effect !== effects.none.filter) {
    sliderContainer.classList.remove('hidden');
    onEffectLevelChange(effect);
  } else {
    sliderContainer.classList.add('hidden');
  }
};

const enableFilter = () => {
  noUiSlider.create(effectsSlider, {
    range: {
      'min': 1,
      'max': 100,
    },
    start: 80,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderContainer.classList.add('hidden');
  effectsList.addEventListener('change', onEffectsListChange);
};


const disableFilter = () => {
  effectsSlider.noUiSlider.destroy();
  effectsList.removeEventListener('change', onEffectLevelChange);
  image.className = 'img-upload__preview';
  image.style.filter = '';
  imageUploadForm.querySelector('#effect-none').checked = true;
  effectLevelValue.removeAttribute('min');
  effectLevelValue.removeAttribute('max');
  effectLevelValue.removeAttribute('step');
  effectLevelValue.value = '';
}

export { enableFilter, disableFilter }

/* global noUiSlider:readonly */
import { imageUploadForm, imageUploadPreview } from './upload-image.js';

const sliderContainer = imageUploadForm.querySelector('.img-upload__effect-level');
const effectLevelSlider = imageUploadForm.querySelector('.effect-level__slider');
const effectsList = imageUploadForm.querySelector('.effects');
const effectLevelValue = imageUploadForm.querySelector('.effect-level__value');


const effects = {
  none: {
    filter: 'none',
  },
  chrome: {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    filter: 'grayscale',
    unit: '',
  },
  sepia: {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    filter: 'sepia',
    unit: '',
  },
  marvin: {
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    filter: 'brightness',
    unit: '',
  },
};


noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
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

const originalImage = () => {
  imageUploadPreview.removeAttribute('class');
  imageUploadPreview.classList.add('img-upload__preview');
  imageUploadPreview.style.filter = '';
}

const onEffectSelected = (evt) => {
  sliderContainer.classList.remove('hidden');
  originalImage();
  const effect = evt.target.value;
  // console.log(effect);
  if (effect !== effects.none.filter) {
    // console.log(effect);
    imageUploadPreview.classList.add(`effects__preview--${effect}`);

    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: effects[effect].min,
        max: effects[effect].max,
      },
      step: effects[effect].step,
      start: effects[effect].max,
    });

    const effectFilter = effects[effect].filter;
    effectLevelValue.value = effects[effect].max;
    const effectUnit = effects[effect].unit;
    imageUploadPreview.style.filter = `${effectFilter}(${effectLevelValue.value}${effectUnit})`;

    effectLevelSlider.noUiSlider.on('update', (values, handle) => {
      effectLevelValue.value = +values[handle];
      imageUploadPreview.style.filter = `${effectFilter}(${effectLevelValue.value}${effectUnit})`;
    });

  } else {
    // console.log(effect);
    sliderContainer.classList.add('hidden');
    originalImage();
  }
};

effectsList.addEventListener('change', onEffectSelected);

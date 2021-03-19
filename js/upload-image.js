import { isEscEvent } from './util.js';
const ImageScale = {
  MAX: 100,
  MIN: 25,
  RESCALE_STEP: 25,
  FULL_SIZE: 100,
}
const newImage = document.querySelector('#upload-file');
const imageUpload = document.querySelector('.img-upload__overlay');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadPreview = imageUpload.querySelector('.img-upload__preview');
const imageUploadCancel = document.querySelector('#upload-cancel');
const imageScale = imageUpload.querySelector('.scale');
const scaleControlValue = imageScale.querySelector('.scale__control--value');

// let currentScale = parseInt(scaleControlValue.value);

const onImageRescale = (evt) => {
  let currentScale = parseInt(scaleControlValue.value);

  if (evt.target.matches('.scale__control--smaller')) {
    currentScale = currentScale - ImageScale.RESCALE_STEP;
    if (currentScale >= ImageScale.MIN) {
      scaleControlValue.value = `${currentScale}`;
      imageUploadPreview.style.transform = `scale(${(currentScale) / ImageScale.FULL_SIZE})`;
    }
  } else {
    scaleControlValue.value = ImageScale.MIN;
    imageUploadPreview.style.transform = `scale(${(ImageScale.MIN) / ImageScale.FULL_SIZE})`;
  }

  if (evt.target.matches('.scale__control--bigger')) {
    currentScale = currentScale + ImageScale.RESCALE_STEP;
    if (currentScale <= ImageScale.MAX) {
      scaleControlValue.value = `${currentScale}`;
      imageUploadPreview.style.transform = `scale(${(currentScale) / ImageScale.FULL_SIZE})`;
    } else {
      scaleControlValue.value = ImageScale.MAX;
      imageUploadPreview.style.transform = `scale(${(ImageScale.MAX) / ImageScale.FULL_SIZE})`;
    }
  }
};

imageScale.addEventListener('click', onImageRescale);



const onUploadEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onCancelUpload();
  }
};

const onPictureUpload = () => {
  imageUpload.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onUploadEscKeydown);
  imageUploadCancel.addEventListener('click', onCancelUpload);
};

const onCancelUpload = () => {
  imageUpload.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imageUploadForm.reset();
  // newImage.reset();

  document.removeEventListener('keydown', onUploadEscKeydown);
  imageUploadCancel.removeEventListener('click', onCancelUpload);
  imageScale.removeEventListener('click', onImageRescale);
};

newImage.addEventListener('change', onPictureUpload);


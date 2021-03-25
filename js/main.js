import { renderPreviews} from './render-previews.js';
import { picturesWrapper, openModal} from './big-picture.js';
import { getData } from './api.js';
import { showAlert } from './show-modal.js';
import { submitForm } from './submit-form.js';
import { enableImageSorting } from './image-sorting.js';
import { onFileUpload, pictureChooser } from './file-upload.js';

const GET_DATA_URL = 'https://22.javascript.pages.academy/kekstagram/data';

let pictures = [];

getData(GET_DATA_URL)
  .then( data => {
    pictures = data;
    renderPreviews(pictures);
    enableImageSorting(pictures);
  })
  .catch(err => showAlert(err.message));

submitForm();

const onPictureClick = (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    evt.preventDefault();
    const pictureId = evt.target.dataset.id;
    const selectedPreview = pictures.find((picture) => picture.id === Number(pictureId));
    openModal(selectedPreview);
  }
};

picturesWrapper.addEventListener('click', onPictureClick);

pictureChooser.addEventListener('change', onFileUpload);





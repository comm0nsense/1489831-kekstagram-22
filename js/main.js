import { renderPreviews} from './render-previews.js';
import { picturesWrapper, openModal} from './big-picture.js';
import { getData } from './api.js';
import { showAlert } from './show-modal.js';
import { submitForm } from './submit-form.js';
import { enableImageSorting } from './image-sorting.js';
// import './test-array-find.js'
// import { cleanPreviews } from './render-previews.js'


const GET_DATA_URL = 'https://22.javascript.pages.academy/kekstagram/data';

let pictures = [];

getData(GET_DATA_URL)
  .then( data => {
    pictures = data;
    // console.log(pictures);
    renderPreviews(pictures);
    enableImageSorting(pictures);
    // getUniqueRandomImages(pictures);
    // const result = getUniqueRandomImages(pictures);
    // console.log(result);
    // const result2 = getMostDiscussedImages(pictures);
    // console.log(result2);
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





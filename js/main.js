import './mock.js';
import { renderPreviews} from './render-previews.js';
import './big-picture.js';
import './upload-image.js';
import './image-filters.js';
import './form-validation.js';
import { getData } from './api.js';
import { showAlert } from './show-modal.js';
import { submitForm } from './submit-form.js';

const GET_DATA_URL = 'https://22.javascript.pages.academy/kekstagram/data';

getData(GET_DATA_URL)
  .then( pictures => {
    renderPreviews(pictures);
  })
  .catch(err => showAlert(err.message));

submitForm();



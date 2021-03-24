import { imageUploadForm } from './upload-image.js';
import { postData } from './api.js';
import { showModal, newSuccessModal, newErrorModal} from './show-modal.js';

const POST_DATA_URL = 'https://22.javascript.pages.academy/kekstagram';

const submitForm = () => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    postData(POST_DATA_URL, formData)
      .then( () => showModal(newSuccessModal))
      .catch( () => showModal(newErrorModal))
  })
};

export { submitForm };

// import { generateRandomPhotos } from './mock.js';
// import { renderPreviews } from './render-previews.js';
import { isEscEvent } from './util.js';

//
// const photos = generateRandomPhotos(25);
// console.log(photos);

// renderPreviews(photos);

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');

const picturesWrapper = document.querySelector('.pictures');
const modalCloseButton = document.querySelector('.big-picture__cancel');

const createComments = (comments) => {
  bigPictureComments.innerHTML = '';

  if (comments) {
    comments.forEach(comment => {
      const newLi = document.createElement('li');

      newLi.classList.add('social__comment');
      newLi.innerHTML = `<img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35>
      <p class="social__text">${comment.message}</p>`;

      bigPictureComments.appendChild(newLi);
    });
  }
};


const onModalEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }

  // picturesWrapper.addEventListener('click', onPictureClick);
  document.removeEventListener('keydown', onModalEscPress);
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  // document.querySelector('body').classList.remove('modal-open');
  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  bigPicture.querySelector('.social__comments-loader').classList.remove('hidden');

  document.removeEventListener('keydown', onModalEscPress);
  modalCloseButton.removeEventListener('click', closeModal);
  // picturesWrapper.addEventListener('click', onPictureClick);

};


const openModal = (photo) => {
  bigPicture.classList.remove('hidden');
  // document.querySelector('body').classList.add('modal-open');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
  bigPictureImg.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureDescription.textContent = photo.description;
  bigPictureCommentsCount.textContent = photo.comments.length;

  createComments(photo.comments);

  document.addEventListener('keydown', onModalEscPress);
  modalCloseButton.addEventListener('click', closeModal);
  // picturesWrapper.removeEventListener('click', onPictureClick);
};


export { picturesWrapper, openModal }

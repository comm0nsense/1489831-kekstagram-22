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
const commentsLoader = bigPicture.querySelector('.comments-loader');
const numberOfCommentsLoaded = bigPicture.querySelector('.comments-loaded');


const picturesWrapper = document.querySelector('.pictures');
const modalCloseButton = document.querySelector('.big-picture__cancel');

const createComments = (comments, number) => {
  bigPictureComments.innerHTML = '';
  const commentsToShow = comments.slice(0,number);
  // console.log(commentsToShow);
  if (comments) {
    commentsToShow.forEach(comment => {
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
  // bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  // bigPicture.querySelector('.social__comments-loader').classList.remove('hidden');

  document.removeEventListener('keydown', onModalEscPress);
  modalCloseButton.removeEventListener('click', closeModal);
  // picturesWrapper.addEventListener('click', onPictureClick);

};


const openModal = (photo) => {
  bigPicture.classList.remove('hidden');
  // document.querySelector('body').classList.add('modal-open');
  // bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  // bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
  bigPictureImg.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureDescription.textContent = photo.description;
  bigPictureCommentsCount.textContent = photo.comments.length;
  if (photo.comments.length < 5) {
    numberOfCommentsLoaded.textContent = photo.comments.length;
  } else {
    numberOfCommentsLoaded.textContent = '5';
  }

  createComments(photo.comments, 5);

  const onMoreCommentsClick = () => {
    const commentsTotal = photo.comments.length;
    // console.log(p÷hoto.comments.length);
    const commentsLoaded = bigPicture.querySelectorAll('.social__comment').length;
    const commentsBalance = commentsTotal - commentsLoaded;
    // console.log(`Total: ${commentsTotal}, loaded: ${commentsLoaded}, balance: ${commentsBalance}`);
    if (commentsBalance >=5) {
      createComments(photo.comments, commentsLoaded + 5);
      numberOfCommentsLoaded.textContent = `${commentsLoaded +5}`;
    } else {
      createComments(photo.comments, commentsTotal);
      commentsLoader.classList.add('hidden');
      numberOfCommentsLoaded.textContent = `${commentsTotal}`;
    }
  }


  document.addEventListener('keydown', onModalEscPress);
  modalCloseButton.addEventListener('click', closeModal);
  // picturesWrapper.removeEventListener('click', onPictureClick);
  commentsLoader.addEventListener('click', onMoreCommentsClick);
};


export { picturesWrapper, openModal }

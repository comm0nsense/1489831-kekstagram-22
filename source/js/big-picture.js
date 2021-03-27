import { isEscEvent } from './util.js';

const COMMENTS_NUMBER = 5;
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
  const commentsToShow = comments.slice(0, number);

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


const openModal = (photo) => {

  const onModalEscPress = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }

    document.removeEventListener('keydown', onModalEscPress);
    commentsLoader.removeEventListener('click', onMoreCommentsClick);
  };

  const onCloseModal = () => {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onModalEscPress);
    modalCloseButton.removeEventListener('click', onCloseModal);
    commentsLoader.removeEventListener('click', onMoreCommentsClick);
  };

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  bigPictureImg.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureDescription.textContent = photo.description;
  bigPictureCommentsCount.textContent = photo.comments.length;

  if (photo.comments.length < COMMENTS_NUMBER) {
    numberOfCommentsLoaded.textContent = photo.comments.length;
    commentsLoader.classList.add('hidden');
  } else {
    numberOfCommentsLoaded.textContent = COMMENTS_NUMBER;
    commentsLoader.classList.remove('hidden');
  }

  createComments(photo.comments, COMMENTS_NUMBER);

  const onMoreCommentsClick = () => {
    const commentsTotal = photo.comments.length;
    const commentsLoaded = bigPictureComments.children.length;
    const commentsBalance = commentsTotal - commentsLoaded;

    if (commentsBalance > COMMENTS_NUMBER) {
      createComments(photo.comments, commentsLoaded + COMMENTS_NUMBER);
      numberOfCommentsLoaded.textContent = `${commentsLoaded + COMMENTS_NUMBER}`;
    } else if (commentsBalance === COMMENTS_NUMBER) {
      createComments(photo.comments, commentsLoaded + COMMENTS_NUMBER);
      numberOfCommentsLoaded.textContent = `${commentsLoaded + COMMENTS_NUMBER}`;
      commentsLoader.classList.add('hidden');
    } else {
      createComments(photo.comments, commentsTotal);
      commentsLoader.classList.add('hidden');
      numberOfCommentsLoaded.textContent = `${commentsTotal}`;
    }
  };

  document.addEventListener('keydown', onModalEscPress);
  modalCloseButton.addEventListener('click', onCloseModal);
  commentsLoader.addEventListener('click', onMoreCommentsClick);
};

export { picturesWrapper, openModal }

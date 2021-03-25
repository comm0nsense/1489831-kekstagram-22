import { imageUploadForm } from './upload-image.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MAX_COUNT = 5;
const HASHTAG_REGEXP = /^#[a-zA-Zа-яА-Я\d]{1,19}\s?$/;

const validationMessages = {
  length: 'длина не более 20 символов',
  same: 'такой хештег уже есть',
  number: 'не больше 5 хештегов',
  content: 'начинается с #, содержит только буквы и цифры, не пустой',
};

const comment = imageUploadForm.querySelector('.text__description');
const hashtagInput = imageUploadForm.querySelector('.text__hashtags');

let hashtags = [];

const onHashtagInputChange = () => {
  hashtagInput.value = hashtags.join(' ');
}

const onHashtagInput = () => {
  hashtags = hashtagInput.value.toLowerCase().split(/ +/g);
  const validationErrors = [];

  hashtags.forEach((hashtag) => {
    if (hashtag.length > HASHTAG_MAX_LENGTH) {
      validationErrors.push(validationMessages.length);
    } else if (hashtags.indexOf(hashtag) !== hashtags.lastIndexOf(hashtag)) {
      validationErrors.push(validationMessages.same);
    } else if (!hashtag.match(HASHTAG_REGEXP) && hashtag !== '') {
      validationErrors.push(validationMessages.content);
    }
  });

  if (hashtags.length > HASHTAG_MAX_COUNT) {
    validationErrors.push(validationMessages.number);
  }

  hashtagInput.setCustomValidity(validationErrors.join(', '));
  hashtagInput.reportValidity();

  hashtagInput.addEventListener('change', onHashtagInputChange);
};


const onCommentInput = () => {
  const commentLength = comment.value.length;

  if (commentLength > COMMENT_MAX_LENGTH) {
    comment.setCustomValidity(` Максимум 140 симв. Удалите лишние ${commentLength - COMMENT_MAX_LENGTH} симв.`)
  } else {
    comment.setCustomValidity('');
  }

  comment.reportValidity();
};

const formValidationHandlers = () => {
  comment.addEventListener('input', onCommentInput);
  hashtagInput.addEventListener('change', onHashtagInputChange);
  hashtagInput.addEventListener('input', onHashtagInput);
};

export { formValidationHandlers };


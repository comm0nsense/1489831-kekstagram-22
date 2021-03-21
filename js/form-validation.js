import { imageUploadForm } from './upload-image.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MAX_COUNT = 5;
const HASHTAG_REGEXP = /^#[a-zA-Zа-яА-Я\d]{1,19}\s?$/;
// const testRegExp = /test/i;


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
  // console.log(hashtags);

  const validationErrors = [];

  hashtags.forEach( (hashtag) => {
    if(hashtag.length > HASHTAG_MAX_LENGTH) {
      validationErrors.push(validationMessages.length);
    // } else if (hashtags.includes(hashtag)){
      // validationErrors.push(validationMessages.same);
    } else if (!hashtag.match(HASHTAG_REGEXP) && hashtag !== ''){
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

hashtagInput.addEventListener('change', onHashtagInputChange);
hashtagInput.addEventListener('input', onHashtagInput);

const onCommentInput = () => {
  const commentLength = comment.value.length;
  // console.log(comment.value);

  if (commentLength > COMMENT_MAX_LENGTH) {
    comment.setCustomValidity(` Максимум 140 симв. Удалите лишние ${commentLength - COMMENT_MAX_LENGTH} симв.`)
  } else {
    comment.setCustomValidity('');
  }

  comment.reportValidity();
};

comment.addEventListener('input', onCommentInput);

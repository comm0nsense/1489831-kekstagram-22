import { imageUploadForm } from './upload-image.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_MAX_LENGTH = 20;
const FIRST_SYMBOL = /^#/;
const HASHTAG_REGEXP = /^#[a-zа-я]\d/gi;
const testRegExp = /test/i;


const comment = imageUploadForm.querySelector('.text__description');
const hashTag = imageUploadForm.querySelector('.text__hashtags');


const onHashTagInput = () => {

  const input = hashTag.value;
  console.log(input);

  if (!input.match(FIRST_SYMBOL)) {
    hashTag.setCustomValidity('ХешТег должен начинаться с решетки');
  } else if (!input.match(HASHTAG_REGEXP)) {
    // } else if (!testRegExp.test(input)) {
    hashTag.setCustomValidity('Только буквы или цифры');
  } else if (input.length > HASHTAG_MAX_LENGTH) {
    hashTag.setCustomValidity('Длина не более 20 символов');
  }
  else {
    hashTag.setCustomValidity('');
  }

  hashTag.reportValidity();
}


hashTag.addEventListener('input', onHashTagInput);

const onCommentInput = () => {
  const commentLength = comment.value.length;
  console.log(comment.value);

  if (commentLength > COMMENT_MAX_LENGTH) {
    comment.setCustomValidity(` Максимум 140 симв. Удалите лишние ${commentLength - COMMENT_MAX_LENGTH} симв.`)
  } else {
    comment.setCustomValidity('');
  }

  comment.reportValidity();
};

comment.addEventListener('input', onCommentInput);

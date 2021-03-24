/* global _:readonly */
import { getUniqueRandomNumbers } from './util.js';
import { cleanPreviews, renderPreviews } from './render-previews.js';

const RANDOM_IMAGE_NUMBER = 10;
const RENDER_DELAY = 500;
const imageSorting = document.querySelector('.img-filters');
const imageSortingForm = imageSorting.querySelector('.img-filters__form');
const defaultImageSort = imageSortingForm.querySelector('#filter-default');
const randomImageSort = imageSortingForm.querySelector('#filter-random');
const discussedImageSort = imageSortingForm.querySelector('#filter-discussed');


let randomImages = [];
let discussedImages = [];

const getUniqueRandomImages = (pictures) => {
  const imageIndexes = getUniqueRandomNumbers(RANDOM_IMAGE_NUMBER, 0, pictures.length - 1)
  let randomImages = [];
  for (let i = 0; i < RANDOM_IMAGE_NUMBER; i++) {
    randomImages.push(pictures[imageIndexes[i]])
  }

  return randomImages;
};

const getMostDiscussedImages = (pictures) => {
  discussedImages = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
  return discussedImages;
};


const enableImageSorting = (pictures) => {
  const onSortingOptionClick = (evt) => {
    switch (evt.target.id) {
      case defaultImageSort.id:
        // console.log('sorting by default');
        cleanPreviews();
        renderPreviews(pictures);
        break;
      case randomImageSort.id:
        // console.log('sorting by 10 random');
        cleanPreviews();
        randomImages = getUniqueRandomImages(pictures);
        renderPreviews(randomImages);
        break;
      case discussedImageSort.id:
        // console.log('sorting by most discussed');
        cleanPreviews();
        discussedImages = getMostDiscussedImages(pictures);
        renderPreviews(discussedImages);
        // console.log(discussedImages);
        break;
    }
  };

  imageSorting.classList.remove('img-filters--inactive');
  imageSortingForm.addEventListener('click', _.debounce(onSortingOptionClick, RENDER_DELAY));
};


export { getUniqueRandomImages, getMostDiscussedImages, enableImageSorting };

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


const getUniqueRandomImages = (pictures) => {
  const imageIndexes = getUniqueRandomNumbers(RANDOM_IMAGE_NUMBER, 0, pictures.length - 1)
  const randomImages = [];
  for (let i = 0; i < RANDOM_IMAGE_NUMBER; i++) {
    randomImages.push(pictures[imageIndexes[i]])
  }

  return randomImages;
};

const getMostDiscussedImages = (pictures) => {

  return pictures.slice().sort((a, b) => b.comments.length - a.comments.length);

};

const enableImageSorting = (pictures) => {
  const onSortingOptionClick = (evt) => {
    switch (evt.target.id) {
      case defaultImageSort.id:
        cleanPreviews();
        renderPreviews(pictures);
        break;
      case randomImageSort.id:
        cleanPreviews();
        renderPreviews(getUniqueRandomImages(pictures));
        break;
      case discussedImageSort.id:
        cleanPreviews();
        renderPreviews(getMostDiscussedImages(pictures));
        break;
    }
  };

  imageSorting.classList.remove('img-filters--inactive');
  imageSortingForm.addEventListener('click', _.debounce(onSortingOptionClick, RENDER_DELAY));
};

export { getUniqueRandomImages, getMostDiscussedImages, enableImageSorting };

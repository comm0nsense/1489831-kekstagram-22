import { getUniqueRandomNumbers } from './util.js';
// import { generateRandomPhotos } from './mock.js';

const RANDOM_IMAGE_NUMBER = 20;
const imageSorting = document.querySelector('.img-filters');
const imageSortingForm = imageSorting.querySelector('.img-filters__form');
// const imageSortingDefault = imageSortingForm.querySelector('#filter-default');
const imageSortingRandom = imageSortingForm.querySelector('#filter-random');
// const imageSortingDiscussed = imageSortingForm.querySelector('#filter-discussed');

imageSorting.classList.remove('img-filters--inactive');

let randomImages = [];

const getUniqueRandomImages = (pictures) => {
  const imageIndexes= getUniqueRandomNumbers(RANDOM_IMAGE_NUMBER, 0, pictures.length - 1)
  for (let i = 0; i < RANDOM_IMAGE_NUMBER; i++) {
    randomImages.push(pictures[imageIndexes[i]])
  }
  return randomImages;
};

const getMostDiscussedImages = (pictures) => {
  const sortedImages = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
  return sortedImages;
}


export { getUniqueRandomImages, getMostDiscussedImages };

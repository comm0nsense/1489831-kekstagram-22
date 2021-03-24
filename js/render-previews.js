const pictureTemplate = document.querySelector('#picture').content;

const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const renderPreviews = (data) => {

  data.forEach(picture => {

    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;

    pictureElement.querySelector('.picture__img').dataset.id = picture.id;

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

const cleanPreviews = () => {
  const picturePreviews = picturesContainer.querySelectorAll('.picture');
  picturePreviews.forEach((element) => {
    element.remove();
  });
}

export { renderPreviews, cleanPreviews }

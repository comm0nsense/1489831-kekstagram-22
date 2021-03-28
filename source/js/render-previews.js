const pictureTemplate = document.querySelector('#picture').content;

const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const renderPreviews = (data) => {

  data.forEach(({url, comments: {length}, likes, id}) => {

    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__comments').textContent = length;
    pictureElement.querySelector('.picture__likes').textContent = likes;

    pictureElement.querySelector('.picture__img').dataset.id = id;

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

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const pictureChooser = document.querySelector('.img-upload__start input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

const onFileUpload = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  })

  if (matches) {
    pictureChooser.setCustomValidity('');
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  } else if (!matches) {
    pictureChooser.setCustomValidity('Можно загружать изображения в следующих форматах: *.gif, *.jpg, *.jpeg, *.png');
  }
  pictureChooser.reportValidity();
};

export { onFileUpload, pictureChooser }

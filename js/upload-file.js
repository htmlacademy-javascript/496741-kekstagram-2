const FILE_TYPES = ['jpg', 'jpeg', 'png', 'svg', 'webp', 'bmp', 'gif'];

const uploadFormElement = document.querySelector('.img-upload__form');
const imgUploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const effectsListElement = uploadFormElement.querySelector('.effects__list');
const imgUploadElement = uploadFormElement.querySelector('.img-upload__preview img');
const effectsPreviewElements = effectsListElement.querySelectorAll('.effects__preview');

const redrawPicture = (imgUrl) => {
  imgUploadElement.src = imgUrl;
  effectsPreviewElements.forEach((previewElement) => {
    previewElement.style.backgroundImage = `url(${imgUrl})`;
  });
};

const uploadFile = () => {
  imgUploadInputElement.addEventListener('change', () => {
    const file = imgUploadInputElement.files[0];
    const fileName = file.name.toLowerCase();
    const isImg = FILE_TYPES.some((expansion) => fileName.endsWith(expansion));

    if (isImg) {
      const imgDataUrl = URL.createObjectURL(file);
      redrawPicture(imgDataUrl);
    }
  });
};

export {uploadFile, redrawPicture};

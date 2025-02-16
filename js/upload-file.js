const uploadFile = () => {
  const FILE_TYPES = ['jpg', 'jpeg', 'png'];

  const uploadFormElement = document.querySelector('.img-upload__form');
  const imgUploadInputElement = uploadFormElement.querySelector('.img-upload__input');
  const imgUploadElement = uploadFormElement.querySelector('.img-upload__preview img');
  const effectsListElement = uploadFormElement.querySelector('.effects__list');
  const effectsPreviewElements = effectsListElement.querySelectorAll('.effects__preview');

  imgUploadInputElement.addEventListener('change', () => {
    const file = imgUploadInputElement.files[0];
    const fileName = file.name.toLowerCase();
    const isImg = FILE_TYPES.some((expansion) => fileName.endsWith(expansion));

    if (isImg) {
      const imgDataUrl = URL.createObjectURL(file);
      imgUploadElement.src = imgDataUrl;
      effectsPreviewElements.forEach((previewElement) => {
        previewElement.style.backgroundImage = `url(${imgDataUrl})`;
      });
    }
  });
};

export {uploadFile};

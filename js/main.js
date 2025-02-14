import { openPhotoEditor, setUserFormSubmit } from './img-upload-form';
import { configureImgResizing } from './img-resizing';
import { getImgEffect } from './img-effect';
import { getData } from './api';
import { renderPhotos } from './picture';
import { generateBigPictureModal } from './gallery';

getData()
  .then((photos) => {
    renderPhotos(photos);
    generateBigPictureModal(photos);
  });
openPhotoEditor();
setUserFormSubmit();
configureImgResizing();
getImgEffect();

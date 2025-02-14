import { openPhotoEditor, setUserFormSubmit } from './img-upload-form';
import { configureImgResizing } from './img-resizing';
import { getImgEffect } from './img-effect';
import { getData } from './api';
import { showAlert } from './util';
import { renderPhotos } from './picture';
import { generateBigPictureModal } from './gallery';

getData((photos) => {
  renderPhotos(photos);
  generateBigPictureModal(photos);
},
showAlert);
openPhotoEditor();
setUserFormSubmit();
configureImgResizing();
getImgEffect();

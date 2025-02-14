import { renderPhotos } from './picture';
import { generateBigPictureModal } from './gallery';
import { uploadImg } from './img-upload-form';
import { configureImgResizing } from './img-resizing';
import { getImgEffect } from './img-effect';

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    renderPhotos(photos);
    generateBigPictureModal(photos);
  })
  .catch((err) => {
    console.log(err);
  });

uploadImg();
configureImgResizing();
getImgEffect();
